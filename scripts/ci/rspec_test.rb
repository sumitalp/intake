#!/usr/bin/env ruby
# frozen_string_literal: true

test_args = "-p intake_accelerator#{ENV['BUILD_NAME']}_test -f docker/test/docker-compose.yml"
webpack = 'bin/webpack'

rspec_cmd = "#{webpack} && bundle exec parallel_rspec --runtime-log parallel_runtime_rspec.log"
if ENV['EXCLUDE_PATTERN']
  rspec_cmd += " --exclude-pattern \"#{ENV['EXCLUDE_PATTERN']}\""
end
rspec_cmd += ' spec'

exec("docker-compose #{test_args} run run_tests bash -c \"#{rspec_cmd}\"")
