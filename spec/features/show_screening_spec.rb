# frozen_string_literal: true

require 'rails_helper'
require 'spec_helper'

feature 'Show Screening' do
  scenario 'showing existing screening' do
    existing_screening = {
      id: 1,
      ended_at: '2016-08-22T11:00:00.000Z',
      incident_county: 'sacramento',
      incident_date: '2016-08-11',
      location_type: "Child's Home",
      communication_method: 'mail',
      name: 'The Rocky Horror Picture Show',
      report_narrative: 'some narrative',
      reference: 'My Bad!',
      response_time: 'within_twenty_four_hours',
      screening_decision: 'evaluate_out',
      started_at: '2016-08-13T10:00:00.000Z',
      address: {
        id: 4,
        street_address: '123 fake st',
        city: 'Springfield',
        state: 'NY',
        zip: 12_345
      },
      participants: [{
        first_name: 'Bart',
        last_name: 'Simpson',
        gender: 'male'
      }]
    }.with_indifferent_access

    faraday_stub = Faraday.new do |builder|
      builder.adapter :test do |stub|
        stub.get('/api/v1/screenings/1') do |_|
          [200, {}, existing_screening]
        end
      end
    end
    allow(API).to receive(:connection).and_return(faraday_stub)

    visit screening_path(id: existing_screening[:id])

    expect(page).to have_content 'Screening #My Bad!'

    within '#screening-information-card' do
      expect(page).to have_content 'Mail'
      expect(page).to have_content 'The Rocky Horror Picture Show'
      expect(page).to have_content '8/13/2016 10:00 AM'
      expect(page).to have_content '8/22/2016 11:00 AM'
    end

    within '#participants-card' do
      expect(page).to have_content 'Bart Simpson'
    end

    within '#narrative-card' do
      expect(page).to have_content 'some narrative'
    end

    within '#referral-information-card' do
      expect(page).to have_content '8/11/2016'
      expect(page).to have_content 'Sacramento'
      expect(page).to have_content '123 fake st'
      expect(page).to have_content 'Springfield'
      expect(page).to have_content 'New York'
      expect(page).to have_content '12345'
      expect(page).to have_content "Child's Home"
      expect(page).to have_content 'Within 24 hours'
      expect(page).to have_content 'Evaluate Out'
    end

    expect(page).to have_link('Home', href: root_path)
    expect(page).to have_link('Edit', href: edit_screening_path(id: 1))
  end
end
