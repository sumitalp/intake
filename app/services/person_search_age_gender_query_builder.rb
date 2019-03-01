# frozen_string_literal: true

# PeopleSearchQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchAgeGenderQueryBuilder
  attr_reader :is_client_only, :date_of_birth

  include ApplicationHelper
  include QueryBuilderHelper

  def build_query(builder)
    builder.payload[:query][:bool][:should].concat(should)
  end

  def query
    { bool: { should: should } }
  end

  def should
    [
      query_string(
        'date_of_birth_as_text',
        formatted_query(format_date(date_of_birth)),
        boost: HIGH_BOOST
      )
    ].flatten.compact
  end
end
