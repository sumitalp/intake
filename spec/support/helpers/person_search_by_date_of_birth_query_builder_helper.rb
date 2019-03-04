module PersonSearchByDateOfBirthQueryBuilderHelper
  def date_of_birth_query
    {
        "size": '4',
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
        "default_field": 'date_of_birth_as_text',
        "query": '05051989',
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
