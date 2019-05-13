# frozen_string_literal: true

require 'rails_helper'
require 'login_helper'

feature 'Index Page' do
  scenario 'CANS-Worker lands on client list and can logout' do
    login
    expect(page).to have_content('Snapshot')
    logout
  end
end
