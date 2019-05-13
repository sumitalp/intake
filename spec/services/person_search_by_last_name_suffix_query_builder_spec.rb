# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchByLastNameSuffixQueryBuilder do
  describe '.build_query' do
    let(:last_name) { 'last name' }
    let(:suffix) { 'suffix' }

    let(:no_last_name_suffix_query) { PersonSearchResultBuilder.new.fs_no_last_name_suffix_query }
    let(:last_name_suffix_query) { PersonSearchResultBuilder.new.fs_last_name_suffix_query }

    let(:no_last_name_params) {}
    let(:last_name_with_suffix_params) do
      {
        last_name: last_name,
        suffix: suffix
      }
    end

    context 'returns hash' do
      it 'with no last name and suffix query' do
        query_builder = QueryBuilder.new(person_search_fields: no_last_name_params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq no_last_name_suffix_query['query']
      end
    end

    context 'returns hash' do
      it 'with last name and suffix query' do
        query_builder = QueryBuilder.new(person_search_fields: last_name_with_suffix_params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq last_name_suffix_query['query']
      end
    end
  end
end
