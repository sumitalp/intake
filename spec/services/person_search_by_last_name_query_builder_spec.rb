# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchByLastNameQueryBuilder do
  describe '.build_query' do
    let(:last_name) { 'last name' }

    let(:no_last_name_query) { PersonSearchResultBuilder.new.fs_no_last_name_query }
    let(:last_name_query) { PersonSearchResultBuilder.new.fs_last_name_query }

    let(:no_last_name_params) {}
    let(:last_name_params) do
      { last_name: last_name }
    end

    context 'returns hash' do
      it 'with no last name query' do
        query_builder = QueryBuilder.new(person_search_fields: no_last_name_params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq no_last_name_query['query']
      end
    end

    context 'returns hash' do
      it 'with last name query' do
        query_builder = QueryBuilder.new(person_search_fields: last_name_params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq last_name_query['query']
      end
    end
  end
end
