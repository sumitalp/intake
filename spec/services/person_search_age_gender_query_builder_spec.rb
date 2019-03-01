# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchAgeGenderQueryBuilder do
  let(:date_of_birth) { '2000/02/01' }
  let(:date_of_birth_query) { PersonSearchResultBuilder.new.date_of_birth_query }
  let(:params) do
    { date_of_birth: date_of_birth }
  end

  describe '.query' do
    context 'returns hash' do
      it 'with query' do
        query_builder = QueryBuilder.new(person_search_fields: params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq date_of_birth_query['query']
      end
    end
  end
end
