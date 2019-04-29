# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchByNameQueryBuilderPartOne do
  describe '.build_query' do
    let(:last_name) { 'last name' }
    let(:first_name) { 'first name' }
    let(:middle_name) { 'middle name' }
    let(:suffix) { 'suffix' }

    let(:full_name_query) { PersonSearchResultBuilder.new.fs_full_name_query_part_one }
    let(:full_name_without_suffix_query) do
      PersonSearchResultBuilder.new.fs_full_name_without_suffix_query_part_one
    end
    let(:last_name_query) { PersonSearchResultBuilder.new.fs_last_name_query_part_one }
    let(:first_name_query) { PersonSearchResultBuilder.new.fs_first_name_query_part_one }

    let(:full_name_params) do
      {
        last_name: last_name,
        first_name: first_name,
        middle_name: middle_name,
        suffix: suffix
      }
    end

    let(:full_name_without_suffix_params) do
      {
        last_name: last_name,
        first_name: first_name,
        middle_name: middle_name
      }
    end

    let(:last_name_params) do
      {
        last_name: last_name,
        suffix: suffix
      }
    end

    let(:first_name_params) do
      {
        first_name: first_name,
        suffix: suffix
      }
    end

    context 'returns hash' do
      it 'with full name query' do
        query_builder = QueryBuilder.new(person_search_fields: full_name_params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq full_name_query['query']
      end
    end

    context 'returns hash' do
      it 'with full name without suffix query' do
        query_builder = QueryBuilder.new(person_search_fields: full_name_without_suffix_params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq full_name_without_suffix_query['query']
      end
    end

    context 'returns hash' do
      it 'with last name query' do
        query_builder = QueryBuilder.new(person_search_fields: last_name_params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq last_name_query['query']
      end
    end

    context 'returns hash' do
      it 'with first name query' do
        query_builder = QueryBuilder.new(person_search_fields: first_name_params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq first_name_query['query']
      end
    end
  end
end
