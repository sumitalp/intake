export const PEOPLE_SEARCH_FETCH = 'PEOPLE_SEARCH/FETCH'
export const PEOPLE_SEARCH_FETCH_COMPLETE = 'PEOPLE_SEARCH/FETCH_COMPLETE'
export const PEOPLE_SEARCH_CLEAR = 'PEOPLE_SEARCH/CLEAR'
export const SET_SEARCH_TERM = 'PEOPLE_SEARCH/SET_SEARCH_TERM'
export const SET_SEARCH_FIELD = 'PEOPLE_SEARCH/SET_SEARCH_FIELD'
export const LOAD_MORE_RESULTS = 'PEOPLE_SEARCH/LOAD_MORE_RESULTS'
export const LOAD_MORE_RESULTS_COMPLETE = 'PEOPLE_SEARCH/LOAD_MORE_RESULTS_COMPLETE'
export const RESET_PERSON_SEARCH = 'RESET_PERSON_SEARCH'

export const setSearchTerm = () => ({
  type: SET_SEARCH_TERM,
})
export const setPersonSearchField = (field, value) => ({
  type: SET_SEARCH_FIELD,
  payload: {field, value},
})
export const search = (searchTerm, isClientOnly, searchAddress, searchClientId) => ({
  type: PEOPLE_SEARCH_FETCH,
  payload: {searchTerm, isClientOnly, searchAddress, searchClientId},
})
export const loadMoreResults = (isClientOnly, searchAddress, searchClientId) => ({
  type: LOAD_MORE_RESULTS,
  payload: {isClientOnly, searchAddress, searchClientId},
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
export const clear = () => ({
  type: PEOPLE_SEARCH_CLEAR,
})
export const resetPersonSearch = () => ({
  type: RESET_PERSON_SEARCH,
})
