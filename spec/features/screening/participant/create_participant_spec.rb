# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'

def filtered_participant_attributes
  %i[
    date_of_birth
    first_name
    gender
    last_name
    ssn
    sealed
    sensitive
  ]
end

def build_participant_from_person_and_screening(person, screening)
  person.as_json(
    only: filtered_participant_attributes
  ).merge(
    legacy_id: person[:id],
    legacy_source_table: person[:legacy_source_table],
    legacy_descriptor: person[:legacy_descriptor],
    races: person[:races],
    screening_id: screening[:id].to_s,
    addresses: person[:addresses],
    phone_numbers: person[:phone_numbers],
    languages: person[:languages],
    ethnicity: person[:ethnicity]
  )
end

feature 'Create participant' do
  let(:existing_participant) { FactoryBot.create(:participant) }
  let(:existing_screening) do
    {
      id: '1',
      incident_address: {},
      cross_reports: [],
      allegations: [],
      safety_alerts: [],
      participants: [existing_participant.as_json.symbolize_keys]
    }
  end
  let(:marge_date_of_birth) { 15.years.ago.to_date }
  let(:homer_date_of_birth) { 16.years.ago.to_date }
  let(:marge_address) do
    FactoryBot.attributes_for(
      :address,
      :with_legacy,
      street_address: '123 Fake St',
      city: 'Springfield',
      state: 'NY',
      zip: '12345',
      type: 'Home'
    )
  end
  let(:marge_phone_number) do
    FactoryBot.attributes_for(
      :phone_number,
      number: '9712876774',
      type: 'Home'
    )
  end
  let(:marge) do
    {
      id: SecureRandom.random_number(1_000_000_000).to_s,
      legacy_source_table: 'CLIENT_T',
      date_of_birth: marge_date_of_birth.to_s(:db),
      first_name: 'Marge',
      gender: 'female',
      last_name: 'Simpson',
      ssn: '123-23-1234',
      sealed: false,
      sensitive: true,
      languages: %w[French Italian],
      legacy_descriptor: FactoryBot.attributes_for(:legacy_descriptor),
      addresses: [marge_address],
      phone_numbers: [marge_phone_number],
      races: [
        { race: 'White', race_detail: 'European' },
        { race: 'American Indian or Alaska Native', race_detail: 'Alaska Native' }
      ],
      ethnicity: [{ hispanic_latino_origin: 'Yes', ethnicity_detail: ['Central American'] }]
    }
  end
  let(:homer) do
    {
      id: SecureRandom.random_number(1_000_000_000).to_s,
      legacy_source_table: 'CLIENT_T',
      date_of_birth: homer_date_of_birth.to_s(:db),
      first_name: 'Homer',
      gender: 'male',
      last_name: 'Simpson',
      ssn: '123-23-1234',
      sealed: false,
      sensitive: false,
      languages: %w[French Italian],
      legacy_descriptor: FactoryBot.attributes_for(:legacy_descriptor, legacy_id: 'ABC123ABC'),
      addresses: [marge_address],
      phone_numbers: [marge_phone_number],
      races: [
        { race: 'Asian', race_detail: 'Other Asian' },
        { race: 'White' },
        { race: 'White', race_detail: 'Romanian' },
        { race: 'Asian', race_detail: 'Hmong' },
        { race: 'Asian', race_detail: 'Chinese' },
        { race: 'American Indian or Alaska Native', race_detail: 'Alaska Native' }
      ],
      ethnicity: [{ hispanic_latino_origin: 'Yes', ethnicity_detail: %w[Hispanic Mexican] }]
    }
  end

  let(:marge_response) do
    PersonSearchResponseBuilder.build do |response|
      response.with_total(1)
      response.with_hits do
        [
          PersonSearchResultBuilder.build do |builder|
            builder.with_first_name('Marge')
            builder.with_last_name('Simpson')
            builder.with_legacy_descriptor(marge[:legacy_descriptor])
            builder.with_sensitivity
          end
        ]
      end
    end
  end

  let(:homer_response) do
    PersonSearchResponseBuilder.build do |response|
      response.with_total(1)
      response.with_hits do
        [
          PersonSearchResultBuilder.build do |builder|
            builder.with_first_name('Homer')
            builder.with_last_name('Simpson')
            builder.with_legacy_descriptor(homer[:legacy_descriptor])
          end
        ]
      end
    end
  end

  before(:each) do
    stub_request(
      :get, ferb_api_url(FerbRoutes.intake_screening_path(existing_screening[:id]))
    ).and_return(json_body(existing_screening.to_json, status: 200))
    stub_county_agencies('1105')
    stub_person_search(person_response: marge_response)
    stub_request(
      :get, ferb_api_url(FerbRoutes.intake_screening_path(existing_screening[:id]))
    ).and_return(json_body(existing_screening.to_json, status: 200))
    stub_person_search(person_response: homer_response)
    stub_empty_relationships
    stub_empty_history_for_screening(existing_screening)
    stub_system_codes
  end

  scenario 'creating an unknown participant' do
    visit edit_screening_path(id: existing_screening[:id])
    created_participant_unknown = FactoryBot.create(
      :participant, :unpopulated,
      screening_id: existing_screening[:id]
    )

    stub_request(:post,
      ferb_api_url(FerbRoutes.screening_participant_path(existing_screening[:id])))
      .and_return(json_body(created_participant_unknown.to_json, status: 201))

    within '#search-card', text: 'Search' do
      fill_in 'Search for any person', with: 'Marge'
      click_button 'Create a new person'
      expect(page).to_not have_button('Create a new person')
    end
    expect(a_request(:post,
      ferb_api_url(FerbRoutes.screening_participant_path(existing_screening[:id]))))
      .to have_been_made

    within edit_participant_card_selector(created_participant_unknown.id) do
      within '.card-header' do
        expect(page).to_not have_content('Sensitive')
        expect(page).to have_content 'Unknown Person'
      end
    end
  end

  scenario 'create and edit an unknown participant' do
    visit edit_screening_path(id: existing_screening[:id])
    created_participant_unknown = FactoryBot.create(
      :participant, :unpopulated,
      screening_id: existing_screening[:id]
    )

    stub_request(:post,
      ferb_api_url(FerbRoutes.screening_participant_path(existing_screening[:id])))
      .and_return(json_body(created_participant_unknown.to_json, status: 201))

    within '#search-card', text: 'Search' do
      fill_in 'Search for any person', with: 'Marge'
      click_button 'Create a new person'
      expect(page).to_not have_button('Create a new person')
    end

    expect(a_request(:post,
      ferb_api_url(FerbRoutes.screening_participant_path(existing_screening[:id]))))
      .to have_been_made

    within edit_participant_card_selector(created_participant_unknown.id) do
      fill_in 'First Name', with: 'Filled In First Name'
      expect(find_field('First Name').value).to eq('Filled In First Name')
    end
  end

  scenario 'API returns a 403 response when trying to add a person' do
    if ENV.key?('TEST_ENV_NUMBER')
      skip 'Pending this test as it just fails on jenkins when the js alert is triggered'
    end

    visit edit_screening_path(id: existing_screening[:id])

    stub_request(:post,
      ferb_api_url(FerbRoutes.screening_participant_path(existing_screening[:id])))
      .and_return(json_body('', status: 403))

    within '#search-card', text: 'Search' do
      accept_alert('You are not authorized to add this person.') do
        fill_in 'Search for any person', with: 'Marge'
        click_button 'Create a new person'
      end
    end
  end

  scenario 'adding a participant from search on show screening page' do
    visit screening_path(id: existing_screening[:id])
    homer_attributes = build_participant_from_person_and_screening(homer, existing_screening)
    participant_homer = FactoryBot.build(:participant, homer_attributes)
    created_participant_homer = FactoryBot.create(:participant, participant_homer.as_json)

    stub_request(:get,
      ferb_api_url(
        FerbRoutes.client_authorization_path(
          created_participant_homer.legacy_descriptor.legacy_id
        )
      )).and_return(status: 200)

    stub_request(:post,
      ferb_api_url(FerbRoutes.screening_participant_path(existing_screening[:id])))
      .and_return(json_body(created_participant_homer.to_json, status: 201))

    within '#search-card', text: 'Search' do
      fill_in 'Search for any person', with: 'Homer'
    end
    within '#search-card', text: 'Search' do
      find('strong', text: 'Homer Simpson').click
    end
    expect(a_request(:post,
      ferb_api_url(
        FerbRoutes.screening_participant_path(existing_screening[:id])
      )))
      .to have_been_made

    within edit_participant_card_selector(created_participant_homer.id) do
      within '.card-header' do
        expect(page).to_not have_content('Sensitive')
        expect(page).to have_content 'Homer Simpson'
        expect(page).to have_button 'Remove person'
      end

      within '.card-body' do
        expect(page).to have_field('First Name', with: homer[:first_name])
        expect(page).to have_field('Last Name', with: homer[:last_name])
        expect(page).to have_field('Phone Number', with: '(971)287-6774')
        expect(page).to have_select('Phone Number Type',
          selected: homer.dig(:phone_numbers, 0, :type))
        expect(page).to have_field('Sex at Birth', with: homer[:gender])
        expect(page).to have_react_select_field(
          'Language(s) (Primary First)', with: homer[:languages]
        )
        expect(page).to have_field('Date of birth', with: homer_date_of_birth.strftime('%m/%d/%Y'))
        expect(page).to have_field('Social security number', with: homer[:ssn])

        # Address has legacy_id, and so should be read-only
        expect(page).not_to have_field('Address')
        expect(page).not_to have_field('City')
        expect(page).not_to have_field('State')
        expect(page).not_to have_field('Zip')
        within 'fieldset', text: 'Race' do
          expect(page).to have_checked_field('Asian')
          expect(page).to have_select(
            "participant-#{created_participant_homer.id}-Asian-race-detail",
            selected: 'Chinese'
          )
          expect(page).to have_checked_field('White')
          expect(page).to have_select(
            "participant-#{created_participant_homer.id}-White-race-detail",
            selected: 'Romanian'
          )
          expect(page).to have_checked_field('American Indian or Alaska Native')
        end
        within 'fieldset', text: 'Hispanic/Latino Origin' do
          expect(page).to have_checked_field('Yes')
          expect(page).to have_select(
            "participant-#{created_participant_homer.id}-ethnicity-detail",
            selected: 'Hispanic'
          )
        end
        expect(page).to have_button 'Cancel'
        expect(page).to have_button 'Save'
      end
    end
  end

  context 'adding a sensitive participant from search results' do
    let(:sensitive_token) { 'SENSITIVE_TOKEN' }
    let(:insensitive_token) { 'INSENSITIVE_TOKEN' }

    before do
      stub_request(:get, %r{https?://.*/authn/validate\?token=#{sensitive_token}})
        .and_return(status: 200,
                    body: { staffId: '123', privileges: ['Sensitive Persons'] }.to_json)
      stub_request(:get, %r{https?://.*/authn/validate\?token=#{insensitive_token}})
        .and_return(status: 200, body: { staffId: '123', privileges: [] }.to_json)
      stub_request(:get, ferb_api_url(FerbRoutes.staff_path('123')))
        .and_return(json_body({ staffId: '123', first_name: 'Bob', last_name: 'Boberson',
                                county: 'San Francisco' }.to_json, status: 200))
      stub_county_agencies('1105')
    end

    context 'with NO privileges to add sensitive' do
      scenario 'cannot add sensitive' do
        if ENV.key?('TEST_ENV_NUMBER')
          skip 'Pending this test as it just fails on jenkins when the js alert is triggered'
        end
        Feature.run_with_activated(:authentication) do
          stub_empty_history_for_screening(existing_screening)
          stub_person_search(person_response: marge_response)
          stub_request(
            :post,
            ferb_api_url(FerbRoutes.screening_participant_path(existing_screening[:id]))
          ).and_return(json_body({}.to_json, status: 201))
          visit edit_screening_path(id: existing_screening[:id], token: insensitive_token)

          within '#search-card', text: 'Search' do
            accept_alert('You are not authorized to add this person.') do
              fill_in 'Search for any person', with: 'Marge'
              find('strong', text: 'Marge Simpson').click
            end
          end
        end
      end

      scenario 'can add insensitive' do
        Feature.run_with_activated(:authentication) do
          stub_county_agencies('1105')
          stub_empty_history_for_screening(existing_screening)
          visit edit_screening_path(id: existing_screening[:id], token: insensitive_token)
          homer_attributes = build_participant_from_person_and_screening(
            homer,
            existing_screening
          )
          participant_homer = FactoryBot.build(:participant, homer_attributes)
          created_participant_homer = FactoryBot.create(
            :participant,
            participant_homer.as_json
          )
          stub_request(:get,
            ferb_api_url(
              FerbRoutes.client_authorization_path(
                participant_homer.legacy_descriptor.legacy_id
              )
            )).and_return(status: 200)
          stub_request(
            :post,
            ferb_api_url(
              FerbRoutes.screening_participant_path(existing_screening[:id])
            )
          ).and_return(json_body(created_participant_homer.to_json, status: 201))
          within '#search-card', text: 'Search' do
            fill_in 'Search for any person', with: 'Ho'
            find('strong', text: 'Homer Simpson').click
          end
          # The new participant was NOT added
          expect(page)
            .to have_selector(edit_participant_card_selector(created_participant_homer.id))
        end
      end
    end

    context 'with privileges to add sensitive' do
      scenario 'can add sensitive person' do
        Feature.run_with_activated(:authentication) do
          stub_person_search(person_response: marge_response)
          stub_county_agencies('1105')
          stub_empty_history_for_screening(existing_screening)
          visit edit_screening_path(id: existing_screening[:id], token: sensitive_token)
          sensitive_marge_attributes = build_participant_from_person_and_screening(
            marge,
            existing_screening
          )
          sensitive_participant_marge = FactoryBot.build(:participant, sensitive_marge_attributes)
          created_participant_marge = FactoryBot.create(
            :participant,
            sensitive_participant_marge.as_json
          )
          stub_request(:get,
            ferb_api_url(
              FerbRoutes.client_authorization_path(
                sensitive_participant_marge.legacy_descriptor.legacy_id
              )
            )).and_return(status: 200)
          stub_request(
            :post,
            ferb_api_url(
              FerbRoutes.screening_participant_path(existing_screening[:id])
            )
          ).and_return(json_body(created_participant_marge.to_json, status: 201))
          within '#search-card', text: 'Search' do
            fill_in 'Search for any person', with: 'Ma'
            find('strong', text: 'Marge Simpson').click
          end

          within edit_participant_card_selector(created_participant_marge.id) do
            within '.card-header' do
              expect(page).to have_content('Sensitive')
              expect(page).to have_content 'Marge Simpson'
              expect(page).to have_button 'Remove person'
            end
          end
          expect(
            a_request(
              :post,
              ferb_api_url(
                FerbRoutes.screening_participant_path(existing_screening[:id])
              )
            )
          ).to have_been_made
          expect(page)
            .to have_selector(edit_participant_card_selector(created_participant_marge.id))
        end
      end
      scenario 'can add sensitive person' do
        Feature.run_with_activated(:authentication) do
          stub_county_agencies('1105')
          stub_empty_history_for_screening(existing_screening)
          visit edit_screening_path(id: existing_screening[:id], token: sensitive_token)
          homer_attributes = build_participant_from_person_and_screening(
            homer,
            existing_screening
          )
          participant_homer = FactoryBot.build(:participant, homer_attributes)
          created_participant_homer = FactoryBot.create(
            :participant,
            participant_homer.as_json
          )
          stub_request(:get,
            ferb_api_url(
              FerbRoutes.client_authorization_path(
                participant_homer.legacy_descriptor.legacy_id
              )
            )).and_return(status: 200)
          stub_request(
            :post,
            ferb_api_url(
              FerbRoutes.screening_participant_path(existing_screening[:id])
            )
          ).and_return(json_body(created_participant_homer.to_json, status: 201))
          within '#search-card', text: 'Search' do
            fill_in 'Search for any person', with: 'Ho'
            find('strong', text: 'Homer Simpson').click
          end
          expect(page)
            .to have_selector(edit_participant_card_selector(created_participant_homer.id))
        end
      end
    end
  end
end
