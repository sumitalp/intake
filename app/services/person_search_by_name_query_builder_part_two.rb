# frozen_string_literal: true

# PersonSearchByNameQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchByNameQueryBuilderPartTwo
  attr_reader :is_client_only, :last_name, :first_name, :middle_name

  include QueryBuilderHelper

  def build_query(builder)
    queries = function_score_queries(fs_query_params)
    builder.payload[:query][:function_score][:functions].concat(queries)
  end

  def query
    f = last_name.blank? && first_name.blank? ? [] : function_score_queries(fs_query_params)
    { function_score: { functions: f, score_mode: 'sum', boost_mode: 'sum' } }
  end

  def reverse_match_last_and_first_name
    double_match_query(fields: %w[last_name first_name], values: [first_name, last_name],
                       names: %w[9a_rev_lst 9a_rev_fst])
  end

  def reverse_match_last_name_first_name_partial
    double_match_query(fields: %w[last_name first_name_ngram], values: [first_name, last_name],
                       names: %w[9b_rev_prt_lst 9b_rev_prt_fst], min_s_m: [nil, '25%'])
  end

  def match_last_name_duplicate
    double_match_query(fields: %w[last_name first_name], values: [last_name, last_name],
                       names: %w[10_dup_lst 10_dup_fst])
  end

  def reverse_match_last_and_first_name_partial
    double_match_query(fields: %w[last_name_ngram first_name_ngram], min_s_m: ['25%', '25%'],
                       names: %w[11_rev_prt_lst 11_rev_prt_fst], values: [first_name, last_name])
  end

  def match_last_name
    match_query(field: 'last_name', query: last_name, name: '8_m_lst')
  end

  def match_first_name
    match_query(field: 'first_name', query: first_name, name: 'xb_m_fst')
  end

  def fs_query_params
    [
      { q: reverse_match_last_and_first_name, w: 128, bq: true },
      { q: reverse_match_last_name_first_name_partial, w: 64, bq: true },
      { q: match_last_name_duplicate, w: 32, bq: true },
      { q: reverse_match_last_and_first_name_partial, w: 16, bq: true },
      { q: match_last_name, w: 12, bq: false },
      { q: match_first_name, w: 8, bq: false }
    ].compact
  end
end
