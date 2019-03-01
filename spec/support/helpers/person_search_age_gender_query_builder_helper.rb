# frozen_string_literal: true

module PersonSearchAgeGenderQueryBuilderHelper
  def date_of_birth_query
    {
      "size": '10',
      "track_scores": 'true',
      "sort": [
        {
          "_score": 'desc',
          "_uid": 'desc'
        }
      ],
      "query": {
        "bool": {
          "should": [
            {
              "query_string": {
                "default_field": 'date_of_birth_as_text',
                "query": '02012000',
                "boost": '10'
              }
            }
          ]
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end
end
