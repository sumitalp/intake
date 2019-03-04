# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength
module PersonSearchQueryBuilderHelper
  def person_and_address
    { "size": '10',
      "track_scores": 'true',
      "sort": [{
        "_score": 'desc',
        "_uid": 'desc'
      }],
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
              "match": {
                "legacy_descriptor.legacy_ui_id_flat": {
                  "boost": '10',
                  "query": 'this is test search term'
                }
              }
            },
            {
              "query_string": {
                "boost": '10',
                "default_field": 'autocomplete_search_bar',
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
                "default_field": 'last_name',
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
                "default_field": 'last_name.phonetic',
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
                "default_field": 'last_name.diminutive',
                "query": 'this is test search term'
              }
            },
            {
              "query_string": {
                "boost": '10',
                "default_field": 'date_of_birth_as_text',
                "query": 'this is test search term'
              }
            },
            {
              "query_string": {
                "boost": '10',
                "default_field": 'ssn',
                "query": 'this is test search term'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'name_suffix',
                "query": 'this is test search term'
              }
            },
            {
              "nested": {
                "path": 'addresses',
                "query": {
                  "bool": {
                    "should": [
                      {
                        "match": {
                          "addresses.autocomplete_searchable_address": {
                            "boost": '10',
                            "operator": 'and',
                            "query": 'street_number_and_name_search_term'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.last_known": {
                            "boost": '10',
                            "query": 'true'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.autocomplete_city": {
                            "boost": '10',
                            "query": 'city_search_term'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.county.description": {
                            "boost": '10',
                            "query": 'county_search_term'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.searchable_address": {
                            "boost": '10',
                            "query": 'street_number_and_name_search_term'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.city": {
                            "boost": '10',
                            "query": 'city_search_term'
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
      },
      "_source": source,
      "highlight": highlight }.as_json
  end

  def person_only_query
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
              "match": {
                "legacy_descriptor.legacy_ui_id_flat": {
                  "boost": '10',
                  "query": 'this is test search term'
                }
              }
            },
            {
              "query_string": {
                "default_field": 'autocomplete_search_bar',
                "query": 'this is test search term',
                "boost": '10'
              }
            },
            {
              "query_string": {
                "default_field": 'first_name',
                "query": 'this is test search term',
                "boost": '4'
              }
            },
            {
              "query_string": {
                "default_field": 'last_name',
                "query": 'this is test search term',
                "boost": '4'
              }
            },
            {
              "query_string": {
                "default_field": 'first_name.phonetic',
                "query": 'this is test search term',
                "boost": '2'
              }
            },
            {
              "query_string": {
                "default_field": 'last_name.phonetic',
                "query": 'this is test search term',
                "boost": '2'
              }
            },
            {
              "query_string": {
                "default_field": 'first_name.diminutive',
                "query": 'this is test search term',
                "boost": '2'
              }
            },
            {
              "query_string": {
                "default_field": 'last_name.diminutive',
                "query": 'this is test search term',
                "boost": '2'
              }
            },
            {
              "query_string": {
                "default_field": 'date_of_birth_as_text',
                "query": 'this is test search term',
                "boost": '10'
              }
            },
            {
              "query_string": {
                "default_field": 'ssn',
                "query": 'this is test search term',
                "boost": '10'
              }
            },
            {
              "query_string": {
                "default_field": 'name_suffix',
                "query": 'this is test search term',
                "boost": '4'
              }
            }
          ]
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end

  def client_id_only_query
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
          "must": [{
            "match": {
              "legacy_descriptor.legacy_ui_id_flat": {
                "query": '1111111111111111111',
                "boost": '10'
              }
            }
          }]
        }
      },
      "_source": source
    }.as_json
  end
end
