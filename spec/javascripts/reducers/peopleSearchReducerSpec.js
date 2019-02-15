import * as matchers from 'jasmine-immutable-matchers'
import {
  clear,
  fetchFailure,
  fetchSuccess,
  resetPersonSearch,
  search,
  setSearchTerm,
  setSearchLastName,
  setSearchFirstName,
  setSearchMiddleName,
  setSearchClientId,
  setSearchSuffix,
  setSearchSsn,
  setSearchDateOfBirth,
  setSearchApproximateAge,
  setSearchApproximateAgeUnits,
  setSearchGenderAtBirth,
  setSearchAddress,
  setSearchCity,
  setSearchCounty,
  setSearchState,
  setSearchCountry,
  setSearchZipCode,
  loadMoreResultsSuccess,
  loadMoreResultsFailure,
} from 'actions/peopleSearchActions'
import {fetchSuccess as fetchUserInfoSuccess} from 'actions/userInfoActions'
import peopleSearchReducer from 'reducers/peopleSearchReducer'
import {Map, fromJS} from 'immutable'
import moment from 'moment'

describe('peopleSearchReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))
  describe('on PEOPLE_SEARCH_FETCH', () => {
    it('updates the search term and total', () => {
      const action = search('newSearchTerm')
      expect(peopleSearchReducer(Map(), action)).toEqualImmutable(
        fromJS({
          searchTerm: 'newSearchTerm',
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
    const initialState = fromJS({
      searchTerm: 'newSearchTerm',
      total: 3,
      results: ['result_one', 'result_two', 'result_three'],
    })
    const action = clear()
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
  describe('on SET_SEARCH_TERM', () => {
    it('sets searchTerm and startTime', () => {
      const action = setSearchTerm()
      const initialState = fromJS({
        searchLastName: 'Bravo',
        searchTerm: '',
        total: 1,
        results: ['result_one'],
      })
      const today = moment('2015-10-19').toDate()
      jasmine.clock().mockDate(today)
      expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
        fromJS({
          searchLastName: 'Bravo',
          searchTerm: 'Bravo',
          total: 1,
          results: ['result_one'],
          startTime: today.toISOString(),
        })
      )
      jasmine.clock().uninstall()
    })

    it('resets the start time when there is no search term', () => {
      const action = setSearchTerm('')
      const initialState = fromJS({
        searchTerm: '',
        total: 0,
        results: [],
      })
      expect(peopleSearchReducer(initialState, action)).toEqualImmutable(
        fromJS({
          searchTerm: '',
          total: 0,
          results: [],
          startTime: null,
        })
      )
    })
  })
  describe('on SET_SEARCH_LAST_NAME', () => {
    it('sets the last name', () => {
      const action = setSearchLastName('Doe')
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
  })
  describe('on SET_SEARCH_FIRST_NAME', () => {
    it('sets the first name', () => {
      const action = setSearchFirstName('Jane')
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
  })
  describe('on SET_SEARCH_MIDDLE_NAME', () => {
    it('sets the middle name', () => {
      const action = setSearchMiddleName('Bedrock')
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
  })
  describe('on SET_SEARCH_CLIENT_ID', () => {
    it('sets the client id', () => {
      const action = setSearchClientId('1')
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
  })
  describe('on SET_SEARCH_SUFFIX', () => {
    it('sets the suffix', () => {
      const action = setSearchSuffix('Jr')
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
  })
  describe('on SET_SEARCH_SSN', () => {
    it('sets the ssn', () => {
      const action = setSearchSsn('123456789')
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
  })
  describe('on SET_SEARCH_DATE_OF_BIRTH', () => {
    it('sets the date of birth', () => {
      const action = setSearchDateOfBirth('01/01/2000')
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
  })
  describe('on SET_SEARCH_APPROXIMATE_AGE', () => {
    it('sets the approximate age', () => {
      const action = setSearchApproximateAge('5')
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
  })
  describe('on SET_SEARCH_APPROXIMATE_AGE_UNITS', () => {
    it('sets the approximate age units', () => {
      const action = setSearchApproximateAgeUnits('years')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchApproximateAgeUnits: 'months',
      })
      expect(
        peopleSearchReducer(initialState, action).get(
          'searchApproximateAgeUnits'
        )
      ).toEqual('years')
    })
  })
  describe('on SET_SEARCH_GENDER_AT_BIRTH', () => {
    it('sets the gender at birth', () => {
      const action = setSearchGenderAtBirth('Female')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 1,
        results: ['result_one'],
        searchGenderAtBirth: 'Male',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchGenderAtBirth')
      ).toEqual('Female')
    })
  })
  describe('on SET_SEARCH_ADDRESS', () => {
    it('sets the address', () => {
      const action = setSearchAddress('Goodbye')
      const initialState = fromJS({
        searchTerm: 'searchTerm',
        total: 3,
        results: ['result_one', 'result_two', 'result_three'],
        searchAddress: 'Hello',
      })
      expect(
        peopleSearchReducer(initialState, action).get('searchAddress')
      ).toEqual('Goodbye')
    })
  })
  describe('on SET_SEARCH_CITY', () => {
    it('sets the city', () => {
      const action = setSearchCity('Sac Town')
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
  })
  describe('on SET_SEARCH_COUNTY', () => {
    it('sets the county', () => {
      const action = setSearchCounty('Placer')
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
  })
  describe('on SET_SEARCH_STATE', () => {
    it('sets the US state', () => {
      const action = setSearchState('California')
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
  })
  describe('on SET_SEARCH_COUNTRY', () => {
    it('sets the country', () => {
      const action = setSearchCountry('United States of America')
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
  })
  describe('on SET_SEARCH_ZIP_CODE', () => {
    it('sets the zip code', () => {
      const action = setSearchZipCode('95776')
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
        searchGenderAtBirth: 'Female',
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
          searchGenderAtBirth: '',
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
})
