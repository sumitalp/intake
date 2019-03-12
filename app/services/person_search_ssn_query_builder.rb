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
    [query_string('ssn', formatted_query(ssn), boost: HIGH_BOOST)].flatten.compact
  end

end
