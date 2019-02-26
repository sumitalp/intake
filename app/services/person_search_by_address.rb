# frozen_string_literal: true

# PeopleSearchByAddress is a service class responsible for creation
# of an elastic search person search query
module PersonSearchByAddress
  attr_reader :county, :city, :street, :state, :country, :zip_code
  include QueryBuilderHelper

  def build_query(builder)
    builder.payload[:query][:bool][:should].concat(should)
  end

  def query
    { bool: { should: should } }
  end

  def should
    [{ "nested": { "path": 'addresses', "query": { "bool": { "should": [
      match_query('addresses.autocomplete_searchable_address', street,
        operator: 'and', boost: HIGH_BOOST),
      match_query('addresses.last_known', 'true', boost: HIGH_BOOST),
      match_query('addresses.autocomplete_city', city, boost: HIGH_BOOST),
      match_query('addresses.county.description', county, boost: HIGH_BOOST),
      match_query('addresses.searchable_address', street, boost: HIGH_BOOST),
      match_query('addresses.city', city, boost: HIGH_BOOST)
    ].compact } } } }]
  end
end
