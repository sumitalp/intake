# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchByClientId do
  describe '.build_query' do
    let(:client_id) { '1111-1111-1111-1111111' }
    let(:client_id_only_query) { PersonSearchResultBuilder.new.client_id_only_query }

    context 'returns hash' do
      it 'with query' do
        query_builder = QueryBuilder.new(client_id: client_id)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq client_id_only_query['query']
      end
    end
  end
end
