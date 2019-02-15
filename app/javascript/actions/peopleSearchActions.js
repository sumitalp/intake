export const PEOPLE_SEARCH_FETCH = 'PEOPLE_SEARCH/FETCH'
export const PEOPLE_SEARCH_FETCH_COMPLETE = 'PEOPLE_SEARCH/FETCH_COMPLETE'
export const PEOPLE_SEARCH_CLEAR = 'PEOPLE_SEARCH/CLEAR'
export const SET_SEARCH_TERM = 'PEOPLE_SEARCH/SET_SEARCH_TERM'
export const SET_SEARCH_LAST_NAME = 'PEOPLE_SEARCH/SET_SEARCH_LAST_NAME'
export const SET_SEARCH_FIRST_NAME = 'PEOPLE_SEARCH/SET_SEARCH_FIRST_NAME'
export const SET_SEARCH_MIDDLE_NAME = 'PEOPLE_SEARCH/SET_SEARCH_MIDDLE_NAME'
export const SET_SEARCH_CLIENT_ID = 'PEOPLE_SEARCH/SET_SEARCH_CLIENT_ID'
export const SET_SEARCH_SUFFIX = 'PEOPLE_SEARCH/SET_SEARCH_SUFFIX'
export const SET_SEARCH_SSN = 'PEOPLE_SEARCH/SET_SEARCH_SSN'
export const SET_SEARCH_ADDRESS = 'PEOPLE_SEARCH/SET_SEARCH_ADDRESS'
export const SET_SEARCH_CITY = 'PEOPLE_SEARCH/SET_SEARCH_CITY'
export const SET_SEARCH_COUNTY = 'PEOPLE_SEARCH/SET_SEARCH_COUNTY'
export const SET_SEARCH_STATE = 'PEOPLE_SEARCH/SET_SEARCH_STATE'
export const SET_SEARCH_COUNTRY = 'PEOPLE_SEARCH/SET_SEARCH_COUNTRY'
export const SET_SEARCH_ZIP_CODE = 'PEOPLE_SEARCH/SET_SEARCH_ZIP_CODE'
export const SET_SEARCH_DATE_OF_BIRTH = 'PEOPLE_SEARCH/SET_SEARCH_DATE_OF_BIRTH'
export const SET_SEARCH_APPROXIMATE_AGE =
  'PEOPLE_SEARCH/SET_SEARCH_APPROXIMATE_AGE'
export const SET_SEARCH_APPROXIMATE_AGE_UNITS =
  'PEOPLE_SEARCH/SET_SEARCH_APPROXIMATE_AGE_UNITS'
export const SET_SEARCH_GENDER_AT_BIRTH =
  'PEOPLE_SEARCH/SET_SEARCH_GENDER_AT_BIRTH'
export const LOAD_MORE_RESULTS = 'PEOPLE_SEARCH/LOAD_MORE_RESULTS'
export const LOAD_MORE_RESULTS_COMPLETE =
  'PEOPLE_SEARCH/LOAD_MORE_RESULTS_COMPLETE'
export const RESET_PERSON_SEARCH = 'RESET_PERSON_SEARCH'

export const setSearchTerm = () => ({
  type: SET_SEARCH_TERM,
})
export const setSearchLastName = lastName => ({
  type: SET_SEARCH_LAST_NAME,
  payload: {lastName},
})
export const setSearchFirstName = firstName => ({
  type: SET_SEARCH_FIRST_NAME,
  payload: {firstName},
})
export const setSearchMiddleName = middleName => ({
  type: SET_SEARCH_MIDDLE_NAME,
  payload: {middleName},
})
export const setSearchClientId = clientId => ({
  type: SET_SEARCH_CLIENT_ID,
  payload: {clientId},
})
export const setSearchSuffix = suffix => ({
  type: SET_SEARCH_SUFFIX,
  payload: {suffix},
})
export const setSearchSsn = ssn => ({
  type: SET_SEARCH_SSN,
  payload: {ssn},
})
export const setSearchDateOfBirth = dateOfBirth => ({
  type: SET_SEARCH_DATE_OF_BIRTH,
  payload: {dateOfBirth},
})
export const setSearchApproximateAge = approximateAge => ({
  type: SET_SEARCH_APPROXIMATE_AGE,
  payload: {approximateAge},
})
export const setSearchApproximateAgeUnits = approximateAgeUnits => ({
  type: SET_SEARCH_APPROXIMATE_AGE_UNITS,
  payload: {approximateAgeUnits},
})
export const setSearchGenderAtBirth = genderAtBirth => ({
  type: SET_SEARCH_GENDER_AT_BIRTH,
  payload: {genderAtBirth},
})
export const setSearchAddress = address => ({
  type: SET_SEARCH_ADDRESS,
  payload: {address},
})
export const setSearchCity = city => ({
  type: SET_SEARCH_CITY,
  payload: {city},
})
export const setSearchCounty = county => ({
  type: SET_SEARCH_COUNTY,
  payload: {county},
})
export const setSearchState = usState => ({
  type: SET_SEARCH_STATE,
  payload: {usState},
})
export const setSearchCountry = country => ({
  type: SET_SEARCH_COUNTRY,
  payload: {country},
})
export const setSearchZipCode = zipCode => ({
  type: SET_SEARCH_ZIP_CODE,
  payload: {zipCode},
})
export const search = (searchTerm, isClientOnly, searchAddress) => ({
  type: PEOPLE_SEARCH_FETCH,
  payload: {searchTerm, isClientOnly, searchAddress},
})
export const loadMoreResults = (isClientOnly, searchAddress) => ({
  type: LOAD_MORE_RESULTS,
  payload: {isClientOnly, searchAddress},
})
export const loadMoreResultsFailure = error => ({
  type: LOAD_MORE_RESULTS_COMPLETE,
  payload: {error},
  error: true,
})
export const loadMoreResultsSuccess = ({hits: {hits}}) => ({
  type: LOAD_MORE_RESULTS_COMPLETE,
  payload: {results: hits},
})
export const fetchSuccess = ({hits: {hits, total}}) => ({
  type: PEOPLE_SEARCH_FETCH_COMPLETE,
  payload: {results: hits, total},
})
export const fetchFailure = error => ({
  type: PEOPLE_SEARCH_FETCH_COMPLETE,
  payload: {error},
  error: true,
})
export const clear = () => ({
  type: PEOPLE_SEARCH_CLEAR,
})
export const resetPersonSearch = () => ({
  type: RESET_PERSON_SEARCH,
})
