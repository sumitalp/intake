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
                "autocomplete_search_bar": {
                  "query": 'person_search_term',
                  "operator": 'and',
                  "boost": '4'
                }
              }
            },
            {
              "match": {
                "first_name": {
                  "query": 'person_search_term',
                  "boost": '4'
                }
              }
            },
            {
              "match": {
                "last_name": {
                  "query": 'person_search_term',
                  "boost": '4'
                }
              }
            },
            {
              "match": {
                "first_name.phonetic": {
                  "query": 'person_search_term',
                  "boost": '2'
                }
              }
            },
            {
              "match": {
                "last_name.phonetic": {
                  "query": 'person_search_term',
                  "boost": '2'
                }
              }
            },
            {
              "match": {
                "first_name.diminutive": {
                  "query": 'person_search_term',
                  "boost": '2'
                }
              }
            },
            {
              "match": {
                "last_name.diminutive": {
                  "query": 'person_search_term',
                  "boost": '2'
                }
              }
            },
            {
              "match": {
                "date_of_birth_as_text": {
                  "query": 'person_search_term',
                  "boost": '10'
                }
              }
            },
            {
              "match": {
                "ssn": {
                  "query": 'person_search_term',
                  "boost": '10'
                }
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
                            "query": 'street_number_and_name_search_term',
                            "operator": 'and',
                            "boost": '10'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.last_known": {
                            "query": 'true',
                            "boost": '10'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.autocomplete_city": {
                            "query": 'city_search_term',
                            "boost": '10'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.county.description": {
                            "query": 'county_search_term',
                            "boost": '10'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.searchable_address": {
                            "query": 'street_number_and_name_search_term',
                            "boost": '10'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.city": {
                            "query": 'city_search_term',
                            "boost": '10'
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
                "autocomplete_search_bar": {
                  "query": 'person_search_term',
                  "operator": 'and',
                  "boost": '4'
                }
              }
            },
            {
              "match": {
                "first_name": {
                  "query": 'person_search_term',
                  "boost": '4'
                }
              }
            },
            {
              "match": {
                "last_name": {
                  "query": 'person_search_term',
                  "boost": '4'
                }
              }
            },
            {
              "match": {
                "first_name.phonetic": {
                  "query": 'person_search_term',
                  "boost": '2'
                }
              }
            },
            {
              "match": {
                "last_name.phonetic": {
                  "query": 'person_search_term',
                  "boost": '2'
                }
              }
            },
            {
              "match": {
                "first_name.diminutive": {
                  "query": 'person_search_term',
                  "boost": '2'
                }
              }
            },
            {
              "match": {
                "last_name.diminutive": {
                  "query": 'person_search_term',
                  "boost": '2'
                }
              }
            },
            {
              "match": {
                "date_of_birth_as_text": {
                  "query": 'person_search_term',
                  "boost": '10'
                }
              }
            },
            {
              "match": {
                "ssn": {
                  "query": 'person_search_term',
                  "boost": '10'
                }
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
