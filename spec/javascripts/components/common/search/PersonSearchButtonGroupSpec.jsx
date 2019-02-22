import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchButtonGroup from 'common/search/PersonSearchButtonGroup'

const render = ({
  onChange = () => {},
  onCancel = () => {},
  onSubmit = () => {},
  personSearchFields = {},
} = {}) =>
  shallow(
    <PersonSearchButtonGroup
      onChange={onChange}
      onCancel={onCancel}
      onSubmit={onSubmit}
      personSearchFields={personSearchFields}
    />
  )

describe('PersonSearchButtonGroup', () => {
  it('renders button for search', () => {
    const component = render()
    expect(component.find('button.person-search-button.search').text()).toEqual(
      'Search'
    )
  })

  it('renders button for cancel', () => {
    const component = render()
    expect(component.find('button.person-search-button.cancel').text()).toEqual(
      'Cancel'
    )
  })

  describe('when there is no search terms', () => {
    it('disables the search button when there are no search criteria', () => {
      const component = render({personSearchFields: {}})
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeTruthy()
    })
  })

  describe('when there is an existing search terms', () => {
    describe('when the search terms has a valid length', () => {
      it('enables the search button with last name', () => {
        const component = render({
          personSearchFields: {searchLastName: 'Doe'},
        })
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeFalsy()
      })

      it('enables the search button with first name', () => {
        const component = render({
          personSearchFields: {searchFirstName: 'Jane'},
        })
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeFalsy()
      })

      it('enables the search button with middle name', () => {
        const component = render({
          personSearchFields: {searchMiddleName: 'Middle'},
        })
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeFalsy()
      })

      it('enables the search button with client id', () => {
        const component = render({
          personSearchFields: {searchClientId: '0965-9408-8355-7001109'},
        })
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeFalsy()
      })

      it('enables the search button with ssn', () => {
        const component = render({personSearchFields: {searchSsn: '123'}})
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeFalsy()
      })

      it('enables the search button with date of birth', () => {
        const component = render({
          personSearchFields: {searchDateOfBirth: '01/01'},
        })
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeFalsy()
      })

      it('enables the search button with address', () => {
        const component = render({
          personSearchFields: {searchAddress: '123 Main'},
        })
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeFalsy()
      })
    })

    describe('when the search terms are too short', () => {
      it('disables the search button with last name', () => {
        const component = render({
          personSearchFields: {searchLastName: 'D'},
        })
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeTruthy()
      })

      it('disables the search button with first name', () => {
        const component = render({
          personSearchFields: {searchFirstName: 'J'},
        })
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeTruthy()
      })

      it('disables the search button with middle name', () => {
        const component = render({
          personSearchFields: {searchMiddleName: 'M'},
        })
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeTruthy()
      })

      it('disables the search button with ssn', () => {
        const component = render({personSearchFields: {searchSsn: '1'}})
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeTruthy()
      })

      it('disables the search button with date of birth', () => {
        const component = render({
          personSearchFields: {searchDateOfBirth: '0'},
        })
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeTruthy()
      })

      it('disables the search button with address', () => {
        const component = render({personSearchFields: {searchAddress: '1'}})
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeTruthy()
      })
    })

    describe('when the search term contains a character then a whitespace', () => {
      it('enables the search button', () => {
        const component = render({
          personSearchFields: {searchFirstName: 'a '},
        })
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeFalsy()
      })
    })

    describe('when the search term contains two whitespace characters', () => {
      it('disables the search button', () => {
        const component = render({
          personSearchFields: {searchFirstName: '  '},
        })
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeTruthy()
      })
    })

    describe('when search value contains a whitespace then a character', () => {
      it('disables the search button', () => {
        const component = render({
          personSearchFields: {searchFirstName: ' a'},
        })
        expect(
          component.find('button.person-search-button.search').props().disabled
        ).toBeTruthy()
      })
    })
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
    const cancelButton = component.find('.person-search-button.cancel')
    cancelButton.simulate('click')
    expect(onCancel).toHaveBeenCalled()
  })
})
