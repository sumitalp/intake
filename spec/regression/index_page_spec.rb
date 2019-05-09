# frozen_string_literal: true

require 'acceptance_helpers'
require 'feature'

feature 'Index Page' do
  scenario 'CANS-Worker lands on client list and can logout' do
    login
    expect(page).to have_content('CANS')
    expect(page).to have_content('Client List')
    logout
  end
end
