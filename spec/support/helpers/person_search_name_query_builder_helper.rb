# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength
module PersonSearchNameQueryBuilderHelper
  def name_query
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
              "match": {
                "legacy_descriptor.legacy_table_name": 'CLIENT_T'
              }
            }
          ],
          "should": [
            {
              "query_string": {
                "boost": '4',
                "default_field": 'last_name',
                "query": 'this is test search term'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'first_name',
                "query": 'this is test search term'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'middle_name',
                "query": 'this is test search term'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.phonetic',
                "query": 'this is test search term'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.phonetic',
                "query": 'this is test search term'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name.phonetic',
                "query": 'this is test search term'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.diminutive',
                "query": 'this is test search term'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.diminutive',
                "query": 'this is test search term'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name.diminutive',
                "query": 'this is test search term'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'name_suffix',
                "query": 'this is test search term'
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
