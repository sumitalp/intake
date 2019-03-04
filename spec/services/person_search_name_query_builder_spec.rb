# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchNameQueryBuilder do
  describe '.build_query' do
    let(:last_name) { 'last name' }
    let(:first_name) { 'first name' }
    let(:middle_name) { 'middle name' }
    let(:suffix) { 'suffix' }
    let(:name_query) { PersonSearchResultBuilder.new.name_query }
    let(:params) do
      {
        last_name: last_name,
        first_name: first_name,
        middle_name: middle_name,
        suffix: suffix
      }
    end

    context 'returns hash' do
      it 'with query' do
        query_builder = QueryBuilder.new(person_search_fields: params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq name_query['query']
      end
    end
  end
end
