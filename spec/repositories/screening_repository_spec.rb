# frozen_string_literal: true
require 'rails_helper'

describe ScreeningRepository do
  describe '.create' do
    let(:mock_response) { double(:mock_response, status: 201, body: 'mock_body') }
    let(:mock_request) { double(:mock_request) }
    let(:new_screening) { FactoryGirl.build(:screening) }
    let(:created_screening) { double(:screening) }

    it 'returns the screening if the post to /screenings is successful' do
      allow(API.intake_api_connection).to receive(:post)
        .and_yield(mock_request)
        .and_return(mock_response)
      expect(mock_request).to receive(:url).with(ScreeningRepository::SCREENINGS_PATH)
      expect(mock_request).to receive(:headers).and_return({})
      expect(mock_request).to receive(:body=).with(new_screening.as_json.except('id').to_json)
      expect(Screening).to receive(:new).with(mock_response.body)
        .and_return(created_screening)
      expect(described_class.create(new_screening)).to eq(created_screening)
    end

    it 'raise an error if the response code is not 201' do
      stub_request(:post, %r{/api/v1/screenings})
        .and_return(status: 500)
      expect do
        described_class.create(new_screening)
      end.to raise_error(ApiError)
    end
  end

  describe '.find' do
    it 'returns the screening if the get request to /screenings/:id is successful' do
      mock_response = double(:mock_response, status: 200, body: { id: 'mock_body' })
      mock_request = double(:mock_request)
      found_screening = double(:screening)
      allow(API.intake_api_connection).to receive(:get)
        .and_yield(mock_request)
        .and_return(mock_response)
      expect(mock_request).to receive(:url).with("#{ScreeningRepository::SCREENINGS_PATH}/1")
      expect(mock_request).to_not receive(:headers)
      expect(mock_request).to_not receive(:body=)
      expect(Screening).to receive(:new).with(mock_response.body)
        .and_return(found_screening)
      expect(described_class.find(1)).to eq(found_screening)
    end

    it 'raise an error if the response code is not 200' do
      stub_request(:get, %r{/api/v1/screenings/\d})
        .and_return(status: 500)

      expect do
        described_class.find(1)
      end.to raise_error(ApiError)
    end
  end

  describe '.update' do
    it 'returns the screening if the put to /screenings/:id is successful' do
      mock_response = double(:mock_response, status: 200, body: { id: 'mock_body' })
      mock_request = double(:mock_request)
      created_screening = FactoryGirl.create(:screening)
      updated_screening = double(:screening)
      allow(API.intake_api_connection).to receive(:put)
        .and_yield(mock_request)
        .and_return(mock_response)
      expect(mock_request).to receive(:url)
        .with("#{ScreeningRepository::SCREENINGS_PATH}/#{created_screening.id}")
      expect(mock_request).to receive(:headers).and_return({})
      expect(mock_request).to receive(:body=).with(created_screening.as_json.except('id').to_json)
      expect(Screening).to receive(:new).with(mock_response.body)
        .and_return(updated_screening)
      expect(described_class.update(created_screening)).to eq(updated_screening)
    end

    it 'raise an error if the response code is not 201' do
      created_screening = double(:screening, id: '1')

      stub_request(:put, %r{/api/v1/screenings})
        .and_return(status: 500)

      expect do
        described_class.update(created_screening)
      end.to raise_error(ApiError)
    end

    it 'raises an error if screening id is not present' do
      created_screening = double(:screening, id: nil)
      expect do
        described_class.update(created_screening)
      end.to raise_error('Error updating screening: id is required')
    end
  end

  describe '.search' do
    it 'raise an error if the response code is not 200' do
      stub_request(:get, %r{/api/v1/screenings})
        .and_return(status: 500, headers: { 'Content-Type': 'application/json' })

      expect do
        described_class.search({})
      end.to raise_error(ApiError)
    end

    it 'returns the screening results when screening search is successful' do
      results = [{ id: '1' }, { id: '2' }].to_json
      search_terms = { screening_decisions: %w(promote_to_referral screen_out) }
      stub_request(:get, %r{/api/v1/screenings\?#{search_terms.to_query}})
        .and_return(body: results, status: 200, headers: { 'Content-Type': 'application/json' })

      expect(described_class.search(search_terms)[0].id).to eq('1')
      expect(described_class.search(search_terms)[1].id).to eq('2')
    end

    it 'sends a GET request to api screening search' do
      search_terms = { screening_decisions: %w(promote_to_referral screen_out) }
      stub_request(:get, %r{/api/v1/screenings\?#{search_terms.to_query}})
        .and_return(body: [].to_json, status: 200, headers: { 'Content-Type': 'application/json' })

      described_class.search(search_terms)
      expect(a_request(:get, %r{/api/v1/screenings\?#{search_terms.to_query}})).to have_been_made
    end
  end
end
