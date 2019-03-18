# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength
module PersonSearchByAddressHelper
  def address_only_query
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
                            "boost": '14'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.last_known": {
                            "query": 'true',
                            "boost": '14'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.autocomplete_city": {
                            "query": 'city_search_term',
                            "boost": '14'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.county.description": {
                            "query": 'county_search_term',
                            "boost": '14'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.searchable_address": {
                            "query": 'street_number_and_name_search_term',
                            "boost": '14'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.city": {
                            "query": 'city_search_term',
                            "boost": '14'
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
      "highlight": highlight
    }.as_json
  end

  def address_city_only
    {
      "query": {
        "bool": {
          "should": [
            {
              "nested": {
                "path": 'addresses',
                "query": {
                  "bool": {
                    "should": [
                      {
                        "match": {
                          "addresses.last_known": {
                            "query": 'true',
                            "boost": '14'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.autocomplete_city": {
                            "query": 'city_search_term',
                            "boost": '14'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.city": {
                            "query": 'city_search_term',
                            "boost": '14'
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
      }
    }.as_json
  end
end
