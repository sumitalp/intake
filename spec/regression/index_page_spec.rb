# frozen_string_literal: true

require 'feature'

feature 'Index Page' do
  scenario 'CANS-Worker lands on client list and can logout' do
    visit '/'
    expect(page).to have_content('INTAKE')
  end
end
