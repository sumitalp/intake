import React from 'react'
import {shallow} from 'enzyme'
import {PersonSearchForm} from 'views/people/PersonSearchForm'
import * as IntakeConfig from 'common/config'

describe('PersonSearchForm', () => {
  beforeEach(() => {
    spyOn(IntakeConfig, 'isFeatureInactive').and.returnValue(true)
    spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(false)
  })

  function renderPersonSearchForm({
    canCreateNewPerson = false,
    onChange = () => null,
    onClear = () => null,
    onCancel = () => null,
    onSelect = () => null,
    onLoadMoreResults = () => null,
    onSearch = () => null,
    onChangeAutocomplete = () => null,
    counties = [],
    states = [],
    searchPrompt = '',
    ...args
  }) {
    const props = {
      canCreateNewPerson,
      onChange,
      onClear,
      onCancel,
      onSelect,
      onLoadMoreResults,
      onSearch,
      onChangeAutocomplete,
      counties,
      states,
      searchPrompt,
      ...args,
    }
    return shallow(<PersonSearchForm {...props} />, {
      disableLifecycleMethods: true,
    })
  }

  it('componentWillUnmount', () => {
    const onCancel = jasmine.createSpy('onCancel')
    const component = renderPersonSearchForm({onCancel})
    component.unmount()
    expect(onCancel).toHaveBeenCalled()
  })

  it('renders a card anchor', () => {
    const component = renderPersonSearchForm({})
    expect(component.find('.anchor').exists()).toBe(true)
    expect(component.find('button').props()['aria-label']).toEqual(
      'search-card-anchor'
    )
  })

  it('renders the autocompleter', () => {
    const component = renderPersonSearchForm({})
    const autocompleter = component.find('Autocompleter')
    expect(autocompleter.exists()).toEqual(true)
    expect(autocompleter.props().id).toEqual('screening_participants')
  })

  it('passes props to the autocompleter', () => {
    const isSelectable = jasmine.createSpy('isSelectable')
    const onSelect = jasmine.createSpy('onSelect')
    const component = renderPersonSearchForm({
      isSelectable,
      onSelect,
      personSearchFields: {searchCounty: 'Orange'},
    })
    const autocompleter = component.find('Autocompleter')
    expect(autocompleter.props().isSelectable).toEqual(isSelectable)
    expect(autocompleter.props().onSelect).toEqual(onSelect)
    expect(autocompleter.props().personSearchFields.searchCounty).toEqual('Orange')
    expect(autocompleter.props().counties).toEqual([])
    expect(autocompleter.props().states).toEqual([])
  })

  it('renders the card header', () => {
    const component = renderPersonSearchForm({})
    expect(
      component
        .find('.card-header')
        .children('h2')
        .text()
    ).toContain('Search')
  })

  it('renders the search prompt', () => {
    const component = renderPersonSearchForm({searchPrompt: 'Search for any person'})
    const label = component.find('label.pull-left')
    expect(label.text()).toContain('Search for any person')
  })

  it('adds a class when address search is enabled', () => {
    spyOn(IntakeConfig, 'isAdvancedSearchOn').and.returnValue(true)
    const component = renderPersonSearchForm({})
    expect(component.find('.advanced-search-enabled').exists()).toEqual(true)
  })

  it('adds a class when address search is disabled', () => {
    spyOn(IntakeConfig, 'isAdvancedSearchOn').and.returnValue(false)
    const component = renderPersonSearchForm({})
    expect(component.find('.advanced-search-disabled').exists()).toEqual(true)
  })
})
