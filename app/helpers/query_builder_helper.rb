# frozen_string_literal: true

# query builder helper
module QueryBuilderHelper
  NUMBER_OF_FRAGMENTS = '10'
  NO_BOOST = '1'
  LOW_BOOST = '2'
  MEDIUM_BOOST = '4'
  HIGH_BOOST = '14'
  SUPER_BOOST = '20'
  SIZE = '10'
  TRACK_SCORES = 'true'
  REQUIRE_FIELD_MATCH = 'false'
  MIN_SCORE = '2.5'

  def formatted_query(string)
    string.to_s.downcase
          .gsub(%r{[-/]*(\d+)[-/]*}, '\1')
          .gsub(/[_%]/, '_' => '?', '%' => '*')
          .strip
  end

  def generate_query_params(params)
    { params[:field] => {
      query: params[:query], value: params[:value], operator: params[:operator],
      boost: params[:boost], minimum_should_match: params[:min_should_match],
      _name: params[:name], fuzziness: params[:fuzziness], prefix_length: params[:prefix_length],
      max_expansions: params[:max_expansions], fields: params[:fields], type: params[:type]
    }.delete_if { |_k, v| v.blank? } }
  end

  def match_query(params)
    return if params[:query].blank? && params[:value].blank?
    query_params = generate_query_params(params)
    type = params[:query_type].blank? ? 'match' : params[:query_type]
    { type => query_params }
  end

  def double_match_query(fields: [], values: [], names: [], min_s_m: [])
    [
      match_query(field: fields[0], query: values[0], name: names[0], min_should_match: min_s_m[0]),
      match_query(field: fields[1], query: values[1], name: names[1], min_should_match: min_s_m[1])
    ].flatten.compact
  end

  def query_string(field, query, boost: nil)
    return if query.blank?
    { query_string: {
      default_field: field,
      query: query,
      boost: boost
    }.delete_if { |_k, v| v.blank? } }
  end

  def multi_match(params)
    return if params[:query].blank?
    { multi_match: {
      query: params[:query], operator: params[:operator],
      fields: params[:fields], type: params[:type],
      fuzziness: params[:fuzziness], _name: params[:name]
    }.delete_if { |_k, v| v.blank? } }
  end

  def filter_query(queries: nil, not_queries: nil, weight: nil, bool_query: nil)
    return if queries.blank?
    b = not_queries.nil? ? { must: queries } : { must: queries, must_not: not_queries }
    f = bool_query ? { bool: b } : queries
    { filter: f, weight: weight }.delete_if { |_k, v| v.blank? }
  end

  def function_score_queries(hash_list)
    function_queries = []
    hash_list.each do |hash|
      params = { queries: hash[:q], not_queries: hash[:not_q],
                 weight: hash[:w], bool_query: hash[:bq] }.delete_if { |_k, v| v.blank? }
      fq = filter_query(params)
      function_queries.push(fq)
    end
    function_queries.flatten.compact
  end
end
