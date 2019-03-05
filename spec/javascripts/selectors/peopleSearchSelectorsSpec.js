import * as matchers from 'jasmine-immutable-matchers'
import {fromJS, Map} from 'immutable'
import {RESIDENCE_TYPE} from 'enums/AddressType'
import {
  selectPeopleResults,
  selectLastResultsSortValue,
  selectStartTime,
  selectPersonCreatedAtTime,
  selectPersonSearchFields,
  selectAkaFullName,
  selectClientIdError,
} from 'selectors/peopleSearchSelectors'
import Immutable from 'immutable'

describe('peopleSearchSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  const languages = [
    {code: '1', value: 'English'},
    {code: '2', value: 'French'},
    {code: '3', value: 'Italian'},
  ]
  const ethnicityTypes = [
    {code: '1', value: 'European'},
    {code: '2', value: 'French'},
    {code: '3', value: 'Romanian'},
  ]
  const raceTypes = [
    {code: '1', value: 'Race 1'},
    {code: '2', value: 'Race 2'},
    {code: '3', value: 'Race 3'},
  ]
  const unableToDetermineCodes = [
    {code: 'A', value: 'Abandoned'},
    {code: 'I', value: 'Unknown'},
    {code: 'K', value: 'Unknown'},
  ]
  const hispanicOriginCodes = [
    {code: 'Y', value: 'yes'},
    {code: 'N', value: 'no'},
  ]
  const addressTypes = [{code: RESIDENCE_TYPE, value: 'address type'}]

  const counties = [
    {code: '999', value: 'SysCode Nowhere'},
    {code: '998', value: 'SysCode Places'},
  ]

  const systemCodes = {
    addressTypes,
    counties,
    ethnicityTypes,
    hispanicOriginCodes,
    languages,
    raceTypes,
    unableToDetermineCodes,
  }

  describe('selectLastResultsSortValue', () => {
    it('returns the last results sort attribute', () => {
      const peopleSearch = {
        results: [
          {
            sort: ['first_sort'],
          },
          {
            sort: ['other_sort'],
          },
          {
            sort: ['last_sort'],
          },
        ],
      }
      const state = fromJS({peopleSearch})
      const lastSort = selectLastResultsSortValue(state)
      expect(lastSort).toEqual(['last_sort'])
    })
  })

  describe('selectPeopleResults', () => {
    it('maps person search attributes to suggestion attributes', () => {
      const peopleSearch = {
        results: [
          {
            _source: {
              id: '1',
              first_name: 'Bart',
              last_name: 'Simpson',
              middle_name: 'Jacqueline',
              name_suffix: 'md',
              gender: 'female',
              akas: [],
              languages: [{id: '3'}, {id: '2'}],
              race_ethnicity: {
                hispanic_origin_code: 'Y',
                hispanic_unable_to_determine_code: 'Y',
                race_codes: [{id: '1'}],
                hispanic_codes: [{description: 'Central American'}],
              },
              date_of_birth: '1990-02-13',
              date_of_death: '2000-02-18',
              ssn: '123456789',
              client_counties: [
                {
                  description: 'Nowhere',
                  id: '999',
                },
                {
                  description: 'Places',
                  id: '998',
                },
              ],
              addresses: [
                {
                  id: '1',
                  street_number: '234',
                  street_name: 'Fake Street',
                  city: 'Flushing',
                  state_code: 'state',
                  zip: '11344',
                  type: {id: RESIDENCE_TYPE},
                  phone_numbers: [
                    {
                      number: '2126666666',
                      type: 'Home',
                    },
                  ],
                },
              ],
              phone_numbers: [
                {
                  id: '2',
                  number: '9949076774',
                  type: 'Home',
                },
              ],
              legacy_descriptor: {
                legacy_ui_id: '123-456-789',
                legacy_table_description: 'Client',
              },
              sensitivity_indicator: 'S',
              open_case_responsible_agency_code: 'P',
            },
          },
        ],
      }
      const state = fromJS({
        peopleSearch,
        systemCodes,
      })
      const peopleResults = selectPeopleResults(state)
      expect(peopleResults).toEqualImmutable(
        fromJS([
          {
            legacy_id: '1',
            fullName: 'Bart Jacqueline Simpson, MD',
            gender: 'female',
            akaFullName: null,
            legacyDescriptor: {
              legacy_ui_id: '123-456-789',
              legacy_table_description: 'Client',
            },
            languages: ['Italian', 'French'],
            races: [{race: 'Race 1', race_detail: 'European'}],
            ethnicity: {
              hispanic_latino_origin: 'yes',
              ethnicity_detail: ['Central American'],
            },
            dateOfBirth: '1990-02-13',
            isCsec: false,
            isDeceased: true,
            isProbationYouth: true,
            ssn: '123-45-6789',
            clientCounties: ['SysCode Nowhere', 'SysCode Places'],
            address: {
              city: 'Flushing',
              state: 'state',
              zip: '11344',
              type: 'address type',
              streetAddress: '234 Fake Street',
            },
            phoneNumber: {
              number: '(212) 666-6666',
              type: 'Home',
            },
            isSensitive: true,
            isSealed: false,
          },
        ])
      )
    })

    it('maps the first address and its phone number result to address and phone number', () => {
      const peopleSearch = {
        results: [
          {
            _source: {
              addresses: [
                {
                  id: '1',
                  street_number: '234',
                  street_name: 'Fake Street',
                  city: 'Flushing',
                  state_code: 'state',
                  zip: '11344',
                  type: {id: RESIDENCE_TYPE},
                  phone_numbers: [
                    {
                      number: '2125550123',
                      type: 'Home',
                    },
                  ],
                },
                {
                  id: '2',
                  street_number: '2',
                  street_name: 'Camden Crt',
                  city: 'Flushing',
                  state_code: 'state',
                  zip: '11222',
                  type: {id: RESIDENCE_TYPE},
                  phone_numbers: [
                    {
                      number: '1231231234',
                      type: 'Home',
                    },
                  ],
                },
              ],
              phone_numbers: [
                {
                  number: '9949076774',
                  type: 'Home',
                },
                {
                  number: '1112226774',
                  type: 'Work',
                },
              ],
            },
          },
        ],
      }
      const state = fromJS({
        peopleSearch,
        systemCodes,
      })
      const peopleResults = selectPeopleResults(state)
      expect(peopleResults.getIn([0, 'address'])).toEqualImmutable(
        Map({
          city: 'Flushing',
          state: 'state',
          zip: '11344',
          type: 'address type',
          streetAddress: '234 Fake Street',
        })
      )
      expect(peopleResults.getIn([0, 'phoneNumber'])).toEqualImmutable(
        Map({
          number: '(212) 555-0123',
          type: 'Home',
        })
      )
    })

    it('maps person search attributes when phone numbers and addresses are empty', () => {
      const peopleSearch = {
        results: [
          {
            _source: {
              phone_numbers: [],
              addresses: [],
            },
          },
        ],
      }
      const state = fromJS({
        peopleSearch,
        systemCodes,
      })
      const peopleResults = selectPeopleResults(state)
      expect(peopleResults.getIn([0, 'address'])).toEqual(null)
      expect(peopleResults.getIn([0, 'phoneNumber'])).toEqual(null)
    })

    it('never shows csec pill in search results', () => {
      const peopleSearch = {
        results: [
          {
            _source: {
              csec: [
                {start_date: '2018-01-01', end_date: '2018-02-02'},
                {start_date: '2018-01-01'},
              ],
            },
          },
        ],
      }
      const state = fromJS({
        peopleSearch,
        systemCodes,
      })
      const peopleResults = selectPeopleResults(state)
      expect(peopleResults.getIn([0, 'isCsec'])).toEqual(false)
    })

    it('does not flag csec status when the person has no csec items', () => {
      const peopleSearch = {
        results: [
          {
            _source: {
              csec: [],
            },
          },
        ],
      }
      const state = fromJS({
        peopleSearch,
        systemCodes,
      })
      const peopleResults = selectPeopleResults(state)
      expect(peopleResults.getIn([0, 'isCsec'])).toEqual(false)
    })

    it('does not flag csec status when the person has only ended csec items', () => {
      const peopleSearch = {
        results: [
          {
            _source: {
              csec: [
                {start_date: '2018-01-01', end_date: '2018-02-02'},
                {start_date: '2018-01-01', end_date: '2018-02-02'},
              ],
            },
          },
        ],
      }
      const state = fromJS({
        peopleSearch,
        systemCodes,
      })
      const peopleResults = selectPeopleResults(state)
      expect(peopleResults.getIn([0, 'isCsec'])).toEqual(false)
    })

    describe('when highlighting', () => {
      function personWithHighlights(highlight) {
        return {
          results: [
            {
              _source: {
                first_name: 'Bart',
                last_name: 'Simpson',
                date_of_birth: '1990-02-13',
                ssn: '123456789',
                addresses: [],
                phone_numbers: [],
              },
              highlight,
            },
          ],
        }
      }

      it('should use exact highlighted fields if available', () => {
        const peopleSearch = personWithHighlights({
          first_name: ['<em>Bar</em>t'],
          last_name: ['Sim<em>pson</em>'],
          ssn: ['<em>123456789</em>'],
          searchable_date_of_birth: ['<em>1990</em>'],
          autocomplete_search_bar: [
            '<em>Bar</em>t',
            'Sim<em>pson</em>',
            '<em>123456789</em>',
            '<em>1990</em>',
          ],
        })

        const state = fromJS({
          peopleSearch,
          systemCodes,
        })
        const peopleResults = selectPeopleResults(state)
        expect(peopleResults.getIn([0, 'fullName'])).toEqual(
          '<em>Bar</em>t Sim<em>pson</em>'
        )
        expect(peopleResults.getIn([0, 'ssn'])).toEqual('<em>123-45-6789</em>')
        expect(peopleResults.getIn([0, 'dateOfBirth'])).toEqual(
          '<em>1990-02-13</em>'
        )
      })

      it('should use exact highlighted and suffixes should return empty for invalid suffixes', () => {
        const peopleSearch = personWithHighlights({
          first_name: ['<em>Bar</em>t'],
          last_name: ['Sim<em>pson</em>'],
          name_suffix: ['<em>cccv</em>'],
          ssn: ['<em>123456789</em>'],
          searchable_date_of_birth: ['<em>1990</em>'],
          autocomplete_search_bar: [
            '<em>Bar</em>t',
            'Sim<em>pson</em>',
            '<em>123456789</em>',
            '<em>1990</em>',
            '<em>cccv</em>',
          ],
        })

        const state = fromJS({
          peopleSearch,
          systemCodes,
        })
        const peopleResults = selectPeopleResults(state)
        expect(peopleResults.getIn([0, 'fullName'])).toEqual(
          '<em>Bar</em>t Sim<em>pson</em>'
        )
        expect(peopleResults.getIn([0, 'ssn'])).toEqual('<em>123-45-6789</em>')
        expect(peopleResults.getIn([0, 'dateOfBirth'])).toEqual(
          '<em>1990-02-13</em>'
        )
      })

      it('should check autocomplete_search_bar if no exact first_name', () => {
        const peopleSearch = personWithHighlights({
          // first_name: (no exact first name)
          last_name: ['Sim<em>pson</em>'],
          ssn: ['<em>123456789</em>'],
          searchable_date_of_birth: ['<em>1990</em>'],
          autocomplete_search_bar: [
            '<em>Bar</em>t',
            'Sim<em>pson</em>',
            '<em>123456789</em>',
            '<em>1990</em>',
          ],
        })

        const state = fromJS({
          peopleSearch,
          systemCodes,
        })
        const peopleResults = selectPeopleResults(state)
        expect(peopleResults.getIn([0, 'fullName'])).toEqual(
          '<em>Bar</em>t Sim<em>pson</em>'
        )
      })

      it('should check autocomplete_search_bar if no exact last_name', () => {
        const peopleSearch = personWithHighlights({
          first_name: ['<em>Bar</em>t'],
          // last_name: (no exact last name)
          ssn: ['<em>123456789</em>'],
          searchable_date_of_birth: ['<em>1990</em>'],
          autocomplete_search_bar: [
            '<em>Bar</em>t',
            'Sim<em>pson</em>',
            '<em>123456789</em>',
            '<em>1990</em>',
          ],
        })

        const state = fromJS({
          peopleSearch,
          systemCodes,
        })
        const peopleResults = selectPeopleResults(state)
        expect(peopleResults.getIn([0, 'fullName'])).toEqual(
          '<em>Bar</em>t Sim<em>pson</em>'
        )
      })

      it('should find autocomplete fields in any order', () => {
        const peopleSearch = personWithHighlights({
          // first_name: (no exact first name)
          // last_name: (no exact last name)
          ssn: ['<em>123456789</em>'],
          searchable_date_of_birth: ['<em>1990</em>'],
          autocomplete_search_bar: [
            '<em>123456789</em>',
            '<em>1990</em>',
            'Sim<em>pson</em>',
            '<em>Bar</em>t',
          ],
        })

        const state = fromJS({
          peopleSearch,
          systemCodes,
        })
        const peopleResults = selectPeopleResults(state)
        expect(peopleResults.getIn([0, 'fullName'])).toEqual(
          '<em>Bar</em>t Sim<em>pson</em>'
        )
      })

      it('should use exact names if no highlight', () => {
        const peopleSearch = personWithHighlights({
          // first_name: (no first name matches)
          // last_name: (no last name matches)
          ssn: ['<em>123456789</em>'],
          searchable_date_of_birth: ['<em>1990</em>'],
          autocomplete_search_bar: [
            '<em>123456789</em>',
            '<em>1990</em>',
            // (no first name or last name matches)
          ],
        })

        const state = fromJS({
          peopleSearch,
          systemCodes,
        })
        const peopleResults = selectPeopleResults(state)
        expect(peopleResults.getIn([0, 'fullName'])).toEqual('Bart Simpson')
      })
    })

    it('formats ssn', () => {
      const peopleSearch = {
        results: [
          {
            _source: {
              ssn: '123456789',
            },
          },
        ],
      }
      const state = fromJS({
        peopleSearch,
        systemCodes,
      })
      const peopleResults = selectPeopleResults(state)
      expect(peopleResults.getIn([0, 'ssn'])).toEqual('123-45-6789')
    })

    it('formats highlighted ssn', () => {
      const peopleSearch = {
        results: [
          {
            _source: {
              ssn: '123456789',
            },
            highlight: {
              ssn: ['<em>123456789</em>'],
            },
          },
        ],
      }
      const state = fromJS({
        peopleSearch,
        systemCodes,
      })
      const peopleResults = selectPeopleResults(state)
      expect(peopleResults.getIn([0, 'ssn'])).toEqual('<em>123-45-6789</em>')
    })
  })

  describe('selectStartTime', () => {
    it('gets the start time when there is a start time', () => {
      const peopleSearch = {
        startTime: '10-10-2001',
      }
      const state = fromJS({peopleSearch})
      expect(selectStartTime(state)).toEqual('10-10-2001')
    })

    it('gets the start time when there is no start time', () => {
      const peopleSearch = {
        startTime: null,
      }
      const state = fromJS({peopleSearch})
      expect(selectStartTime(state)).toEqual(null)
    })
  })

  describe('selectPersonCreatedAtTime', () => {
    it('gets person created at time', () => {
      const relationshipsQueryCycleTime = [
        {
          personCreatedAtTime: 1534190832860,
        },
      ]
      const state = fromJS({relationshipsQueryCycleTime})
      expect(selectPersonCreatedAtTime(state)).toEqual(1534190832860)
    })
  })

  describe('selectPersonSearchFields', () => {
    it('gets the last name from the store', () => {
      const peopleSearch = {
        searchLastName: 'Flintstone',
      }
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchLastName).toEqual(
        'Flintstone'
      )
    })

    it('gets the first name from the store', () => {
      const peopleSearch = {
        searchFirstName: 'Freddy',
      }
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchFirstName).toEqual('Freddy')
    })
  })

  describe('selectSearchMiddleName', () => {
    it('gets the middle name from the store', () => {
      const peopleSearch = {
        searchMiddleName: 'Bedrock',
      }
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchMiddleName).toEqual(
        'Bedrock'
      )
    })
  })

  describe('selectSearchClientId', () => {
    it('gets the client id from the store', () => {
      const peopleSearch = {searchClientId: '1'}
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchClientId).toEqual('1')
    })
  })

  describe('selectSearchSuffix', () => {
    it('gets the suffix from the store', () => {
      const peopleSearch = {searchSuffix: 'Jr'}
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchSuffix).toEqual('Jr')
    })
  })

  describe('selectSearchSsn', () => {
    it('gets the ssn from the store', () => {
      const peopleSearch = {searchSsn: '123456789'}
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchSsn).toEqual('123456789')
    })
  })

  describe('selectSearchDateOfBirth', () => {
    it('gets the date of birth from the store', () => {
      const peopleSearch = {searchDateOfBirth: '01/01/2000'}
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchDateOfBirth).toEqual(
        '01/01/2000'
      )
    })
  })

  describe('selectSearchApproximateAge', () => {
    it('gets the approximate age from the store', () => {
      const peopleSearch = {searchApproximateAge: '5'}
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchApproximateAge).toEqual('5')
    })
  })

  describe('selectSearchApproximateAgeUnits', () => {
    it('gets the approximate age units from the store', () => {
      const peopleSearch = {searchApproximateAgeUnits: 'years'}
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchApproximateAgeUnits).toEqual(
        'years'
      )
    })
  })

  describe('selectSearchSexAtBirth', () => {
    it('gets the sex at birth from the store', () => {
      const peopleSearch = {searchSexAtBirth: 'Female'}
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchSexAtBirth).toEqual('Female')
    })
  })

  describe('selectSearchAddress', () => {
    it('gets the selected address from the store', () => {
      const peopleSearch = {
        searchAddress: '123 Sunflower Way',
      }
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchAddress).toEqual(
        '123 Sunflower Way'
      )
    })
  })

  describe('selectSearchCity', () => {
    it('gets the selected city from the store', () => {
      const peopleSearch = {
        searchCity: 'Sweetwater',
      }
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchCity).toEqual('Sweetwater')
    })
  })

  describe('selectSearchCounty', () => {
    it('gets the selected county from the store', () => {
      const peopleSearch = {
        searchCounty: 'Mariposa',
      }
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchCounty).toEqual('Mariposa')
    })
  })

  describe('selectSearchState', () => {
    it('gets the selected US state from the store', () => {
      const peopleSearch = {searchState: 'California'}
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchState).toEqual('California')
    })
  })

  describe('selectSearchCountry', () => {
    it('gets the selected country from the store', () => {
      const peopleSearch = {searchCountry: 'United States of America'}
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchCountry).toEqual(
        'United States of America'
      )
    })
  })

  describe('selectSearchZipCode', () => {
    it('gets the selected zip code from the store', () => {
      const peopleSearch = {searchZipCode: '95695'}
      const state = fromJS({peopleSearch})
      expect(selectPersonSearchFields(state).searchZipCode).toEqual('95695')
    })
  })

  describe('selectAkaFullName', () => {
    it('return akaFullName and name_type when searchTerm match the akas', () => {
      const peopleSearch = {
        searchTerm: 'James Doolittle',
      }
      const akas = [
        {
          name_type: 'AKA',
          last_name: 'Doolittle',
          id: 'MYl4QKc0Ki',
          first_name: 'James',
        },
        {
          name_type: 'Doe',
          last_name: 'Howland',
          id: 'OiRrdgc0Ki',
          first_name: 'John',
        },
        {
          name_type: 'Doe',
          last_name: 'Fratelli',
          id: 'H3TYeHO0Ki',
          first_name: 'Gino',
        },
        {
          name_type: 'AKA',
          last_name: 'Hunley',
          id: 'ToGs5P40Ki',
          first_name: 'Alan',
        },
        {
          name_type: 'Legal',
          last_name: 'Aldrich',
          id: '7MqLPlO0Ki',
          middle_name: 'Allison',
          first_name: 'Billy',
        },
      ]
      const state = fromJS({peopleSearch})
      const result = Immutable.fromJS({akas})
      expect(selectAkaFullName(state, result)).toEqual(
        ' (AKA: James Doolittle)'
      )
    })

    it('return null when searchTerm does not match', () => {
      const peopleSearch = {
        searchTerm: 'xyzabcxyz',
      }
      const akas = [
        {
          name_type: 'AKA',
          last_name: 'Doolittle',
          id: 'MYl4QKc0Ki',
          first_name: 'James',
        },
        {
          name_type: 'Doe',
          last_name: 'Howland',
          id: 'OiRrdgc0Ki',
          first_name: 'John',
        },
        {
          name_type: 'Doe',
          last_name: 'Fratelli',
          id: 'H3TYeHO0Ki',
          first_name: 'Gino',
        },
        {
          name_type: 'AKA',
          last_name: 'Hunley',
          id: 'ToGs5P40Ki',
          first_name: 'Alan',
        },
        {
          name_type: 'Legal',
          last_name: 'Aldrich',
          id: '7MqLPlO0Ki',
          middle_name: 'Allison',
          first_name: 'Billy',
        },
      ]
      const state = fromJS({peopleSearch})
      const result = Immutable.fromJS({akas})
      expect(selectAkaFullName(state, result)).toEqual(null)
    })

    it('returns null when akas is empty array', () => {
      const peopleSearch = {
        searchTerm: 'John Doe',
      }
      const akas = []
      const state = fromJS({peopleSearch})
      const result = Immutable.fromJS({akas})
      expect(selectAkaFullName(state, result)).toEqual(null)
    })
  })

  describe('selectClientIdError', () => {
    it('does not return error message if searchClientId is 19 digits.', () => {
      const peopleSearch = {searchClientId: '1111-1111-1111-1111111'}
      const state = fromJS({peopleSearch})
      expect(selectClientIdError(state))
        .toEqual([])
    })

    it('returns error message if searchClientId is 12 digits.', () => {
      const peopleSearch = {searchClientId: '1111-1111-1111-_______'}
      const state = fromJS({peopleSearch})
      expect(selectClientIdError(state))
        .toEqual(['Client Id number must be 19 digits long.'])
    })

    it('returns error message if searchClientId less than 19 digits.', () => {
      const peopleSearch = {searchClientId: '1111-1111-1111-1______'}
      const state = fromJS({peopleSearch})
      expect(selectClientIdError(state))
        .toEqual(['Client Id number must be 19 digits long.'])
    })
  })
})
