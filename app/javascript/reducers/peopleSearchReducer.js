import {createReducer} from 'utils/createReducer'
import {fromJS} from 'immutable'
import {
  PEOPLE_SEARCH_CLEAR,
  PEOPLE_SEARCH_FETCH,
  PEOPLE_SEARCH_FETCH_COMPLETE,
  RESET_PERSON_SEARCH,
  SET_SEARCH_TERM,
  SET_SEARCH_LAST_NAME,
  SET_SEARCH_FIRST_NAME,
  SET_SEARCH_MIDDLE_NAME,
  SET_SEARCH_CLIENT_ID,
  SET_SEARCH_SUFFIX,
  SET_SEARCH_SSN,
  SET_SEARCH_ADDRESS,
  SET_SEARCH_CITY,
  SET_SEARCH_COUNTY,
  SET_SEARCH_STATE,
  SET_SEARCH_COUNTRY,
  SET_SEARCH_ZIP_CODE,
  SET_SEARCH_DATE_OF_BIRTH,
  SET_SEARCH_APPROXIMATE_AGE,
  SET_SEARCH_APPROXIMATE_AGE_UNITS,
  SET_SEARCH_GENDER_AT_BIRTH,
  LOAD_MORE_RESULTS_COMPLETE,
} from 'actions/peopleSearchActions'
import {FETCH_USER_INFO_COMPLETE} from 'actions/userInfoActions'
import moment from 'moment'

const initialState = fromJS({
  results: [],
  searchTerm: '',
  total: 0,
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
  searchCounty: '',
  searchState: '',
  searchCountry: '',
  searchZipCode: '',
  defaultCounty: null,
})

const setSearchTerm = state => {
  const searchCriteria = [
    state.get('searchLastName'),
    state.get('searchFirstName'),
    state.get('searchMiddleName'),
    state.get('searchSuffix'),
    state.get('searchSsn'),
    state.get('searchDateOfBirth'),
  ]
  const searchTerm = searchCriteria
    .join(' ')
    .trim()
    .replace(/  +/g, ' ')

  if (state.get('startTime')) {
    return state.set('searchTerm', searchTerm)
  } else if (searchTerm) {
    return state
      .set('searchTerm', searchTerm)
      .set('startTime', moment().toISOString())
  } else {
    return state.set('searchTerm', searchTerm).set('startTime', null)
  }
}

const resetPersonSearch = state =>
  state
    .set('searchTerm', '')
    .set('searchLastName', '')
    .set('searchFirstName', '')
    .set('searchMiddleName', '')
    .set('searchClientId', '')
    .set('searchSuffix', '')
    .set('searchSsn', '')
    .set('searchDateOfBirth', '')
    .set('searchApproximateAge', '')
    .set('searchApproximateAgeUnits', '')
    .set('searchGenderAtBirth', '')
    .set('searchAddress', '')
    .set('searchCity', '')
    .set('searchCounty', state.get('defaultCounty') || '')
    .set('searchState', '')
    .set('searchCountry', '')
    .set('searchZipCode', '')

export default createReducer(initialState, {
  [PEOPLE_SEARCH_FETCH](
    state,
    {
      payload: {searchTerm},
    }
  ) {
    return state.set('searchTerm', searchTerm).set('total', null)
  },
  [PEOPLE_SEARCH_FETCH_COMPLETE](
    state,
    {
      payload: {results, total},
      error,
    }
  ) {
    if (error) {
      return state
    } else {
      return state.set('results', fromJS(results)).set('total', total)
    }
  },
  [PEOPLE_SEARCH_CLEAR](state, _action) {
    return state
      .set('results', fromJS([]))
      .set('startTime', null)
      .set('total', null)
  },
  [SET_SEARCH_TERM]: setSearchTerm,
  [SET_SEARCH_LAST_NAME](
    state,
    {
      payload: {lastName},
    }
  ) {
    return state.set('searchLastName', lastName)
  },
  [SET_SEARCH_FIRST_NAME](
    state,
    {
      payload: {firstName},
    }
  ) {
    return state.set('searchFirstName', firstName)
  },
  [SET_SEARCH_MIDDLE_NAME](
    state,
    {
      payload: {middleName},
    }
  ) {
    return state.set('searchMiddleName', middleName)
  },
  [SET_SEARCH_CLIENT_ID](
    state,
    {
      payload: {clientId},
    }
  ) {
    return state.set('searchClientId', clientId)
  },
  [SET_SEARCH_SUFFIX](
    state,
    {
      payload: {suffix},
    }
  ) {
    return state.set('searchSuffix', suffix)
  },
  [SET_SEARCH_SSN](
    state,
    {
      payload: {ssn},
    }
  ) {
    return state.set('searchSsn', ssn)
  },
  [SET_SEARCH_DATE_OF_BIRTH](
    state,
    {
      payload: {dateOfBirth},
    }
  ) {
    return state.set('searchDateOfBirth', dateOfBirth)
  },
  [SET_SEARCH_APPROXIMATE_AGE](
    state,
    {
      payload: {approximateAge},
    }
  ) {
    return state.set('searchApproximateAge', approximateAge)
  },
  [SET_SEARCH_APPROXIMATE_AGE_UNITS](
    state,
    {
      payload: {approximateAgeUnits},
    }
  ) {
    return state.set('searchApproximateAgeUnits', approximateAgeUnits)
  },
  [SET_SEARCH_GENDER_AT_BIRTH](
    state,
    {
      payload: {genderAtBirth},
    }
  ) {
    return state.set('searchGenderAtBirth', genderAtBirth)
  },
  [SET_SEARCH_ADDRESS](
    state,
    {
      payload: {address},
    }
  ) {
    return state.set('searchAddress', address)
  },
  [SET_SEARCH_CITY](
    state,
    {
      payload: {city},
    }
  ) {
    return state.set('searchCity', city)
  },
  [SET_SEARCH_COUNTY](
    state,
    {
      payload: {county},
    }
  ) {
    return state.set('searchCounty', county)
  },
  [SET_SEARCH_STATE](
    state,
    {
      payload: {usState},
    }
  ) {
    return state.set('searchState', usState)
  },
  [SET_SEARCH_COUNTRY](
    state,
    {
      payload: {country},
    }
  ) {
    return state.set('searchCountry', country)
  },
  [SET_SEARCH_ZIP_CODE](
    state,
    {
      payload: {zipCode},
    }
  ) {
    return state.set('searchZipCode', zipCode)
  },
  [FETCH_USER_INFO_COMPLETE](
    state,
    {
      payload: {
        userInfo: {county},
      },
    }
  ) {
    if (county === 'State of California') {
      return state
    }
    const newState = state.set('defaultCounty', county)
    return newState.get('searchCounty') === '' ?
      newState.set('searchCounty', county) :
      newState
  },
  [LOAD_MORE_RESULTS_COMPLETE](
    state,
    {
      payload: {results},
      error,
    }
  ) {
    if (error) {
      return state
    } else {
      return state.update('results', arr => arr.concat(fromJS(results)))
    }
  },
  [RESET_PERSON_SEARCH]: resetPersonSearch,
})
