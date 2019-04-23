import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchNameGroup from 'common/search/PersonSearchNameGroup'

const render = ({onChange = () => {}, personSearchFields = {}, onKeyPress = () => {}} = {}) =>
  shallow(
    <PersonSearchNameGroup
      onChange={onChange}
      personSearchFields={personSearchFields}
      onKeyPress={onKeyPress}
    />
  )

describe('PersonSearchNameGroup', () => {
  describe('layout', () => {
    it('renders last name input field with label Last Name', () => {
      const lastName = render({
        personSearchFields: {searchLastName: 'Bravo'},
      }).find('InputField[label="Last Name"]')
      expect(lastName.props().id).toEqual('search-last-name')
      expect(lastName.props().value).toEqual('Bravo')
      expect(lastName.props().maxLength).toEqual('25')
      expect(typeof lastName.prop('onKeyPress')).toEqual('function')
    })

    it('renders first name input field with label First Name', () => {
      const firstName = render({
        personSearchFields: {searchFirstName: 'Armando'},
      }).find('InputField[label="First Name"]')
      expect(firstName.props().id).toEqual('search-first-name')
      expect(firstName.props().value).toEqual('Armando')
      expect(firstName.props().maxLength).toEqual('20')
      expect(typeof firstName.prop('onKeyPress')).toEqual('function')
    })

    it('renders middle name input field with label Middle Name', () => {
      const middleName = render({
        personSearchFields: {searchMiddleName: 'Middle'},
      }).find('InputField[label="Middle Name"]')
      expect(middleName.props().id).toEqual('search-middle-name')
      expect(middleName.props().value).toEqual('Middle')
      expect(middleName.props().maxLength).toEqual('20')
      expect(typeof middleName.prop('onKeyPress')).toEqual('function')
    })

    it('renders suffix input field with label Suffix', () => {
      const suffix = render({
        personSearchFields: {searchSuffix: 'Jr'},
      }).find('InputField[label="Suffix"]')
      expect(suffix.props().id).toEqual('search-suffix')
      expect(suffix.props().value).toEqual('Jr')
      expect(suffix.props().maxLength).toEqual('4')
      expect(typeof suffix.prop('onKeyPress')).toEqual('function')
    })
  })

  describe('when the field values change', () => {
    it('calls onChange when a new last name is entered', () => {
      const onChange = jasmine.createSpy('onChange')
      const component = render({onChange})
      component
        .find('#search-last-name')
        .props()
        .onChange({target: {value: 'Bravo'}})

      expect(onChange).toHaveBeenCalledWith('searchLastName', 'Bravo')
    })

    it('calls onChange when a new first name is entered', () => {
      const onChange = jasmine.createSpy('onChange')
      const component = render({onChange})
      component
        .find('#search-first-name')
        .props()
        .onChange({target: {value: 'Armando'}})

      expect(onChange).toHaveBeenCalledWith('searchFirstName', 'Armando')
    })

    it('calls onChange when a new middle name is entered', () => {
      const onChange = jasmine.createSpy('onChange')
      const component = render({onChange})
      component
        .find('#search-middle-name')
        .props()
        .onChange({target: {value: 'Middle'}})

      expect(onChange).toHaveBeenCalledWith('searchMiddleName', 'Middle')
    })

    it('calls onChange when new suffix is entered', () => {
      const onChange = jasmine.createSpy('onChange')
      const component = render({onChange})
      component
        .find('#search-suffix')
        .props()
        .onChange({target: {value: 'Jr'}})
      expect(onChange).toHaveBeenCalledWith('searchSuffix', 'Jr')
    })
  })
})
