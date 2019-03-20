# frozen_string_literal: true

module PersonSearchGenderQueryBuilderHelper
  def gender_query
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
          "must": [
            {
              "query_string": {
                "default_field": 'gender',
                "query": 'male',
                "boost": '1'
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
