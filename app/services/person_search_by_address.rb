# frozen_string_literal: true

# PeopleSearchByAddress is a service class responsible for creation
# of an elastic search person search query
module PersonSearchByAddress
  attr_reader :county, :city, :street
  include QueryBuilderHelper

  def build_query(builder)
    if builder.advanced_search_on?
      builder.payload[:query][:function_score][:query][:bool][:should] = should
    else
      builder.payload[:query][:bool][:should].concat(should)
    end
  end

  def query
    { bool: { should: should } }
  end

  def should
    [{ "nested": { "path": 'addresses', "query": { "bool": { "should": [
      match_query(field: 'addresses.autocomplete_searchable_address', query: street,
                  operator: 'and', boost: HIGH_BOOST),
      match_query(field: 'addresses.last_known', query: 'true', boost: HIGH_BOOST),
      match_query(field: 'addresses.autocomplete_city', query: city, boost: HIGH_BOOST),
      match_query(field: 'addresses.county.description', query: county, boost: HIGH_BOOST),
      match_query(field: 'addresses.searchable_address', query: street, boost: HIGH_BOOST),
      match_query(field: 'addresses.city', query: city, boost: HIGH_BOOST)
    ].compact } } } }]
  end
end
