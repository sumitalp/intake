#!/usr/bin/env ruby
# frozen_string_literal: truek

test_args = "-p intake_accelerator#{ENV['BUILD_NAME']}_test -f docker/test/docker-compose.yml"
webpack = 'bin/webpack'

rspc_cmd = "#{webpack} && bundle exec parallel_rspec --runtime-log parallel_runtime_rspec.log "
rspc_cmd += (ENV['EXCLUDE_PATTERN'] ? '--exclude-pattern ' + ENV['EXCLUDE_PATTERN'] : '') + ' spec/regression'

exec("docker-compose #{test_args} run run_tests bash -c \"#{rspc_cmd}\"")
