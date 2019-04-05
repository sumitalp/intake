import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchButtonGroup from 'common/search/PersonSearchButtonGroup'

const render = ({
  onCancel = () => {},
  onSubmit = () => {},
  canSearch = false,
} = {}) =>
  shallow(
    <PersonSearchButtonGroup
      onCancel={onCancel}
      onSubmit={onSubmit}
      canSearch={canSearch}
    />
  )

describe('PersonSearchButtonGroup', () => {
  it('renders search button', () => {
    const component = render()
    expect(component.find('button.person-search-button.search').text()).toEqual(
      'Search'
    )
  })

  it('renders clear all button', () => {
    const component = render()
    expect(component.find('button.person-search-button.clear').text()).toEqual(
      'Clear All'
    )
  })

  it('calls onSubmit when search button is clicked', () => {
    const onSubmit = jasmine.createSpy('onClick')
    const component = render({onSubmit})
    const searchButton = component.find('.person-search-button.search')
    searchButton.simulate('click')
    expect(onSubmit).toHaveBeenCalled()
  })

  it('calls onCancel when cancel button is clicked', () => {
    const onCancel = jasmine.createSpy('onCancel')
    const component = render({onCancel})
    const cancelButton = component.find('.person-search-button.clear')
    cancelButton.simulate('click')
    expect(onCancel).toHaveBeenCalled()
  })

  it('search button gets enabled when canSearch props is true', () => {
    const component = render({canSearch: true})
    expect(component.find('button.person-search-button.search').props().disabled).toBeFalsy()
  })

  it('search button gets disabled when canSearch props is false', () => {
    const component = render({canSearch: false})
    expect(component.find('button.person-search-button.search').props().disabled).toBeTruthy()
  })
})
