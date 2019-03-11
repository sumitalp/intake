# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength
module PersonSearchNameQueryBuilderHelper
  def full_name_query
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
                "boost": '10',
                "default_field": 'last_name',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'first_name',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.phonetic',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.phonetic',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name.phonetic',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.diminutive',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.diminutive',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name.diminutive',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'name_suffix',
                "query": 'suffix'
              }
            },
            {
              "multi_match": {
                "query": 'last name first name',
                "type": 'cross_fields',
                "fields": %w[first_name last_name],
                "operator": 'and',
                "boost": '10'
              }
            },
            {
              "match": {
                "first_name": {
                  "query": 'first name',
                  "operator": 'and',
                  "boost": '1',
                  "fuzziness": '3'
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

  def last_name_query
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
                "boost": '10',
                "default_field": 'last_name',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.phonetic',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.diminutive',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'name_suffix',
                "query": 'suffix'
              }
            }
          ]
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end

  def first_name_query
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
                "default_field": 'first_name',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.phonetic',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.diminutive',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'name_suffix',
                "query": 'suffix'
              }
            },
            {
              "match": {
                "first_name": {
                  "query": 'first name',
                  "operator": 'and',
                  "boost": '1',
                  "fuzziness": '3'
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

  def full_name_ssn_query
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
            },
              {
                  "query_string": {
                  "default_field": 'ssn',
                  "query": '123456789',
                  "boost": '10'
              }
            }
          ],
          "should": [
            {
              "query_string": {
                "boost": '10',
                "default_field": 'last_name',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'first_name',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.phonetic',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.phonetic',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name.phonetic',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.diminutive',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.diminutive',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name.diminutive',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'name_suffix',
                "query": 'suffix'
              }
            },
            {
              "multi_match": {
                "query": 'last name first name',
                "type": 'cross_fields',
                "fields": %w[first_name last_name],
                "operator": 'and',
                "boost": '10'
              }
            },
            {
              "match": {
                "first_name": {
                  "query": 'first name',
                  "operator": 'and',
                  "boost": '1',
                  "fuzziness": '3'
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

  def full_name_date_of_birth_query
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
            },
            {
              "query_string": {
                "default_field": 'date_of_birth_as_text',
                "query": '05051989',
                "boost": '10'
              }
            }
          ],
          "should": [
            {
              "query_string": {
                "boost": '10',
                "default_field": 'last_name',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'first_name',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.phonetic',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.phonetic',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name.phonetic',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.diminutive',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.diminutive',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name.diminutive',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'name_suffix',
                "query": 'suffix'
              }
            },
            {
              "multi_match": {
                "query": 'last name first name',
                "type": 'cross_fields',
                "fields": %w[first_name last_name],
                "operator": 'and',
                "boost": '10'
              }
            },
            {
              "match": {
                "first_name": {
                  "query": 'first name',
                  "operator": 'and',
                  "boost": '1',
                  "fuzziness": '3'
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

  def full_name_ssn_date_of_birth_query
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
            },
            {
                    "query_string": {
                    "default_field": 'ssn',
                    "query": '123456789',
                    "boost": '10'
                }
            },
            {
              "query_string": {
                "default_field": 'date_of_birth_as_text',
                "query": '05051989',
                "boost": '10'
              }
            }
          ],
          "should": [
            {
              "query_string": {
                "boost": '10',
                "default_field": 'last_name',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'first_name',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.phonetic',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.phonetic',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name.phonetic',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.diminutive',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.diminutive',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name.diminutive',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'name_suffix',
                "query": 'suffix'
              }
            },
            {
              "multi_match": {
                "query": 'last name first name',
                "type": 'cross_fields',
                "fields": %w[first_name last_name],
                "operator": 'and',
                "boost": '10'
              }
            },
            {
              "match": {
                "first_name": {
                  "query": 'first name',
                  "operator": 'and',
                  "boost": '1',
                  "fuzziness": '3'
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

  def full_name_ssn_date_of_birth_address_query
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
            },
            {
                    "query_string": {
                    "default_field": 'ssn',
                    "query": '123456789',
                    "boost": '10'
                }
            },
            {
              "query_string": {
                "default_field": 'date_of_birth_as_text',
                "query": '05051989',
                "boost": '10'
              }
            }
          ],
          "should": [
            {
              "query_string": {
                "boost": '10',
                "default_field": 'last_name',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'first_name',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.phonetic',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.phonetic',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name.phonetic',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.diminutive',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.diminutive',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'middle_name.diminutive',
                "query": 'middle name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'name_suffix',
                "query": 'suffix'
              }
            },
            {
              "multi_match": {
                "query": 'last name first name',
                "type": 'cross_fields',
                "fields": %w[first_name last_name],
                "operator": 'and',
                "boost": '10'
              }
            },
            {
              "match": {
                "first_name": {
                  "query": 'first name',
                  "operator": 'and',
                  "boost": '1',
                  "fuzziness": '3'
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
      "highlight": highlight
    }.as_json
  end

  def last_name_ssn_date_of_birth_address_query
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
            },
            {
                    "query_string": {
                    "default_field": 'ssn',
                    "query": '123456789',
                    "boost": '10'
                }
            },
            {
              "query_string": {
                "default_field": 'date_of_birth_as_text',
                "query": '05051989',
                "boost": '10'
              }
            }
          ],
          "should": [
            {
              "query_string": {
                "boost": '10',
                "default_field": 'last_name',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.phonetic',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'last_name.diminutive',
                "query": 'last name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'name_suffix',
                "query": 'suffix'
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
      "highlight": highlight
    }.as_json
  end

  def first_name_ssn_date_of_birth_address_query
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
            },
            {
                    "query_string": {
                    "default_field": 'ssn',
                    "query": '123456789',
                    "boost": '10'
                }
            }
            {
              "query_string": {
                "default_field": 'date_of_birth_as_text',
                "query": '05051989',
                "boost": '10'
              }
            }
          ],
          "should": [
            {
              "query_string": {
                "boost": '4',
                "default_field": 'first_name',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.phonetic',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '2',
                "default_field": 'first_name.diminutive',
                "query": 'first name'
              }
            },
            {
              "query_string": {
                "boost": '4',
                "default_field": 'name_suffix',
                "query": 'suffix'
              }
            },
            {
              "match": {
                "first_name": {
                  "query": 'first name',
                  "operator": 'and',
                  "boost": '1',
                  "fuzziness": '3'
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
      "highlight": highlight
    }.as_json
  end
end
