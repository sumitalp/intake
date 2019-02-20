import {createReducer} from 'utils/createReducer'
import {fromJS} from 'immutable'
import {
  PEOPLE_SEARCH_CLEAR,
  PEOPLE_SEARCH_FETCH,
  PEOPLE_SEARCH_FETCH_COMPLETE,
  RESET_PERSON_SEARCH,
  SET_SEARCH_TERM,
  SET_SEARCH_FIELD,
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
  searchSexAtBirth: '',
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

const setPersonSearchField = (state, {payload}) => {
  const {field, value} = payload
  return state.set(field, value)
}

const resetPersonSearchFields = state =>
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
    .set('searchSexAtBirth', '')
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
  [SET_SEARCH_FIELD]: setPersonSearchField,
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
  [RESET_PERSON_SEARCH]: resetPersonSearchFields,
})
