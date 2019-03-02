# frozen_string_literal: true

# PeopleSearchQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchSsnQueryBuilder
  attr_reader :is_client_only, :ssn

  include QueryBuilderHelper

  def build_query(builder)
    builder.payload[:query][:bool][:should].concat(should)
  end

  def query
    { bool: { should: should } }
  end

  def should
    [query_string('ssn', formatted_query(ssn), boost: HIGH_BOOST)].flatten.compact
  end
end
