export const PEOPLE_SEARCH_FETCH = 'PEOPLE_SEARCH/FETCH'
export const PEOPLE_SEARCH_FETCH_COMPLETE = 'PEOPLE_SEARCH/FETCH_COMPLETE'
export const PEOPLE_SEARCH_CLEAR = 'PEOPLE_SEARCH/CLEAR'
export const SET_SEARCH_FIELD = 'PEOPLE_SEARCH/SET_SEARCH_FIELD'
export const LOAD_MORE_RESULTS = 'PEOPLE_SEARCH/LOAD_MORE_RESULTS'
export const LOAD_MORE_RESULTS_COMPLETE = 'PEOPLE_SEARCH/LOAD_MORE_RESULTS_COMPLETE'
export const RESET_PERSON_SEARCH = 'RESET_PERSON_SEARCH'
export const SET_CLIENT_ID_ERROR = 'SET_CLIENT_ID_ERROR'
export const SET_SSN_ERROR_CHECK = 'SET_SSN_ERROR_CHECK'
export const SET_DOB_ERROR_CHECK = 'SET_DOB_ERROR_CHECK'
export const RESET_SSN_ERROR_CHECK = 'RESET_SSN_ERROR_CHECK'

export const setPersonSearchField = (field, value) => ({
  type: SET_SEARCH_FIELD,
  payload: {field, value},
})
export const search = (isClientOnly, isAdvancedSearchOn, personSearchFields) => ({
  type: PEOPLE_SEARCH_FETCH,
  payload: {isClientOnly, isAdvancedSearchOn, personSearchFields},
})
export const loadMoreResults = (isClientOnly, isAdvancedSearchOn, personSearchFields) => ({
  type: LOAD_MORE_RESULTS,
  payload: {isClientOnly, isAdvancedSearchOn, personSearchFields},
})
export const loadMoreResultsFailure = (error) => ({
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
export const fetchFailure = (error) => ({
  type: PEOPLE_SEARCH_FETCH_COMPLETE,
  payload: {error},
  error: true,
})
export const clear = (field) => ({
  type: PEOPLE_SEARCH_CLEAR,
  payload: {field},
})
export const resetPersonSearch = () => ({
  type: RESET_PERSON_SEARCH,
})
export const setClientIdError = () => ({
  type: SET_CLIENT_ID_ERROR,
})
export const setSsnErrorCheck = () => ({
  type: SET_SSN_ERROR_CHECK,
})
export const resetSsnErrorCheck = () => ({
  type: RESET_SSN_ERROR_CHECK,
})
export const setDobErrorCheck = () => ({
  type: SET_DOB_ERROR_CHECK,
})
