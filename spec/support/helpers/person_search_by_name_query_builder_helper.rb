# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength
module PersonSearchByNameQueryBuilderHelper
  def fs_full_name_query
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
          "functions": [
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name first name',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          first_name
                        ],
                        "type": 'cross_fields',
                        "_name": '1_mult_last_first'
                      }
                    },
                    {
                      "match": {
                        "last_name": {
                          "query": 'last name',
                          "_name": '1_mult_last'
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
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name suffix',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          suffix
                        ],
                        "type": 'cross_fields',
                        "_name": '2_mult_last_suffix'
                      }
                    }
                  ]
                }
              },
              "weight": 8192
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
                  "_name": '3_mult_aka'
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
                          "_name": '4_dim_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name.diminutive": {
                          "query": 'first name',
                          "_name": '4_dim_first'
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
                          "_name": '5_pho_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name.phonetic": {
                          "query": 'first name',
                          "_name": '5_pho_first'
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
                          "_name": '6_fz_last'
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
                          "_name": '6_fz_first'
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
                          "_name": '7_ngram_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name_ngram": {
                          "query": 'first name',
                          "minimum_should_match": '25%',
                          "_name": '7_ngram_first'
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
                  "_name": '7_mult_fuzz'
                }
              },
              "weight": 200
            },
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "match": {
                        "last_name": {
                          "query": 'first name',
                          "_name": '8_rev_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_rev_first'
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
                          "query": 'last name',
                          "_name": '8_dupe_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_dupe_first'
                        }
                      }
                    }
                  ]
                }
              },
              "weight": -16
            },
            {
              "filter": {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": 'xa_m_last'
                  }
                }
              },
              "weight": 32
            },
            {
              "filter": {
                "match": {
                  "first_name": {
                    "query": 'first name',
                    "_name": 'xb_m_first'
                  }
                }
              },
              "weight": 16
            }
          ],
          "score_mode": 'sum',
          "boost_mode": 'sum'
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end

  def fs_last_name_query
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
          "functions": [
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          first_name
                        ],
                        "type": 'cross_fields',
                        "_name": '1_mult_last_first'
                      }
                    },
                    {
                      "match": {
                        "last_name": {
                          "query": 'last name',
                          "_name": '1_mult_last'
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
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name suffix',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          suffix
                        ],
                        "type": 'cross_fields',
                        "_name": '2_mult_last_suffix'
                      }
                    }
                  ]
                }
              },
              "weight": 8192
            },
            {
              "filter": {
                "multi_match": {
                  "query": 'last name',
                  "operator": 'and',
                  "fields": [
                    'akas.first_name',
                    'akas.last_name'
                  ],
                  "type": 'cross_fields',
                  "_name": '3_mult_aka'
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
                          "_name": '4_dim_last'
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
                          "_name": '5_pho_last'
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
                          "_name": '6_fz_last'
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
                          "_name": '7_ngram_last'
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
                  "query": 'last name',
                  "operator": 'and',
                  "fields": %w[
                    first_name
                    last_name
                  ],
                  "fuzziness": '2',
                  "_name": '7_mult_fuzz'
                }
              },
              "weight": 200
            },
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_rev_first'
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
                          "query": 'last name',
                          "_name": '8_dupe_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_dupe_first'
                        }
                      }
                    }
                  ]
                }
              },
              "weight": -16
            },
            {
              "filter": {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": 'xa_m_last'
                  }
                }
              },
              "weight": 32
            }
          ],
          "score_mode": 'sum',
          "boost_mode": 'sum'
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end

  def fs_first_name_query
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
          "functions": [
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'first name',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          first_name
                        ],
                        "type": 'cross_fields',
                        "_name": '1_mult_last_first'
                      }
                    }
                  ]
                }
              },
              "weight": 16_384
            },
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'suffix',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          suffix
                        ],
                        "type": 'cross_fields',
                        "_name": '2_mult_last_suffix'
                      }
                    }
                  ]
                }
              },
              "weight": 8192
            },
            {
              "filter": {
                "multi_match": {
                  "query": 'first name',
                  "operator": 'and',
                  "fields": [
                    'akas.first_name',
                    'akas.last_name'
                  ],
                  "type": 'cross_fields',
                  "_name": '3_mult_aka'
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
                        "first_name.diminutive": {
                          "query": 'first name',
                          "_name": '4_dim_first'
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
                        "first_name.phonetic": {
                          "query": 'first name',
                          "_name": '5_pho_first'
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
                      "fuzzy": {
                        "first_name": {
                          "value": 'first name',
                          "fuzziness": '5',
                          "prefix_length": '1',
                          "max_expansions": '25',
                          "_name": '6_fz_first'
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
                        "first_name_ngram": {
                          "query": 'first name',
                          "minimum_should_match": '25%',
                          "_name": '7_ngram_first'
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
                  "query": 'first name',
                  "operator": 'and',
                  "fields": %w[
                    first_name
                    last_name
                  ],
                  "fuzziness": '2',
                  "_name": '7_mult_fuzz'
                }
              },
              "weight": 200
            },
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "match": {
                        "last_name": {
                          "query": 'first name',
                          "_name": '8_rev_last'
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
                "match": {
                  "first_name": {
                    "query": 'first name',
                    "_name": 'xb_m_first'
                  }
                }
              },
              "weight": 16
            }
          ],
          "score_mode": 'sum',
          "boost_mode": 'sum'
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end

  def fs_full_name_dob_query
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
                },
                {
                  "query_string": {
                    "default_field": 'date_of_birth_as_text',
                    "query": '05051989',
                    "boost": '14'
                  }
                }
              ]
            }
          },
          "functions": [
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name first name',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          first_name
                        ],
                        "type": 'cross_fields',
                        "_name": '1_mult_last_first'
                      }
                    },
                    {
                      "match": {
                        "last_name": {
                          "query": 'last name',
                          "_name": '1_mult_last'
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
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name suffix',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          suffix
                        ],
                        "type": 'cross_fields',
                        "_name": '2_mult_last_suffix'
                      }
                    }
                  ]
                }
              },
              "weight": 8192
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
                  "_name": '3_mult_aka'
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
                          "_name": '4_dim_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name.diminutive": {
                          "query": 'first name',
                          "_name": '4_dim_first'
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
                          "_name": '5_pho_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name.phonetic": {
                          "query": 'first name',
                          "_name": '5_pho_first'
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
                          "_name": '6_fz_last'
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
                          "_name": '6_fz_first'
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
                          "_name": '7_ngram_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name_ngram": {
                          "query": 'first name',
                          "minimum_should_match": '25%',
                          "_name": '7_ngram_first'
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
                  "_name": '7_mult_fuzz'
                }
              },
              "weight": 200
            },
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "match": {
                        "last_name": {
                          "query": 'first name',
                          "_name": '8_rev_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_rev_first'
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
                          "query": 'last name',
                          "_name": '8_dupe_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_dupe_first'
                        }
                      }
                    }
                  ]
                }
              },
              "weight": -16
            },
            {
              "filter": {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": 'xa_m_last'
                  }
                }
              },
              "weight": 32
            },
            {
              "filter": {
                "match": {
                  "first_name": {
                    "query": 'first name',
                    "_name": 'xb_m_first'
                  }
                }
              },
              "weight": 16
            }
          ],
          "score_mode": 'sum',
          "boost_mode": 'sum'
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end

  def fs_full_name_approx_age_months_gender_query
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
                },
                {
                  "range": {
                    "date_of_birth": {
                      "gte": (Date.current - 12.months - 6.months).iso8601,
                      "lte": (Date.current - 12.months + 6.months).iso8601,
                      "format": 'yyyy-MM-dd'
                    }
                  }
                },
                {
                  "query_string": {
                    "default_field": 'gender',
                    "query": 'female',
                    "boost": '1'
                  }
                }
              ]
            }
          },
          "functions": [
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name first name',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          first_name
                        ],
                        "type": 'cross_fields',
                        "_name": '1_mult_last_first'
                      }
                    },
                    {
                      "match": {
                        "last_name": {
                          "query": 'last name',
                          "_name": '1_mult_last'
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
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name suffix',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          suffix
                        ],
                        "type": 'cross_fields',
                        "_name": '2_mult_last_suffix'
                      }
                    }
                  ]
                }
              },
              "weight": 8192
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
                  "_name": '3_mult_aka'
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
                          "_name": '4_dim_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name.diminutive": {
                          "query": 'first name',
                          "_name": '4_dim_first'
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
                          "_name": '5_pho_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name.phonetic": {
                          "query": 'first name',
                          "_name": '5_pho_first'
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
                          "_name": '6_fz_last'
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
                          "_name": '6_fz_first'
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
                          "_name": '7_ngram_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name_ngram": {
                          "query": 'first name',
                          "minimum_should_match": '25%',
                          "_name": '7_ngram_first'
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
                  "_name": '7_mult_fuzz'
                }
              },
              "weight": 200
            },
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "match": {
                        "last_name": {
                          "query": 'first name',
                          "_name": '8_rev_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_rev_first'
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
                          "query": 'last name',
                          "_name": '8_dupe_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_dupe_first'
                        }
                      }
                    }
                  ]
                }
              },
              "weight": -16
            },
            {
              "filter": {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": 'xa_m_last'
                  }
                }
              },
              "weight": 32
            },
            {
              "filter": {
                "match": {
                  "first_name": {
                    "query": 'first name',
                    "_name": 'xb_m_first'
                  }
                }
              },
              "weight": 16
            }
          ],
          "score_mode": 'sum',
          "boost_mode": 'sum'
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end

  def fs_full_name_approx_age_years_gender_query
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
      "min_scpore": '2.5',
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
                },
                {
                  "range": {
                    "date_of_birth": {
                      "gte": (Date.current - 100.years - 5.years).iso8601,
                      "lte": (Date.current - 100.years + 5.years).iso8601,
                      "format": 'yyyy-MM-dd'
                    }
                  }
                },
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
          "functions": [
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name first name',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          first_name
                        ],
                        "type": 'cross_fields',
                        "_name": '1_mult_last_first'
                      }
                    },
                    {
                      "match": {
                        "last_name": {
                          "query": 'last name',
                          "_name": '1_mult_last'
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
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name suffix',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          suffix
                        ],
                        "type": 'cross_fields',
                        "_name": '2_mult_last_suffix'
                      }
                    }
                  ]
                }
              },
              "weight": 8192
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
                  "_name": '3_mult_aka'
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
                          "_name": '4_dim_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name.diminutive": {
                          "query": 'first name',
                          "_name": '4_dim_first'
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
                          "_name": '5_pho_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name.phonetic": {
                          "query": 'first name',
                          "_name": '5_pho_first'
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
                          "_name": '6_fz_last'
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
                          "_name": '6_fz_first'
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
                          "_name": '7_ngram_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name_ngram": {
                          "query": 'first name',
                          "minimum_should_match": '25%',
                          "_name": '7_ngram_first'
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
                  "_name": '7_mult_fuzz'
                }
              },
              "weight": 200
            },
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "match": {
                        "last_name": {
                          "query": 'first name',
                          "_name": '8_rev_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_rev_first'
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
                          "query": 'last name',
                          "_name": '8_dupe_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_dupe_first'
                        }
                      }
                    }
                  ]
                }
              },
              "weight": -16
            },
            {
              "filter": {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": 'xa_m_last'
                  }
                }
              },
              "weight": 32
            },
            {
              "filter": {
                "match": {
                  "first_name": {
                    "query": 'first name',
                    "_name": 'xb_m_first'
                  }
                }
              },
              "weight": 16
            }
          ],
          "score_mode": 'sum',
          "boost_mode": 'sum'
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end

  def fs_full_name_dob_address_query
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
      "min_scpore": '2.5',
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
                },
                {
                  "query_string": {
                    "default_field": 'date_of_birth_as_text',
                    "query": '05051989',
                    "boost": '14'
                  }
                }
              ],
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
                                "boost": '14',
                                "operator": 'and',
                                "query": 'street_number_and_name_search_term'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.last_known": {
                                "boost": '14',
                                "query": 'true'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.autocomplete_city": {
                                "boost": '14',
                                "query": 'city_search_term'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.county.description": {
                                "boost": '14',
                                "query": 'county_search_term'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.searchable_address": {
                                "boost": '14',
                                "query": 'street_number_and_name_search_term'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.city": {
                                "boost": '14',
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
          "functions": [
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name first name',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          first_name
                        ],
                        "type": 'cross_fields',
                        "_name": '1_mult_last_first'
                      }
                    },
                    {
                      "match": {
                        "last_name": {
                          "query": 'last name',
                          "_name": '1_mult_last'
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
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name suffix',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          suffix
                        ],
                        "type": 'cross_fields',
                        "_name": '2_mult_last_suffix'
                      }
                    }
                  ]
                }
              },
              "weight": 8192
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
                  "_name": '3_mult_aka'
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
                          "_name": '4_dim_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name.diminutive": {
                          "query": 'first name',
                          "_name": '4_dim_first'
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
                          "_name": '5_pho_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name.phonetic": {
                          "query": 'first name',
                          "_name": '5_pho_first'
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
                          "_name": '6_fz_last'
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
                          "_name": '6_fz_first'
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
                          "_name": '7_ngram_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name_ngram": {
                          "query": 'first name',
                          "minimum_should_match": '25%',
                          "_name": '7_ngram_first'
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
                  "_name": '7_mult_fuzz'
                }
              },
              "weight": 200
            },
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "match": {
                        "last_name": {
                          "query": 'first name',
                          "_name": '8_rev_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_rev_first'
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
                          "query": 'last name',
                          "_name": '8_dupe_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_dupe_first'
                        }
                      }
                    }
                  ]
                }
              },
              "weight": -16
            },
            {
              "filter": {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": 'xa_m_last'
                  }
                }
              },
              "weight": 32
            },
            {
              "filter": {
                "match": {
                  "first_name": {
                    "query": 'first name',
                    "_name": 'xb_m_first'
                  }
                }
              },
              "weight": 16
            }
          ],
          "score_mode": 'sum',
          "boost_mode": 'sum'
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end

  def fs_last_name_dob_address_query
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
      "min_scpore": '2.5',
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
                },
                {
                  "query_string": {
                    "default_field": 'date_of_birth_as_text',
                    "query": '05051989',
                    "boost": '14'
                  }
                }
              ],
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
                                "boost": '14',
                                "operator": 'and',
                                "query": 'street_number_and_name_search_term'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.last_known": {
                                "boost": '14',
                                "query": 'true'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.autocomplete_city": {
                                "boost": '14',
                                "query": 'city_search_term'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.county.description": {
                                "boost": '14',
                                "query": 'county_search_term'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.searchable_address": {
                                "boost": '14',
                                "query": 'street_number_and_name_search_term'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.city": {
                                "boost": '14',
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
          "functions": [
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          first_name
                        ],
                        "type": 'cross_fields',
                        "_name": '1_mult_last_first'
                      }
                    },
                    {
                      "match": {
                        "last_name": {
                          "query": 'last name',
                          "_name": '1_mult_last'
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
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'last name suffix',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          suffix
                        ],
                        "type": 'cross_fields',
                        "_name": '2_mult_last_suffix'
                      }
                    }
                  ]
                }
              },
              "weight": 8192
            },
            {
              "filter": {
                "multi_match": {
                  "query": 'last name',
                  "operator": 'and',
                  "fields": [
                    'akas.first_name',
                    'akas.last_name'
                  ],
                  "type": 'cross_fields',
                  "_name": '3_mult_aka'
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
                          "_name": '4_dim_last'
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
                          "_name": '5_pho_last'
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
                          "_name": '6_fz_last'
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
                          "_name": '7_ngram_last'
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
                  "query": 'last name',
                  "operator": 'and',
                  "fields": %w[
                    first_name
                    last_name
                  ],
                  "fuzziness": '2',
                  "_name": '7_mult_fuzz'
                }
              },
              "weight": 200
            },
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_rev_first'
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
                          "query": 'last name',
                          "_name": '8_dupe_last'
                        }
                      }
                    },
                    {
                      "match": {
                        "first_name": {
                          "query": 'last name',
                          "_name": '8_dupe_first'
                        }
                      }
                    }
                  ]
                }
              },
              "weight": -16
            },
            {
              "filter": {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": 'xa_m_last'
                  }
                }
              },
              "weight": 32
            }
          ],
          "score_mode": 'sum',
          "boost_mode": 'sum'
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end

  def fs_first_name_dob_address_query
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
      "min_scpore": '2.5',
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
                },
                {
                  "query_string": {
                    "default_field": 'date_of_birth_as_text',
                    "query": '05051989',
                    "boost": '14'
                  }
                }
              ],
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
                                "boost": '14',
                                "operator": 'and',
                                "query": 'street_number_and_name_search_term'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.last_known": {
                                "boost": '14',
                                "query": 'true'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.autocomplete_city": {
                                "boost": '14',
                                "query": 'city_search_term'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.county.description": {
                                "boost": '14',
                                "query": 'county_search_term'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.searchable_address": {
                                "boost": '14',
                                "query": 'street_number_and_name_search_term'
                              }
                            }
                          },
                          {
                            "match": {
                              "addresses.city": {
                                "boost": '14',
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
          "functions": [
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'first name',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          first_name
                        ],
                        "type": 'cross_fields',
                        "_name": '1_mult_last_first'
                      }
                    }
                  ]
                }
              },
              "weight": 16_384
            },
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "multi_match": {
                        "query": 'suffix',
                        "operator": 'and',
                        "fields": %w[
                          last_name
                          suffix
                        ],
                        "type": 'cross_fields',
                        "_name": '2_mult_last_suffix'
                      }
                    }
                  ]
                }
              },
              "weight": 8192
            },
            {
              "filter": {
                "multi_match": {
                  "query": 'first name',
                  "operator": 'and',
                  "fields": [
                    'akas.first_name',
                    'akas.last_name'
                  ],
                  "type": 'cross_fields',
                  "_name": '3_mult_aka'
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
                        "first_name.diminutive": {
                          "query": 'first name',
                          "_name": '4_dim_first'
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
                        "first_name.phonetic": {
                          "query": 'first name',
                          "_name": '5_pho_first'
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
                      "fuzzy": {
                        "first_name": {
                          "value": 'first name',
                          "fuzziness": '5',
                          "prefix_length": '1',
                          "max_expansions": '25',
                          "_name": '6_fz_first'
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
                        "first_name_ngram": {
                          "query": 'first name',
                          "minimum_should_match": '25%',
                          "_name": '7_ngram_first'
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
                  "query": 'first name',
                  "operator": 'and',
                  "fields": %w[
                    first_name
                    last_name
                  ],
                  "fuzziness": '2',
                  "_name": '7_mult_fuzz'
                }
              },
              "weight": 200
            },
            {
              "filter": {
                "bool": {
                  "must": [
                    {
                      "match": {
                        "last_name": {
                          "query": 'first name',
                          "_name": '8_rev_last'
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
                "match": {
                  "first_name": {
                    "query": 'first name',
                    "_name": 'xb_m_first'
                  }
                }
              },
              "weight": 16
            }
          ],
          "score_mode": 'sum',
          "boost_mode": 'sum'
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end
end
