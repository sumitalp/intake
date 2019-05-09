# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength
module PersonSearchByNameQueryBuilderPartTwoHelper
  def full_name_functions_part_two
    [
      {
        "filter": {
          "bool": {
            "must": [
              {
                "match": {
                  "last_name": {
                    "query": 'first name',
                    "_name": '9a_rev_lst'
                  }
                }
              },
              {
                "match": {
                  "first_name": {
                    "query": 'last name',
                    "_name": '9a_rev_fst'
                  }
                }
              }
            ]
          }
        },
        "weight": 128
      },
      {
        "filter": {
          "bool": {
            "must": [
              {
                "match": {
                  "last_name": {
                    "query": 'first name',
                    "_name": '9b_rev_prt_lst'
                  }
                }
              },
              {
                "match": {
                  "first_name_ngram": {
                    "query": 'last name',
                    "minimum_should_match": '25%',
                    "_name": '9b_rev_prt_fst'
                  }
                }
              }
            ]
          }
        },
        "weight": 64
      },
      {
        "filter": {
          "bool": {
            "must": [
              {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": '10_dup_lst'
                  }
                }
              },
              {
                "match": {
                  "first_name": {
                    "query": 'last name',
                    "_name": '10_dup_fst'
                  }
                }
              }
            ]
          }
        },
        "weight": 32
      },
      {
        "filter": {
          "bool": {
            "must": [
              {
                "match": {
                  "last_name_ngram": {
                    "query": 'first name',
                    "minimum_should_match": '25%',
                    "_name": '11_rev_prt_lst'
                  }
                }
              },
              {
                "match": {
                  "first_name_ngram": {
                    "query": 'last name',
                    "minimum_should_match": '25%',
                    "_name": '11_rev_prt_fst'
                  }
                }
              }
            ]
          }
        },
        "weight": 16
      },
      {
        "filter": {
          "match": {
            "last_name": {
              "query": 'last name',
              "_name": '8_m_lst'
            }
          }
        },
        "weight": 12
      },
      {
        "filter": {
          "match": {
            "first_name": {
              "query": 'first name',
              "_name": 'xb_m_fst'
            }
          }
        },
        "weight": 8
      }
    ]
  end

  def fs_no_name_query_part_two
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
          "functions": [],
          "score_mode": 'sum',
          "boost_mode": 'sum'
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end

  def fs_full_name_query_part_two
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
          "functions": full_name_functions_part_two,
          "score_mode": 'sum',
          "boost_mode": 'sum'
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end
end
