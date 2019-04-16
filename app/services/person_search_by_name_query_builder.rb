# frozen_string_literal: true

# PersonSearchByNameQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchByNameQueryBuilder
  attr_reader :is_client_only, :last_name, :first_name, :middle_name, :suffix

  include QueryBuilderHelper

  def build_query(builder)
    builder.payload[:query] = query
  end

  def query
    q = { bool: { must: must } }
    f = last_name.blank? && first_name.blank? ? [] : functions
    { function_score: { query: q, functions: f, score_mode: 'sum', boost_mode: 'sum' } }
  end

  def must
    # the client_only_search config option overrides the @is_client_only value
    return [] unless Rails.configuration.intake[:client_only_search] || is_client_only
    [client_only]
  end

  def client_only
    match_query(field: 'legacy_descriptor.legacy_table_name', query: 'CLIENT_T', name: 'q_cli')
  end

  def mult_last
    queries = [multi_match(
      query: formatted_query("#{last_name} #{first_name}"), operator: 'and',
      fields: %w[last_name first_name], type: 'cross_fields', name: '1_mult_last_first'
    ), match_query(field: 'last_name', query: last_name, name: '1_mult_last')].compact
    { "filter": { "bool": { "must": queries } }, "weight": 16_384 }
  end

  def mult_last_suffix
    { "filter": { "bool": { "must": [multi_match(
      query: formatted_query("#{last_name} #{suffix}"), operator: 'and',
      fields: %w[last_name suffix], type: 'cross_fields', name: '2_mult_last_suffix'
    )] } }, "weight": 8192 }
  end

  def mult_aka
    { "filter": multi_match(query: formatted_query("#{last_name} #{first_name}"), operator: 'and',
                            fields: %w[akas.first_name akas.last_name], type: 'cross_fields',
                            name: '3_mult_aka'), "weight": 4096 }
  end

  def dim_last_first
    queries = [
      match_query(field: 'last_name', query: last_name, name: '4_dim_last'),
      match_query(field: 'first_name.diminutive', query: first_name, name: '4_dim_first')
    ].compact
    { "filter": { "bool": { "must": queries } }, "weight": 2048 }
  end

  def pho_last_first
    queries = [
      match_query(field: 'last_name', query: last_name, name: '5_pho_last'),
      match_query(field: 'first_name.phonetic', query: first_name, name: '5_pho_first')
    ].compact
    { "filter": { "bool": { "must": queries } }, "weight": 1024 }
  end

  def fz_last_first
    queries = [
      match_query(field: 'last_name', query: last_name, name: '6_fz_last'),
      fuzzy_query(
        field: 'first_name', query: first_name, fuzziness: '5',
        prefix_length: '1', max_expansions: '25', name: '6_fz_first'
      )
    ].compact
    { "filter": { "bool": { "must": queries } }, "weight": 512 }
  end

  def ngram_last_first
    queries = [
      match_query(field: 'last_name', query: last_name, name: '7_ngram_last'),
      match_query(field: 'first_name_ngram', query: first_name,
                  minimum_should_match: '25%', name: '7_ngram_first')
    ].compact
    { "filter": { "bool": { "must": queries } }, "weight": 256 }
  end

  def mult_fuzz
    { "filter": multi_match(
      query: formatted_query("#{first_name} #{last_name}"), operator: 'and',
      fields: %w[first_name last_name], fuzziness: '2', name: '7_mult_fuzz'
    ), "weight": 200 }
  end

  def rev_last_first
    { "filter": { "bool": { "must": [
      match_query(field: 'last_name', query: first_name, name: '8_rev_last'),
      match_query(field: 'first_name', query: last_name, name: '8_rev_first')
    ].compact } }, "weight": 128 }
  end

  def dupe_last_first
    return if last_name.blank?
    { "filter": { "bool": { "must": [
      match_query(field: 'last_name', query: last_name, name: '8_dupe_last'),
      match_query(field: 'first_name', query: last_name, name: '8_dupe_first')
    ] } }, "weight": -16 }
  end

  def xa_match_last
    return if last_name.blank?
    { "filter": match_query(field: 'last_name', query: last_name, name: 'xa_m_last'), "weight": 32 }
  end

  def xb_match_first
    return if first_name.blank?
    { "filter": match_query(field: 'first_name', query: first_name, name: 'xb_m_first'),
      "weight": 16 }
  end

  def functions
    [mult_last, mult_last_suffix, mult_aka, dim_last_first,
     pho_last_first, fz_last_first, ngram_last_first, mult_fuzz,
     rev_last_first, dupe_last_first, xa_match_last, xb_match_first].flatten.compact
  end
end
