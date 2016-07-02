require 'rubygems'
require 'capybara'
require 'capybara/rspec'
require 'selenium-webdriver'

# All our specs should require 'spec_helper' (this file)

# If RACK_ENV isn't set, set it to 'test'.  Sinatra defaults to development,
# so we have to override that unless we want to set RACK_ENV=test from the
# command line when we run rake spec.  That's tedious, so do it here.
ENV['RACK_ENV'] ||= 'test'

require File.expand_path("../../config/environment", __FILE__)

# Rspec.configure do |config|
#   config.include Rack::Test::Methods
# end

# Capybara.app = app.new


def app
  Sinatra::Application
end
Capybara.ignore_hidden_elements = true
Capybara.configure do |c|
  c.run_server = false
  c.default_driver = :selenium
  c.app_host = "http://localhost:9393"
end

