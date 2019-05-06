# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength
module PersonSearchByNameQueryBuilderPartOneHelper
  def full_name_functions_part_one
    full_name_without_suffix_functions_part_one.insert(1, suffix_sub_query)
  end

  def full_name_without_suffix_functions_part_one
    [
      {
        "filter": {
          "bool": {
            "must": [
              {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": '1_m_lst'
                  }
                }
              },
              {
                "match": {
                  "first_name": {
                    "query": 'first name',
                    "_name": '1_m_fst'
                  }
                }
              }
            ]
          }
        },
        "weight": 16_384
      },
      {
        "filter": {
          "multi_match": {
            "query": 'last name first name',
            "operator": 'and',
            "fields": [
              'akas.first_name',
              'akas.last_name'
            ],
            "type": 'cross_fields',
            "_name": '3_mlt_aka'
          }
        },
        "weight": 4096
      },
      {
        "filter": {
          "bool": {
            "must": [
              {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": '4_dim_lst'
                  }
                }
              },
              {
                "match": {
                  "first_name.diminutive": {
                    "query": 'first name',
                    "_name": '4_dim_fst'
                  }
                }
              }
            ]
          }
        },
        "weight": 2048
      },
      {
        "filter": {
          "bool": {
            "must": [
              {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": '5_pho_lst'
                  }
                }
              },
              {
                "match": {
                  "first_name.phonetic": {
                    "query": 'first name',
                    "_name": '5_pho_fst'
                  }
                }
              }
            ]
          }
        },
        "weight": 1024
      },
      {
        "filter": {
          "bool": {
            "must": [
              {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": '6_fz_lst'
                  }
                }
              },
              {
                "fuzzy": {
                  "first_name": {
                    "value": 'first name',
                    "fuzziness": '5',
                    "prefix_length": '1',
                    "max_expansions": '25',
                    "_name": '6_fz_fst'
                  }
                }
              }
            ]
          }
        },
        "weight": 512
      },
      {
        "filter": {
          "bool": {
            "must": [
              {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": '7_prt_lst'
                  }
                }
              },
              {
                "match": {
                  "first_name_ngram": {
                    "query": 'first name',
                    "minimum_should_match": '25%',
                    "_name": '7_prt_fst'
                  }
                }
              }
            ]
          }
        },
        "weight": 256
      },
      {
        "filter": {
          "multi_match": {
            "query": 'last name first name',
            "operator": 'and',
            "fields": %w[
              first_name
              last_name
            ],
            "fuzziness": '2',
            "_name": '7_mlt_fz'
          }
        },
        "weight": 200
      }
    ]
  end

  def fs_full_name_query_part_one
    {
      "size": '10',
      "track_scores": 'true',
      "sort": [
        {
          "_score": 'desc',
          "last_name": 'asc',
          "first_name": 'asc',
          "_uid": 'desc'
        }
      ],
      "min_score": '2.5',
      "query": {
        "function_score": {
          "query": {
            "bool": {
              "must": [
                {
                  "match": {
                    "legacy_descriptor.legacy_table_name": {
                      "query": 'CLIENT_T',
                      "_name": 'q_cli'
                    }
                  }
                }
              ]
            }
          },
          "functions": full_name_functions_part_one,
          "score_mode": 'sum',
          "boost_mode": 'sum'
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end

  def fs_full_name_without_suffix_query_part_one
    {
      "size": '10',
      "track_scores": 'true',
      "sort": [
        {
          "_score": 'desc',
          "last_name": 'asc',
          "first_name": 'asc',
          "_uid": 'desc'
        }
      ],
      "min_score": '2.5',
      "query": {
        "function_score": {
          "query": {
            "bool": {
              "must": [
                {
                  "match": {
                    "legacy_descriptor.legacy_table_name": {
                      "query": 'CLIENT_T',
                      "_name": 'q_cli'
                    }
                  }
                }
              ]
            }
          },
          "functions": full_name_without_suffix_functions_part_one,
          "score_mode": 'sum',
          "boost_mode": 'sum'
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end
end
