import {
  clear,
  fetchFailure,
  fetchSuccess,
  loadMoreResults,
  loadMoreResultsSuccess,
  loadMoreResultsFailure,
  search,
  resetPersonSearch,
  setPersonSearchField,
  setClientIdError,
  setSsnErrorCheck,
  setDobErrorCheck,
} from 'actions/peopleSearchActions'
import {isFSA} from 'flux-standard-action'

describe('peopleSearchActions', () => {
  it('fetchSuccess is FSA compliant', () => {
    const action = fetchSuccess({
      hits: {
        total: 0,
        hits: [],
      },
    })
    expect(isFSA(action)).toEqual(true)
  })

  it('fetchFailure is FSA compliant', () => {
    const action = fetchFailure({})
    expect(isFSA(action)).toEqual(true)
  })

  it('search is FSA compliant', () => {
    const action = search('test')
    expect(isFSA(action)).toEqual(true)
  })

  it('search with address is FSA compliant', () => {
    const action = search('test', true, {
      county: 'Sacramento',
      city: 'Sacramento',
      address: '123 Main St',
    })
    expect(isFSA(action)).toEqual(true)
  })

  it('loadMoreResults is FSA compliant', () => {
    const action = loadMoreResults()
    expect(isFSA(action)).toEqual(true)
  })

  it('loadMoreResults with address is FSA compliant', () => {
    const action = loadMoreResults(true, {
      county: 'Sacramento',
      city: 'Sacramento',
      address: '123 Main St',
    })
    expect(isFSA(action)).toEqual(true)
  })

  it('loadMoreResultsSuccess is FSA compliant', () => {
    const action = loadMoreResultsSuccess({
      hits: {
        total: 0,
        hits: [],
      },
    })
    expect(isFSA(action)).toEqual(true)
  })

  it('loadMoreResultsFailure is FSA compliant', () => {
    const action = loadMoreResultsFailure({})
    expect(isFSA(action)).toEqual(true)
  })

  it('clear is FSA compliant', () => {
    const action = clear({field: 'results'})
    expect(isFSA(action)).toEqual(true)
  })

  it('resetPersonSearch is FSA compliant', () => {
    const action = resetPersonSearch()
    expect(isFSA(action)).toEqual(true)
  })

  it('setPersonSearchField is FSA compliant', () => {
    const action = setPersonSearchField()
    expect(isFSA(action)).toEqual(true)
  })

  it('setPersonSearchField with field and value is FSA compliant', () => {
    const action = setPersonSearchField('searchTerm', 'Jane Doe')
    expect(isFSA(action)).toEqual(true)
  })

  it('setClientIdError is FSA compliant', () => {
    const action = setClientIdError()
    expect(isFSA(action)).toEqual(true)
  })

  it('setSsnErrorCheck', () => {
    const action = setSsnErrorCheck()
    expect(isFSA(action)).toEqual(true)
  })

  it('setDobErrorCheck', () => {
    const action = setDobErrorCheck()
    expect(isFSA(action)).toEqual(true)
  })
})
