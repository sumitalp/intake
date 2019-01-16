import java.text.SimpleDateFormat
@Library('jenkins-pipeline-utils') _

def scmInfo
def branch
def curStage = 'Start'
def pipelineStatus = 'SUCCESS'
def successColor = '11AB1B'
def failureColor = '#FF0000'
SimpleDateFormat dateFormatGmt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
def buildDate = dateFormatGmt.format(new Date())
def docker_credentials_id = '6ba8d05c-ca13-4818-8329-15d41a089ec0'
GITHUB_CREDENTIALS_ID = '433ac100-b3c2-4519-b4d6-207c029a103b'
DE_ANSIBLE_GITHUB_URL = 'git@github.com:ca-cwds/de-ansible.git'

switch(env.BUILD_JOB_TYPE) {
  case "master": buildMaster(); break;
  case "release":releasePipeline(); break;
  default: buildPullRequest();
}

def buildPullRequest() {
  node('intake-slave') {
    try {
      scmInfo = checkout scm
      branch = scmInfo.GIT_BRANCH ?: env.GIT_BRANCH
      buildingTestBench()
      lintTest()
      veriftySemVerLabel()
      karmaTests()
      rspecTests()
      reports()
    } catch(Exception exception) {
      currentBuild.result = "FAILURE"
      throw exception
    } finally {
      cleanUpStage()
    }
  }
}

def buildMaster() {
  node('intake-slave') {
    triggerProperties = pullRequestMergedTriggerProperties('intake-master')
    properties([
      pipelineTriggers([triggerProperties])
    ])

    try {
      buildingTestBench()
      lintTest()
      veriftySemVerLabel()
      karmaTests()
      rspecTests()
      build()
      incrementTag()
      tagRepo()
      release()
      acceptanceTestBubble()
      publish()
      triggerSecurityScan()
      triggerReleasePipeline()
      reports()
    } catch(Exception exception) {
      slackNotification('FAILURE')
      currentBuild.result = "FAILURE"
      throw exception
    } finally {
      cleanUpStage()
      slackNotification('SUCESS')
    }
  }
}

def releasePipeline() {
  parameters([
    string(name: 'APP_VERSION', defaultValue: '', description: 'App version to deploy')
  ])

  try {
    deployWithSmoke('preint')
    deployWithSmoke('integration')
  } catch(Exception exception) {
    currentBuild.result = "FAILURE"
    throw exception
  }
}

def buildingTestBench() {
  stage('Building testing bench') {
    curStage = 'Building testing bench'
    sh './scripts/ci/build_testing_bench.rb'
    }
}

def lintTest() {
  stage('Lint test') {
    curStage = 'Lint test'
    sh './scripts/ci/lint_test.rb'
  }
}

def veriftySemVerLabel() {
  stage('Verify SemVer Label') {
    checkForLabel("intake")
  }
}

def karmaTests() {
  stage('Karma tests') {
    curStage = 'Karma tests'
    sh './scripts/ci/karma_test.rb'
      }
    }

def rspecTests() {
  stage('Rspec tests') {
    curStage = 'Rspec tests'
    sh './scripts/ci/rspec_test.rb'
  }
}
      
def build() {
  stage('Build') {
    curStage = 'Build'
    sh 'make build'
  }
}

def incrementTag() {
  stage('Increment Tag') {
    VERSION = newSemVer()
    VCS_REF = sh(
    script: 'git rev-parse --short HEAD',
    returnStdout: true
    )
  }
}

def tagRepo() {
  stage('Tag Repo'){
    tagGithubRepo(VERSION, GITHUB_CREDENTIALS_ID)
  }
}

def release() {
  stage('Release') {
    curStage = 'Release'
    withEnv(["BUILD_DATE=${buildDate}","VERSION=${VERSION}","VCS_REF=${VCS_REF}"]) {
      sh 'make release'
    }
  }
}

def acceptanceTestBubble() {
  stage('Acceptance test Bubble'){
    withDockerRegistry([credentialsId: docker_credentials_id]){
      withEnv(["INTAKE_IMAGE_VERSION=intakeaccelerator${BUILD_NUMBER}_app"]) {
        sh './scripts/ci/acceptance_test.rb'
      }
    }
  }
}

