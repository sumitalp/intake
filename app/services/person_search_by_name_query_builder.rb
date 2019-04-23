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
    f = last_name.blank? && first_name.blank? ? [] : generate_functions
    { function_score: { query: q, functions: f, score_mode: 'sum', boost_mode: 'sum' } }
  end

  def must
    # the client_only_search config option overrides the @is_client_only value
    return [] unless Rails.configuration.intake[:client_only_search] || is_client_only
    [client_only]
  end

  def double_match_query(fields: [], values: [], names: [], min_s_m: [])
    [
      match_query(field: fields[0], query: values[0], name: names[0], min_should_match: min_s_m[0]),
      match_query(field: fields[1], query: values[1], name: names[1], min_should_match: min_s_m[1])
    ].compact
  end

  def mult_aka_fuzz(fields: nil, type: nil, fuzziness: nil, name: nil)
    fq = formatted_query("#{last_name} #{first_name}")
    params = { query: fq, operator: 'and', fields: fields,
               fuzziness: fuzziness, type: type, name: name }
    multi_match(params)
  end

  def client_only
    match_query(field: 'legacy_descriptor.legacy_table_name', query: 'CLIENT_T', name: 'q_cli')
  end

  def mult_last
    [multi_match(
      query: formatted_query("#{last_name} #{first_name}"), operator: 'and',
      fields: %w[last_name first_name], type: 'cross_fields', name: '1_mult_last_first'
    ), match_query(field: 'last_name', query: last_name, name: '1_mult_last')].compact
  end

  def mult_last_suffix
    return if suffix.blank?
    fq = formatted_query("#{last_name} #{suffix}")
    [multi_match(query: fq, operator: 'and', fields: %w[last_name suffix],
                 type: 'cross_fields', name: '2_mult_last_suffix')].compact
  end

  def mult_aka
    params = { fields: %w[akas.first_name akas.last_name],
               type: 'cross_fields', name: '3_mult_aka' }
    mult_aka_fuzz(params)
  end

  def dim_last_first
    double_match_query(fields: ['last_name', 'first_name.diminutive'],
                       values: [last_name, first_name], names: %w[4_dim_last 4_dim_first])
  end

  def pho_last_first
    double_match_query(fields: ['last_name', 'first_name.phonetic'],
                       values: [last_name, first_name], names: %w[5_pho_last 5_pho_first])
  end

  def fz_last_first
    [match_query(field: 'last_name', query: last_name, name: '6_fz_last'),
     match_query(query_type: 'fuzzy', field: 'first_name', value: first_name, fuzziness: '5',
                 prefix_length: '1', max_expansions: '25', name: '6_fz_first')].compact
  end

  def ngram_last_first
    double_match_query(fields: %w[last_name first_name_ngram], values: [last_name, first_name],
                       names: %w[7_ngram_last 7_ngram_first], min_s_m: [nil, '25%'])
  end

  def mult_fuzz
    params = { fields: %w[first_name last_name], fuzziness: '2', name: '7_mult_fuzz' }
    mult_aka_fuzz(params)
  end

  def rev_last_first
    double_match_query(fields: %w[last_name first_name], values: [first_name, last_name],
                       names: %w[8_rev_last 8_rev_first])
  end

  def dupe_last_first
    double_match_query(fields: %w[last_name first_name], values: [last_name, last_name],
                       names: %w[8_dupe_last 8_dupe_first])
  end

  def xa_match_last
    match_query(field: 'last_name', query: last_name, name: 'xa_m_last')
  end

  def xb_match_first
    match_query(field: 'first_name', query: first_name, name: 'xb_m_first')
  end

  def function_query_params
    [
      { q: mult_last, w: 16_384, bq: true }, { q: mult_last_suffix, w: 8192, bq: true },
      { q: mult_aka, w: 4096 }, { q: dim_last_first, w: 2048, bq: true },
      { q: pho_last_first, w: 1024, bq: true }, { q: fz_last_first, w: 512, bq: true },
      { q: ngram_last_first, w: 256, bq: true }, { q: mult_fuzz, w: 200 },
      { q: rev_last_first, w: 128, bq: true }, { q: dupe_last_first, w: 8, bq: true },
      { q: xa_match_last, w: 32 }, { q: xb_match_first, w: 16 }
    ].flatten.compact
  end

  def generate_functions
    function_queries = []
    function_query_params.each do |hash|
      params = { queries: hash[:q], weight: hash[:w], bool_query: hash[:bq] }
      function_queries.push(filter_query(params))
    end
    function_queries.flatten.compact
  end
end
