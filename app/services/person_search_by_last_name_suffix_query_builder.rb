# frozen_string_literal: true

# PersonSearchByLastNameSuffixQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchByLastNameSuffixQueryBuilder
  attr_reader :is_client_only, :last_name, :suffix

  include QueryBuilderHelper

  def build_query(builder)
    builder.payload[:query] = query
  end

  def query
    q = { bool: { must: must } }
    f = function_score_queries(fs_query_params)
    { function_score: { query: q, functions: f, score_mode: 'max', boost_mode: 'max' } }
  end

  def must
    # the client_only_search config option overrides the @is_client_only value
    return [] unless Rails.configuration.intake[:client_only_search] || is_client_only
    [client_only]
  end

  def client_only
    match_query(field: 'legacy_descriptor.legacy_table_name', query: 'CLIENT_T', name: 'q_cli')
  end

  def match_last_name_and_suffix
    double_match_query(fields: %w[last_name name_suffix],
                       values: [last_name, suffix], names: %w[1_exact_last 1_exact_suffix])
  end

  def match_last_name_and_suffix_akas
    double_match_query(fields: %w[akas.last_name akas.suffix], values: [last_name, suffix],
                       names: %w[2_aka_last 2_aka_suffix])
  end

  def match_last_name_suffix_partial
    double_match_query(fields: %w[last_name name_suffix_ngram], values: [last_name, suffix],
                       names: %w[3_exact_last 3_partial_suffix], min_s_m: [nil, '15%'])
  end

  def match_last_name_suffix_dim
    double_match_query(fields: %w[last_name name_suffix.diminutive], values: [last_name, suffix],
                       names: %w[4_exact_last 4_diminutive_suffix])
  end

  def match_last_name
    [match_query(field: 'last_name', query: last_name, name: '5_exact_last')].compact
  end

  def match_suffix
    [match_query(field: 'name_suffix', query: suffix, name: '5_no_match_suffix')].compact
  end

  def match_suffix_last_name_partial
    double_match_query(fields: %w[name_suffix last_name_ngram], values: [suffix, last_name],
                       names: %w[6_exact_suffix 6_partial_match], min_s_m: [nil, '15%'])
  end

  def match_suffix_last_name_fuzzy
    [match_query(field: 'name_suffix', query: suffix, name: '7_exact_suffix'),
     match_query(query_type: 'fuzzy', field: 'last_name', value: last_name, fuzziness: '3',
                 prefix_length: '1', max_expansions: '50', name: '7_fuzzy_last')].compact
  end

  def fs_query_params
    [
      { q: match_last_name_and_suffix, w: 16_384, bq: true },
      { q: match_last_name_and_suffix_akas, w: 8192, bq: true },
      { q: match_last_name_suffix_partial, w: 4096, bq: true },
      { q: match_last_name_suffix_dim, w: 2048, bq: true },
      { q: match_last_name, not_q: match_suffix, w: 1024, bq: true },
      { q: match_suffix_last_name_partial, w: 512, bq: true },
      { q: match_suffix_last_name_fuzzy, w: 256, bq: true }
    ].compact
  end
end
