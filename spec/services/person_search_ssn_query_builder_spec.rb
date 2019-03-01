# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchSsnQueryBuilder do
  let(:ssn) { '123456789' }
  let(:ssn_query) { PersonSearchResultBuilder.new.ssn_query }
  let(:params) do
    { ssn: ssn }
  end

  describe '.query' do
    context 'returns hash' do
      it 'with query' do
        query_builder = QueryBuilder.new(person_search_fields: params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq ssn_query['query']
      end
    end
  end
end
