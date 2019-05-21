import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchResults from 'common/search/PersonSearchResults'
import {SHOW_MODE} from 'actions/screeningPageActions'

describe('PersonSearchResults', () => {
  const renderPersonSearchResults = (
    {
      total = 0,
      resultsSubset = [],
      setCurrentPageNumber = () => {},
      setCurrentRowNumber = () => {},
      onLoadMoreResults = () => {},
      personSearchFields = {},
    } = {}) => (
    shallow(
      <PersonSearchResults
        total={total}
        resultsSubset={resultsSubset}
        setCurrentPageNumber={setCurrentPageNumber}
        setCurrentRowNumber={setCurrentRowNumber}
        onLoadMoreResults={onLoadMoreResults}
        personSearchFields={personSearchFields}
      />, {disableLifecycleMethods: true})
  )

  it('renders Card View', () => {
    const component = renderPersonSearchResults({total: 25})
    expect(component.find('CardView').props().id).toEqual('person-search-results')
    expect(component.find('CardView').props().title).toEqual('Search Results (25 records found)')
    expect(component.find('CardView').props().mode).toEqual(SHOW_MODE)
  })

  it('renders Card View header with 0 records found when total is undefined', () => {
    const component = renderPersonSearchResults({total: undefined})
    expect(component.find('CardView').props().title).toEqual('Search Results (0 records found)')
  })
})
