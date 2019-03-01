# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchQueryBuilder do
  describe '.build_query' do
    let(:search_term) { 'this is test search term' }
    let(:person_search_fields) do
      { search_term: search_term }
    end
    let(:person_only_query) { PersonSearchResultBuilder.new.person_only_query }

    context 'returns hash' do
      it 'with query' do
        query_builder = QueryBuilder.new(person_search_fields: person_search_fields)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq person_only_query['query']
      end
    end
  end
end