def publish() {
  stage('Publish') {
    withDockerRegistry([credentialsId: docker_credentials_id]) {
      curStage = 'Publish'
      withEnv(["VERSION=${VERSION}"]){
        sh './scripts/ci/publish.rb'
      }
    }
  }
}

def triggerSecurityScan() {
  stage('Trigger Security scan') {
    build job: 'tenable-scan', parameters: [
      [$class: 'StringParameterValue', name: 'CONTAINER_NAME', value: 'intake'],
      [$class: 'StringParameterValue', name: 'CONTAINER_VERSION', value: VERSION]
    ]
  }
}

def triggerReleasePipeline() {
  stage('Trigger Release Pipeline') {
    withCredentials([usernameColonPassword(credentialsId: 'fa186416-faac-44c0-a2fa-089aed50ca17', variable: 'jenkinsauth')]) {
      sh "curl -v -u $jenkinsauth 'http://jenkins.mgmt.cwds.io:8080/job/PreInt-Integration/job/deploy-intake-app/buildWithParameters" +
      "?token=trigger-intake-deploy" +
      "&cause=Caused%20by%20Build%20${env.BUILD_ID}" +
      "&APP_VERSION=${VERSION}'"
    }
  }
}

def reports() {
  stage ('Reports') {
    step([$class: 'JUnitResultArchiver', testResults: '**/reports/*.xml'])

    publishHTML (target: [
      allowMissing: false,
      alwaysLinkToLastBuild: false,
      keepAll: true,
      reportDir: 'reports/coverage/js',
      reportFiles: 'index.html',
      reportName: 'JS Code Coverage'
    ])

    publishHTML (target: [
      allowMissing: false,
      alwaysLinkToLastBuild: false,
      keepAll: true,
      reportDir: 'reports/coverage/ruby',
      reportFiles: 'index.html',
      reportName: 'Ruby Code Coverage'
    ])
  }
}

def cleanUpStage() {
  stage('Clean') {
    withEnv(["GIT_BRANCH=${branch}"]){
      archiveArtifacts artifacts: 'tmp/*', excludes: '*/.keep', allowEmptyArchive: true
      sh './scripts/ci/clean.rb'
      echo 'Cleaning workspace'
      cleanWs()
    }
  }
}

def slackNotification(pipelineStatus) {
  slackAlertColor = successColor
  slackMessage = "${pipelineStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' completed for branch '${branch}' (${env.BUILD_URL})"

  if(pipelineStatus == 'FAILED') {
    slackAlertColor = failureColor
    slackMessage = "${pipelineStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' in stage '${curStage}' for branch '${branch}' (${env.BUILD_URL})"
  }
  slackSend channel: "#tech-intake", baseUrl: 'https://hooks.slack.com/services/', tokenCredentialId: 'slackmessagetpt2', color: slackAlertColor, message: slackMessage
}

def checkOutStage() {
  stage('Check Out Stage') {
    git branch: 'master', credentialsId: '433ac100-b3c2-4519-b4d6-207c029a103b', url: 'git@github.com:ca-cwds/acceptance_testing.git'
  }
}

def deployToStage(environment, version) {
  stage("Deploy to $environment") {
    ws {
      git branch: "master", credentialsId: GITHUB_CREDENTIALS_ID, url: DE_ANSIBLE_GITHUB_URL
      sh "ansible-playbook -e NEW_RELIC_AGENT=true -e INTAKE_APP_VERSION=$version -i inventories/$environment/hosts.yml deploy-intake.yml --vault-password-file ~/.ssh/vault.txt -vv"
    }
  }
}

def updateManifestStage(environment, version) {
  stage('Update Manifest Version') {
    updateManifest("intake", environment, GITHUB_CREDENTIALS_ID, version)
  }
}

def buildDocker() {
  stage('Build Docker'){
    sh 'docker-compose build'
  }
}

def smokeTest(environment) {
  stage("Smoke Test on $environment") {
    withEnv(["APP_URL=https://web.${environment}.cwds.io",
             "FEATURE_SET=${FEATURE_SET}",
             "CAPYBARA_DRIVER=${CAPYBARA_DRIVER}"]) {
      sh 'docker-compose run acceptance_test'
    }
  }
}

def deployWithSmoke(environment) {
  node(environment) {
    checkOutStage()
    deployToStage(environment, env.VERSION)
    updateManifestStage(environment, env.VERSION)
    buildDocker()
    cleanWs()
  }
}
