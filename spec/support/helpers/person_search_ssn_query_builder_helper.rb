# frozen_string_literal: true

module PersonSearchSsnQueryBuilderHelper
  def ssn_query
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
                "default_field": 'ssn',
                "query": '123456789',
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
