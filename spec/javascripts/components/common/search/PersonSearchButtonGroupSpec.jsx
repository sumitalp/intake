import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchButtonGroup from 'common/search/PersonSearchButtonGroup'

const render = ({
  onChange = () => {},
  onCancel = () => {},
  onSubmit = () => {},
  personSearchFields = {},
  dobErrors = [],
  ssnErrors = [],
} = {}) =>
  shallow(
    <PersonSearchButtonGroup
      onChange={onChange}
      onCancel={onCancel}
      onSubmit={onSubmit}
      personSearchFields={personSearchFields}
      dobErrors={dobErrors}
      ssnErrors={ssnErrors}
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

  describe('when there is no search terms', () => {
    it('disables the search button when there are no search criteria', () => {
      const component = render({personSearchFields: {}})
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeTruthy()
    })
  })

  describe('ENABLES', () => {
    it('the search button when last name is at least 1 character', () => {
      const component = render({
        personSearchFields: {searchLastName: 'M', searchClientId: '', searchSsn: '', searchDateOfBirth: '', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeFalsy()
    })

    it('the search button when client id is 19 digit and has no errors', () => {
      const component = render({
        personSearchFields: {searchLastName: '', searchClientId: '1111-1111-1111-1111111', searchSsn: '', searchDateOfBirth: '', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeFalsy()
    })

    it('the search button when ssn is 9 digit and has no errors', () => {
      const component = render({
        personSearchFields: {searchLastName: '', searchClientId: '', searchSsn: '123-45-6789', searchDateOfBirth: '', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeFalsy()
    })

    it('the search button when dob is entire entry and has no errors', () => {
      const component = render({
        personSearchFields: {searchLastName: '', searchClientId: '', searchSsn: '', searchDateOfBirth: '2019-04-11', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeFalsy()
    })

    it('the search button when last name is at least 1 character, client id is 19 digits and has no Errors', () => {
      const component = render({
        personSearchFields: {searchLastName: 'Girish', searchClientId: '1111-1111-1111-1111111', searchSsn: '', searchDateOfBirth: '', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeFalsy()
    })

    it('the search button when last name is at least 1 character, ssn is 9 digits and has no Errors', () => {
      const component = render({
        personSearchFields: {searchLastName: 'Girish', searchClientId: '', searchSsn: '123-45-6789', searchDateOfBirth: '', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeFalsy()
    })

    it('the search button when last name is at least 1 character, dob is entire entry and has no Errors', () => {
      const component = render({
        personSearchFields: {searchLastName: 'Girish', searchClientId: '', searchSsn: '', searchDateOfBirth: '2019-04-11', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeFalsy()
    })

    it('the search button when ssn is 9 digits and client id is 19 digits and has no errors', () => {
      const component = render({
        personSearchFields: {searchLastName: '', searchClientId: '1111-1111-1111-1111111', searchSsn: '123-45-6789', searchDateOfBirth: '', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeFalsy()
    })

    it('the search button when ssn is 9 digits, client id is 19 digits, dob is entire entry and has no errors', () => {
      const component = render({
        personSearchFields: {searchLastName: '', searchClientId: '1111-1111-1111-1111111', searchSsn: '123-45-6789', searchDateOfBirth: '2019-04-11', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeFalsy()
    })

    it('the search button when last name is at least 1 character, ssn is 9 digits, client id is 19 digits, dob is entire entry and has no errors', () => {
      const component = render({
        personSearchFields: {searchLastName: 'Girish', searchClientId: '1111-1111-1111-1111111', searchSsn: '123-45-6789', searchDateOfBirth: '2019-04-11', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeFalsy()
    })
  })

  describe('DISABLES', () => {
    it('the search button when last name is less than 1 character', () => {
      const component = render({
        personSearchFields: {searchLastName: '', searchClientId: '', searchSsn: '', searchDateOfBirth: '', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeTruthy()
    })

    it('the search button when client id is less than 19 digits', () => {
      const component = render({
        personSearchFields: {searchLastName: '', searchClientId: '1111', searchSsn: '', searchDateOfBirth: '', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeTruthy()
    })

    it('the search button when ssn is less than 9 digits', () => {
      const component = render({
        personSearchFields: {searchLastName: '', searchClientId: '', searchSsn: '1234', searchDateOfBirth: '', dobErrors: [], ssnErrors: ['errors']},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeTruthy()
    })

    it('the search button when dob has error', () => {
      const component = render({
        personSearchFields: {searchLastName: '', searchClientId: '', searchSsn: '1234', searchDateOfBirth: '', dobErrors: ['errors'], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeTruthy()
    })

    it('the search button when last name is at least 1 character and cliendId is less than 19 digits', () => {
      const component = render({
        personSearchFields: {searchLastName: 'Girish', searchClientId: '1111', searchSsn: '', searchDateOfBirth: '', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeTruthy()
    })

    it('the search button when cliendId is less than 19 digits and ssn is 9 digits', () => {
      const component = render({
        personSearchFields: {searchLastName: '', searchClientId: '1111', searchSsn: '123-45-6789', searchDateOfBirth: '', dobErrors: [], ssnErrors: []},
      })
      expect(
        component.find('button.person-search-button.search').props().disabled
      ).toBeTruthy()
    })
  })

  describe('when there is an existing search terms', () => {
    describe('when the search terms are too short', () => {
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
    })

    describe('when the search term contains a character then a whitespace', () => {
      it('enables the search button', () => {
        const component = render({
          personSearchFields: {searchLastName: 'a ', searchClientId: '', searchSsn: '', searchDateOfBirth: '', dobErrors: [], ssnErrors: []},
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
    const cancelButton = component.find('.person-search-button.clear')
    cancelButton.simulate('click')
    expect(onCancel).toHaveBeenCalled()
  })
})
