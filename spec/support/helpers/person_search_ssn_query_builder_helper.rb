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
          "must": [
            { 'match' => { 'ssn' => { 'query' => '123456789' } } }
          ]
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end
end
