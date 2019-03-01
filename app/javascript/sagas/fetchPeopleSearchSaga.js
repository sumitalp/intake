import {takeLatest, put, call, select} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {get} from 'utils/http'
import {logEvent} from 'utils/analytics'
import {PEOPLE_SEARCH_FETCH, fetchSuccess, fetchFailure} from 'actions/peopleSearchActions'
import {getStaffIdSelector} from 'selectors/userInfoSelectors'

const removeFalsy = (params) => {
  const newObj = {}
  Object.keys(params).forEach((prop) => {
    if (params[prop]) { newObj[prop] = params[prop] }
  })
  return newObj
}

const personSearchParams = (personSearchFields) => {
  if (!personSearchFields) { return {} }
  const params = {
    search_term: personSearchFields.searchTerm,
    last_name: personSearchFields.searchLastName,
    first_name: personSearchFields.searchFirstName,
    middle_name: personSearchFields.searchMiddleName,
    client_id: personSearchFields.searchClientId,
    suffix: personSearchFields.searchSuffix,
    ssn: personSearchFields.searchSsn,
    date_of_birth: personSearchFields.searchDateOfBirth,
    approximate_age: personSearchFields.searchApproximateAge,
    approximate_age_units: personSearchFields.searchApproximateAgeUnits,
    sex_at_birth: personSearchFields.searchSexAtBirth,
    street: personSearchFields.searchAddress,
    city: personSearchFields.searchCity,
    county: personSearchFields.searchCounty,
    state: personSearchFields.searchState,
    country: personSearchFields.searchCountry,
    zip_code: personSearchFields.searchZipCode,
  }
  return {person_search_fields: removeFalsy(params)}
}

const searchAfterParams = (sort) => (sort ? {search_after: sort} : {})

export function getPeopleEffect({isClientOnly, isAdvancedSearchOn, personSearchFields, sort}) {
  return call(get, '/api/v1/people', {
    is_client_only: isClientOnly,
    is_advanced_search_on: isAdvancedSearchOn,
    ...personSearchParams(personSearchFields),
    ...searchAfterParams(sort),
  })
}

export function* fetchPeopleSearch({payload: {isClientOnly, isAdvancedSearchOn, personSearchFields}}) {
  try {
    const TIME_TO_DEBOUNCE = 400
    yield call(delay, TIME_TO_DEBOUNCE)
    const response = yield getPeopleEffect({isClientOnly, isAdvancedSearchOn, personSearchFields})
    const staffId = yield select(getStaffIdSelector)
    yield put(fetchSuccess(response))
    yield call(logEvent, 'personSearch', {
      staffId: staffId,
      totalResults: response.hits.total,
    })
  } catch (error) {
    yield put(fetchFailure(error))
  }
}

export function* fetchPeopleSearchSaga() {
  yield takeLatest(PEOPLE_SEARCH_FETCH, fetchPeopleSearch)
}
