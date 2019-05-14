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
    f = function_score_queries(fs_query_params)
    { function_score: { functions: f, score_mode: 'sum', boost_mode: 'sum' } }
  end

  def reverse_match_last_and_first_name
    rev_last_name_params = generate_match_params('last_name', first_name, '9a_rev_lst', nil)
    rev_first_name_params = generate_match_params('first_name', last_name, '9a_rev_fst', nil)
    param_list = [rev_last_name_params, rev_first_name_params]
    match_query_list(param_list)
  end

  def reverse_match_last_name_first_name_partial
    rev_last_name_params = generate_match_params('last_name', first_name, '9b_rev_prt_lst', nil)
    rev_partial_first_name_params = generate_match_params('first_name_ngram', last_name,
      '9b_rev_prt_fst', '25%')
    param_list = [rev_last_name_params, rev_partial_first_name_params]
    match_query_list(param_list)
  end

  def match_last_name_duplicate
    last_name_params = generate_match_params('last_name', last_name, '10_dup_lst', nil)
    first_name_params = generate_match_params('first_name', last_name, '10_dup_fst', nil)
    param_list = [last_name_params, first_name_params]
    match_query_list(param_list)
  end

  def reverse_match_last_and_first_name_partial
    rev_partial_last_name_params = generate_match_params('last_name_ngram', first_name,
      '11_rev_prt_lst', '25%')
    rev_partial_first_name_params = generate_match_params('first_name_ngram', last_name,
      '11_rev_prt_fst', '25%')
    param_list = [rev_partial_last_name_params, rev_partial_first_name_params]
    match_query_list(param_list)
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
