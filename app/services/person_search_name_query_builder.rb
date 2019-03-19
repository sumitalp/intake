# frozen_string_literal: true

# PeopleSearchQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchNameQueryBuilder
  attr_reader :is_client_only, :last_name, :first_name, :middle_name, :suffix

  include QueryBuilderHelper

  ATTRIBUTES = {
    'last_name' => SUPER_BOOST,
    'first_name' => MEDIUM_BOOST,
    'middle_name' => LOW_BOOST,
    'last_name.phonetic' => LOW_BOOST,
    'first_name.phonetic' => LOW_BOOST,
    'middle_name.phonetic' => LOW_BOOST,
    'last_name.diminutive' => MEDIUM_BOOST,
    'first_name.diminutive' => MEDIUM_BOOST,
    'middle_name.diminutive' => MEDIUM_BOOST
  }.freeze

  def build_query_string(last_name, first_name, middle_name)
    ATTRIBUTES.map do |k, v|
      if k.include? 'last_name'
        value = last_name
      elsif k.include? 'first_name'
        value = first_name
      elsif k.include? 'middle_name'
        value = middle_name
      end
      query_string(k, formatted_query(value), boost: v)
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
    [
      build_query_string(last_name, first_name, middle_name),
      query_string('name_suffix', formatted_query(suffix), boost: MEDIUM_BOOST),
      match_name_inverse(last_name, first_name),
      fuzzy_match_first_name(first_name)
    ].flatten.compact
  end

  def fuzzy_match_first_name(first_name)
    return if first_name.blank?
    {
      match: {
        'first_name' => { query: first_name, operator: 'and', boost: MEDIUM_BOOST, fuzziness: '3' }
      }
    }
  end

  def match_name_inverse(last_name, first_name)
    return if last_name.blank? || first_name.blank?
    {
      'multi_match' => {
        'query'    => formatted_query("#{last_name} #{first_name}").strip,
        'type'     => 'cross_fields',
        'fields'   => %w[first_name last_name],
        'operator' => 'and',
        'boost' => HIGH_BOOST
      }
    }
  end

  def client_only
    { match: { 'legacy_descriptor.legacy_table_name' => 'CLIENT_T' } }
  end
end
