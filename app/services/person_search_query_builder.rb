# frozen_string_literal: true

# PeopleSearchQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchQueryBuilder
  attr_reader :is_client_only, :search_term

  include QueryBuilderHelper
  ATTRIBUTES = {
    'first_name' => MEDIUM_BOOST,
    'last_name' => MEDIUM_BOOST,
    'first_name.phonetic' => LOW_BOOST,
    'last_name.phonetic' => LOW_BOOST,
    'first_name.diminutive' => LOW_BOOST,
    'last_name.diminutive' => LOW_BOOST,
    'date_of_birth_as_text' => HIGH_BOOST,
    'ssn' => HIGH_BOOST,
    'name_suffix' => MEDIUM_BOOST
  }.freeze

  def build_match_query(string)
    ATTRIBUTES.map do |k, v|
      match_query(k, formatted_query(string), boost: v)
    end
  end

  def build_query(builder)
    builder.payload[:query] = query
  end

  def query
    { bool: { must: must, should: should } }
  end

  def must
    # the client_only_search config option overrides the @is_client_only value
    return [] unless Rails.configuration.intake[:client_only_search] ||
                     is_client_only

    [client_only]
  end

  def should
    [match_query('autocomplete_search_bar', formatted_query(search_term),
      operator: 'and', boost: MEDIUM_BOOST),
     build_match_query(search_term)].flatten.compact
  end

  def client_only
    { match: { 'legacy_descriptor.legacy_table_name' => 'CLIENT_T' } }
  end
end
