import {takeLatest, put, call, select} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {get} from 'utils/http'
import {logEvent} from 'utils/analytics'
import {PEOPLE_SEARCH_FETCH, fetchSuccess, fetchFailure} from 'actions/peopleSearchActions'
import {getStaffIdSelector} from 'selectors/userInfoSelectors'

const personSearchParams = (personSearchFields) => {
  const params = {}
  if (!personSearchFields) { return {} }

  if (personSearchFields.searchTerm) {
    params.search_term = personSearchFields.searchTerm
  }
  if (personSearchFields.searchLastName) {
    params.last_name = personSearchFields.searchLastName
  }
  if (personSearchFields.searchFirstName) {
    params.first_name = personSearchFields.searchFirstName
  }
  if (personSearchFields.searchMiddleName) {
    params.middle_name = personSearchFields.searchMiddleName
  }
  if (personSearchFields.searchClientId) {
    params.client_id = personSearchFields.searchClientId
  }
  if (personSearchFields.searchSuffix) {
    params.suffix = personSearchFields.searchSuffix
  }
  if (personSearchFields.searchSsn) {
    params.ssn = personSearchFields.searchSsn
  }
  if (personSearchFields.searchDateOfBirth) {
    params.date_of_birth = personSearchFields.searchDateOfBirth
  }
  if (personSearchFields.searchApproximateAge) {
    params.approximate_age = personSearchFields.searchApproximateAge
  }
  if (personSearchFields.searchApproximateAgeUnits) {
    params.approximate_age_units = personSearchFields.searchApproximateAgeUnits
  }
  if (personSearchFields.searchSexAtBirth) {
    params.sex_at_birth = personSearchFields.searchSexAtBirth
  }
  if (personSearchFields.searchAddress) {
    params.street = personSearchFields.searchAddress
  }
  if (personSearchFields.searchCity) {
    params.city = personSearchFields.searchCity
  }
  if (personSearchFields.searchCounty) {
    params.county = personSearchFields.searchCounty
  }
  if (personSearchFields.searchState) {
    params.state = personSearchFields.searchState
  }
  if (personSearchFields.searchCountry) {
    params.country = personSearchFields.searchCountry
  }
  if (personSearchFields.searchZipCode) {
    params.zip_code = personSearchFields.searchZipCode
  }
  
  return {person_search_fields: params}
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
