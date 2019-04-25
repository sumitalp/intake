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

  def x_l_f
    double_match_query(fields: %w[last_name first_name], values: [last_name, first_name],
                       names: %w[1_m_lst 1_m_fst])
  end

  def m_l_sf
    return if suffix.blank?
    fq = formatted_query("#{last_name} #{suffix}")
    [multi_match(query: fq, operator: 'and', fields: %w[last_name suffix],
                 type: 'cross_fields', name: '2_mlt_last_suffix')].compact
  end

  def m_aka
    params = { fields: %w[akas.first_name akas.last_name], type: 'cross_fields', name: '3_mlt_aka' }
    mult_aka_fuzz(params)
  end

  def dim_l_f
    double_match_query(fields: ['last_name', 'first_name.diminutive'],
                       values: [last_name, first_name], names: %w[4_dim_lst 4_dim_fst])
  end

  def pho_l_f
    double_match_query(fields: ['last_name', 'first_name.phonetic'],
                       values: [last_name, first_name], names: %w[5_pho_lst 5_pho_fst])
  end

  def fz_l_f
    [match_query(field: 'last_name', query: last_name, name: '6_fz_lst'),
     match_query(query_type: 'fuzzy', field: 'first_name', value: first_name, fuzziness: '5',
                 prefix_length: '1', max_expansions: '25', name: '6_fz_fst')].compact
  end

  def l_f_ng
    double_match_query(fields: %w[last_name first_name_ngram], values: [last_name, first_name],
                       names: %w[7_prt_lst 7_prt_fst], min_s_m: [nil, '25%'])
  end

  def m_fz
    mult_aka_fuzz(fields: %w[first_name last_name], fuzziness: '2', name: '7_mlt_fz')
  end

  def rev_l_f
    double_match_query(fields: %w[last_name first_name], values: [first_name, last_name],
                       names: %w[9a_rev_lst 9a_rev_fst])
  end

  def rev_l_f_ng
    double_match_query(fields: %w[last_name first_name_ngram], values: [first_name, last_name],
                       names: %w[9b_rev_prt_lst 9b_rev_prt_fst], min_s_m: [nil, '25%'])
  end

  def dupe_l_f
    double_match_query(fields: %w[last_name first_name], values: [last_name, last_name],
                       names: %w[10_dup_lst 10_dup_fst])
  end

  def rev_l_ng_f_ng
    double_match_query(fields: %w[last_name_ngram first_name_ngram], min_s_m: ['25%', '25%'],
                       names: %w[11_rev_prt_lst 11_rev_prt_fst], values: [first_name, last_name])
  end

  def xa_m_l
    match_query(field: 'last_name', query: last_name, name: '8_m_lst')
  end

  def xb_m_f
    match_query(field: 'first_name', query: first_name, name: 'xb_m_fst')
  end

  def function_query_params
    [{ q: x_l_f, w: 16_384 }, { q: m_l_sf, w: 8192 }, { q: m_aka, w: 4096, bq: false },
     { q: dim_l_f, w: 2048 }, { q: pho_l_f, w: 1024 }, { q: fz_l_f, w: 512 },
     { q: l_f_ng, w: 256 }, { q: m_fz, w: 200, bq: false }, { q: rev_l_f, w: 128 },
     { q: rev_l_f_ng, w: 64 }, { q: dupe_l_f, w: 32 }, { q: rev_l_ng_f_ng, w: 16 },
     { q: xa_m_l, w: 12, bq: false }, { q: xb_m_f, w: 8, bq: false }].compact
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
