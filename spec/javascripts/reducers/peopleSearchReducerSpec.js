import * as matchers from 'jasmine-immutable-matchers'
import {
  clear,
  fetchFailure,
  fetchSuccess,
  resetPersonSearch,
  search,
  setPersonSearchField,
  setFieldErrorCheck,
  loadMoreResultsSuccess,
  loadMoreResultsFailure,
  resetClientIdErrorCheck,
  resetSsnErrorCheck,
  setClientIdErrorCheck,
  setSsnErrorCheck,
  setDobErrorCheck,
} from 'actions/peopleSearchActions'
import {fetchSuccess as fetchUserInfoSuccess} from 'actions/userInfoActions'
import peopleSearchReducer from 'reducers/peopleSearchReducer'
import {Map, fromJS} from 'immutable'
import moment from 'moment'

describe('peopleSearchReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on PEOPLE_SEARCH_FETCH', () => {
    it('updates the total', () => {
      const action = search(true, true, {searchTerm: 'newSearchTerm'})
      expect(peopleSearchReducer(Map(), action)).toEqualImmutable(
        fromJS({
          total: null,
        })
      )
    })
  })

  describe('on PEOPLE_SEARCH_FETCH_COMPLETE', () => {
    const initialState = fromJS({
      searchTerm: 'newSearchTerm',
      total: 0,
    })
    describe('on success', () => {
      const action = fetchSuccess({
        hits: {
          total: 2,
          hits: ['result_one', 'result_two'],
        },
      })
      it('updates search results with hits and sets the new total', () => {
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
          fromJS({
            searchTerm: 'newSearchTerm',
            total: 2,
            results: ['result_one', 'result_two'],
          })
        )
      })
    })
    describe('on failure', () => {
      const action = fetchFailure()
      it('leaves state unchanged', () => {
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
          initialState
        )
      })
    })
  })

  describe('on PEOPLE_SEARCH_CLEAR', () => {
    describe('clear search results', () => {
      const action = clear('results')
      const initialState = fromJS({
        searchTerm: 'newSearchTerm',
        total: 3,
        results: ['result_one', 'result_two', 'result_three'],
      })
      it('resets results, total, and startTime', () => {
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
          fromJS({
            searchTerm: 'newSearchTerm',
            total: null,
            results: [],
            startTime: null,
          })
        )
      })
    })

    describe('clear age fields', () => {
      const action = clear('age')
      const initialState = fromJS({
        searchTerm: '',
        total: 1,
        results: ['result_one'],
        searchByAgeMethod: 'dob',
        searchDateOfBirth: '1985/05/05',
        searchApproximateAge: '120',
        searchApproximateAgeUnits: 'years',
      })
      it('resets the age fields back to default', () => {
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
          fromJS({
            searchTerm: '',
            total: 1,
            results: ['result_one'],
            searchByAgeMethod: 'dob',
            searchDateOfBirth: '',
            searchApproximateAge: '',
            searchApproximateAgeUnits: '',
          })
        )
      })
    })

    describe('does not clear results or age fields', () => {
      describe('when the field is not "age" or "results"', () => {

      })
      const action = clear('unknown')
      const initialState = fromJS({
        searchTerm: '',
        total: 1,
        results: ['result_one'],
        searchByAgeMethod: 'dob',
        searchDateOfBirth: '1985/05/05',
        searchApproximateAge: '120',
        searchApproximateAgeUnits: 'years',
      })
      it('resets the age fields back to default', () => {
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
          fromJS({
            searchTerm: '',
            total: 1,
            results: ['result_one'],
            searchByAgeMethod: 'dob',
            searchDateOfBirth: '1985/05/05',
            searchApproximateAge: '120',
            searchApproximateAgeUnits: 'years',
          })
        )
      })
    })
  })

  describe('on SET_SEARCH_FIELD', () => {
    describe('startTime', () => {
      const today = moment('2015-10-19').toDate()

      it('does not set the start time when it exists', () => {
        const action = setPersonSearchField('searchLastName', 'Doe')
        const initialState = fromJS({
          searchTerm: '',
          total: 1,
          results: ['result_one'],
          searchLastName: 'Flintstone',
          startTime: today.toISOString(),
        })
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
          fromJS({
            searchTerm: '',
            total: 1,
            results: ['result_one'],
            searchLastName: 'Doe',
            startTime: today.toISOString(),
          })
        )
      })

      it('sets the start time when the value is falsy', () => {
        const action = setPersonSearchField('searchLastName', 'Doe')
        const initialState = fromJS({
          searchTerm: 'searchTerm',
          total: 1,
          results: ['result_one'],
          searchLastName: 'Flintstone',
        })
        jasmine.clock().mockDate(today)
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
          fromJS({
            searchTerm: 'searchTerm',
            total: 1,
            results: ['result_one'],
            searchLastName: 'Doe',
            startTime: today.toISOString(),
          })
        )
        jasmine.clock().uninstall()
      })

      it('resets the start time when the start time is falsy and value is falsy', () => {
        const action = setPersonSearchField('searchLastName', '')
        const initialState = fromJS({
          searchTerm: '',
          total: 0,
          results: [],
          searchLastName: '',
        })
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
          fromJS({
            searchTerm: '',
            total: 0,
            results: [],
            searchLastName: '',
            startTime: null,
          })
        )
      })
    })

    it('sets the search term', () => {
      const action = setPersonSearchField('searchTerm', 'Annie Doe')
      const initialState = fromJS({
        searchTerm: '',
        total: 1,
        results: ['result_one'],
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchTerm')
      ).toEqual('Annie Doe')
    })

    it('sets the last name', () => {
      const action = setPersonSearchField('searchLastName', 'Doe')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchLastName: 'Flintstone',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchLastName')
      ).toEqual('Doe')
    })

    it('sets the first name', () => {
      const action = setPersonSearchField('searchFirstName', 'Jane')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchFirstName: 'Freddy',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchFirstName')
      ).toEqual('Jane')
    })

    it('sets the middle name', () => {
      const action = setPersonSearchField('searchMiddleName', 'Bedrock')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchMiddleName: 'Joe',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchMiddleName')
      ).toEqual('Bedrock')
    })

    it('sets the client id', () => {
      const action = setPersonSearchField('searchClientId', '1')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['results_one'],
        searchClientId: '2',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchClientId')
      ).toEqual('1')
    })

    it('sets the suffix', () => {
      const action = setPersonSearchField('searchSuffix', 'Jr')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchSuffix: 'Sr',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchSuffix')
      ).toEqual('Jr')
    })

    it('sets the ssn', () => {
      const action = setPersonSearchField('searchSsn', '123456789')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchSsn: '098765432',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchSsn')
      ).toEqual('123456789')
    })

    it('sets the date of birth', () => {
      const action = setPersonSearchField('searchDateOfBirth', '01/01/2000')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchDateOfBirth: '12/01/1999',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchDateOfBirth')
      ).toEqual('01/01/2000')
    })

    it('sets the approximate age', () => {
      const action = setPersonSearchField('searchApproximateAge', '5')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchApproximateAge: '3',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchApproximateAge')
      ).toEqual('5')
    })

    it('sets the approximate age units', () => {
      const action = setPersonSearchField('searchApproximateAgeUnits', 'years')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchApproximateAgeUnits: 'months',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchApproximateAgeUnits')
      ).toEqual('years')
    })

    it('sets the search by age method', () => {
      const action = setPersonSearchField('searchByAgeMethod', 'approximate')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchByAgeMethod: 'dob',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchByAgeMethod')
      ).toEqual('approximate')
    })

    it('sets the sex at birth', () => {
      const action = setPersonSearchField('searchSexAtBirth', 'Female')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchSexAtBirth: 'Male',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchSexAtBirth')
      ).toEqual('Female')
    })

    it('sets the address', () => {
      const action = setPersonSearchField('searchAddress', '123 Main St')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 3,
        results: ['result_one', 'result_two', 'result_three'],
        searchAddress: '777 Cross St',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchAddress')
      ).toEqual('123 Main St')
    })

    it('sets the city', () => {
      const action = setPersonSearchField('searchCity', 'Sac Town')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 3,
        results: ['result_one', 'result_two', 'result_three'],
        searchCity: 'Sac Town',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchCity')
      ).toEqual('Sac Town')
    })

    it('sets the county', () => {
      const action = setPersonSearchField('searchCounty', 'Placer')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 3,
        results: ['result_one', 'result_two', 'result_three'],
        searchCounty: 'Shasta',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchCounty')
      ).toEqual('Placer')
    })

    it('sets the US state', () => {
      const action = setPersonSearchField('searchState', 'California')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchState: 'Florida',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchState')
      ).toEqual('California')
    })

    it('sets the country', () => {
      const action = setPersonSearchField(
        'searchCountry',
        'United States of America'
      )
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchCountry: 'Mexico',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchCountry')
      ).toEqual('United States of America')
    })

    it('sets the zip code', () => {
      const action = setPersonSearchField('searchZipCode', '95776')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchZipCode: '95695',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchZipCode')
      ).toEqual('95776')
    })
  })

  describe('on LOAD_MORE_RESULTS_COMPLETE', () => {
    const initialState = fromJS({
      searchTerm: 'newSearchTerm',
      total: 4,
      results: ['result_one', 'result_two'],
    })
    describe('on success', () => {
      const action = loadMoreResultsSuccess({
        hits: {
          hits: ['result_three', 'result_four'],
        },
      })
      it('updates search results with hits', () => {
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
          fromJS({
            searchTerm: 'newSearchTerm',
            total: 4,
            results: [
              'result_one',
              'result_two',
              'result_three',
              'result_four',
            ],
          })
        )
      })
    })
    describe('on failure', () => {
      const action = loadMoreResultsFailure()
      it('leaves state unchanged', () => {
        expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
          initialState
        )
      })
    })
  })

  describe('on FETCH_USER_INFO_COMPLETE', () => {
    it('defaults the search county to the county of the user', () => {
      const action = fetchUserInfoSuccess({county: 'Los Angeles'})
      const initialState = fromJS({searchCounty: ''})
      const newState = peopleSearchReducer(initialState, action)
      expect(newState.get('searchCounty')).toEqual('Los Angeles')
      expect(newState.get('defaultCounty')).toEqual('Los Angeles')
    })
    it('does not override an explicit user selection', () => {
      const action = fetchUserInfoSuccess({county: 'Los Angeles'})
      const initialState = fromJS({searchCounty: 'Sutter'})
      const newState = peopleSearchReducer(initialState, action)
      expect(newState.get('searchCounty')).toEqual('Sutter')
      expect(newState.get('defaultCounty')).toEqual('Los Angeles')
    })
    it('does not set the default if user is State of California', () => {
      const action = fetchUserInfoSuccess({county: 'State of California'})
      const initialState = fromJS({searchCounty: '', defaultCounty: null})
      const newState = peopleSearchReducer(initialState, action)
      expect(newState.get('searchCounty')).toEqual('')
      expect(newState.get('defaultCounty')).toEqual(null)
    })
  })

  describe('on RESET_PERSON_SEARCH', () => {
    it('clears everything and sets county to default', () => {
      const action = resetPersonSearch()
      const initialState = fromJS({
        searchTerm: 'Doe Jane Middle II 123456789 2019-02-14',
        searchLastName: 'Doe',
        searchFirstName: 'Jane',
        searchMiddleName: 'Middle',
        searchClientId: '1',
        searchSuffix: 'II',
        searchSsn: '123456789',
        searchDateOfBirth: '2019-02-14',
        searchApproximateAge: '5',
        searchApproximateAgeUnits: 'Years',
        searchByAgeMethod: 'approximate',
        searchSexAtBirth: 'Female',
        searchAddress: '123 Main St',
        searchCity: 'Woodland',
        searchCounty: 'Yolo',
        searchState: 'California',
        searchCountry: 'United States of America',
        searchZipCode: '95695',
        defaultCounty: 'Sacramento',
      })
      const newState = peopleSearchReducer(initialState, action)
      expect(newState).toEqualImmutable(
        fromJS({
          searchTerm: '',
          searchLastName: '',
          searchFirstName: '',
          searchMiddleName: '',
          searchClientId: '',
          searchSuffix: '',
          searchSsn: '',
          searchDateOfBirth: '',
          searchApproximateAge: '',
          searchApproximateAgeUnits: '',
          searchByAgeMethod: 'dob',
          searchSexAtBirth: '',
          searchAddress: '',
          searchCity: '',
          searchCounty: 'Sacramento',
          searchState: '',
          searchCountry: '',
          searchZipCode: '',
          defaultCounty: 'Sacramento',
        })
      )
    })
    it('sets county to empty if there is no default', () => {
      const action = resetPersonSearch()
      const initialState = fromJS({defaultCounty: null})
      const newState = peopleSearchReducer(initialState, action)
      expect(newState.get('searchCounty')).toEqual('')
      expect(newState.get('defaultCounty')).toEqual(null)
    })
  })

  describe('on SET_SEARCH_FIELD_ERROR_CHECK', () => {
    describe('clientIdErrorCheck', () => {
      it('action sets error check to true', () => {
        const action = setFieldErrorCheck('clientIdErrorCheck', true)
        const initialState = fromJS({clientIdErrorCheck: false})
        const newState = peopleSearchReducer(initialState, action)
        expect(newState.get('clientIdErrorCheck')).toEqual(true)
      })

      it('action sets error check to false', () => {
        const action = setFieldErrorCheck('clientIdErrorCheck', false)
        const initialState = fromJS({clientIdErrorCheck: true})
        const newState = peopleSearchReducer(initialState, action)
        expect(newState.get('clientIdErrorCheck')).toEqual(false)
      })
    })

    describe('ssnErrorCheck', () => {
      it('action sets error check to true', () => {
        const action = setFieldErrorCheck('ssnErrorCheck', true)
        const initialState = fromJS({ssnErrorCheck: false})
        const newState = peopleSearchReducer(initialState, action)
        expect(newState.get('ssnErrorCheck')).toEqual(true)
      })

      it('action sets error check to false', () => {
        const action = setFieldErrorCheck('ssnErrorCheck', false)
        const initialState = fromJS({ssnErrorCheck: true})
        const newState = peopleSearchReducer(initialState, action)
        expect(newState.get('ssnErrorCheck')).toEqual(false)
      })
    })

    describe('dobErrorCheck', () => {
      it('action sets error check to true', () => {
        const action = setFieldErrorCheck('dobErrorCheck', true)
        const initialState = fromJS({dobErrorCheck: false})
        const newState = peopleSearchReducer(initialState, action)
        expect(newState.get('dobErrorCheck')).toEqual(true)
      })

      it('action sets error check to false', () => {
        const action = setFieldErrorCheck('dobErrorCheck', false)
        const initialState = fromJS({dobErrorCheck: true})
        const newState = peopleSearchReducer(initialState, action)
        expect(newState.get('dobErrorCheck')).toEqual(false)
      })
    })
  })

  describe('on SET_CLIENT_ID_ERROR', () => {
    const initialState = fromJS({
      searchTerm: 'newSearchTerm',
      total: 3,
      clientIdErrorCheck: false,
    })
    const action = setClientIdErrorCheck()
    it('action sets clientIdErrorCheck to true', () => {
      expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
        fromJS({
          searchTerm: 'newSearchTerm',
          total: 3,
          clientIdErrorCheck: true,
        })
      )
    })
  })

  describe('on SET_SSN_ERROR_CHECK', () => {
    it('action sets ssnErrorCheck to true', () => {
      const initialState = fromJS({
        searchTerm: 'newSearchTerm',
        total: 3,
        ssnErrorCheck: false,
      })
      const action = setSsnErrorCheck()
      expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
        fromJS({
          searchTerm: 'newSearchTerm',
          total: 3,
          ssnErrorCheck: true,
        })
      )
    })
  })

  describe('on SET_DOB_ERROR_CHECK', () => {
    it('action sets dobErrorCheck to true', () => {
      const initialState = fromJS({
        searchTerm: 'newSearchTerm',
        total: 3,
        dobErrorCheck: false,
      })
      const action = setDobErrorCheck()
      expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
        fromJS({
          searchTerm: 'newSearchTerm',
          total: 3,
          dobErrorCheck: true,
        })
      )
    })
  })

  describe('on RESET_CLIENT_ID_ERROR_CHECK', () => {
    const initialState = fromJS({
      searchTerm: 'newSearchTerm',
      total: 3,
      clientIdErrorCheck: true,
    })
    const action = resetClientIdErrorCheck()
    it('action resets clientIdError to false', () => {
      expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
        fromJS({
          searchTerm: 'newSearchTerm',
          total: 3,
          clientIdErrorCheck: false,
        })
      )
    })
  })

  describe('on RESET_SSN_ERROR_CHECK', () => {
    it('action reset ssnErrorCheck to false', () => {
      const initialState = fromJS({
        searchTerm: 'newSearchTerm',
        total: 3,
        ssnErrorCheck: true,
      })
      const action = resetSsnErrorCheck()
      expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
        fromJS({
          searchTerm: 'newSearchTerm',
          total: 3,
          ssnErrorCheck: false,
        })
      )
    })
  })
})
