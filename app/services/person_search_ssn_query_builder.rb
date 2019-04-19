# frozen_string_literal: true

# PeopleSearchQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchSsnQueryBuilder
  attr_reader :ssn

  include QueryBuilderHelper

  def build_query(builder)
    builder.payload[:query] = query
  end

  def query
    { bool: { must: must } }
  end

  def must
    [match_query(field: 'ssn', query: formatted_query(ssn))].flatten.compact
  end
end
