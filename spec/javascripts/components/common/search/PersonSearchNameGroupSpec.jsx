import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchNameGroup from 'common/search/PersonSearchNameGroup'

const render = ({onChange = () => {}, personSearchFields = {}, clientIdError = []} = {}) =>
  shallow(
    <PersonSearchNameGroup
      onChange={onChange}
      personSearchFields={personSearchFields}
      clientIdError={clientIdError}
    />
  )

describe('PersonSearchNameGroup', () => {
  it('renders last name input field with label Last Name', () => {
    const lastName = render({
      personSearchFields: {searchLastName: 'Bravo'},
    }).find('InputField[label="Last Name"]')
    expect(lastName.props().id).toEqual('search-last-name')
    expect(lastName.props().value).toEqual('Bravo')
  })

  it('renders first name input field with label First Name', () => {
    const firstName = render({
      personSearchFields: {searchFirstName: 'Armando'},
    }).find('InputField[label="First Name"]')
    expect(firstName.props().id).toEqual('search-first-name')
    expect(firstName.props().value).toEqual('Armando')
  })

  it('renders middle name input field with label Middle Name', () => {
    const middleName = render({
      personSearchFields: {searchMiddleName: 'Middle'},
    }).find('InputField[label="Middle Name"]')
    expect(middleName.props().id).toEqual('search-middle-name')
    expect(middleName.props().value).toEqual('Middle')
  })

  it('renders client id input field with label Client ID', () => {
    const clientId = render({
      personSearchFields: {searchClientId: '0965-9408-8355-7001109'},
    }).find('MaskedInputField[label="Client ID"]')
    expect(clientId.props().id).toEqual('search-client-id')
    expect(clientId.props().value).toEqual('0965-9408-8355-7001109')
    expect(clientId.props().label).toEqual('Client ID')
    expect(clientId.props().mask).toEqual('1111-1111-1111-1111111')
    expect(clientId.props().maxLength).toEqual('19')
  })

  describe('clientIdError', () => {
    it('display error message if clientIdError is present', () => {
      const component = render({
        clientIdError: ['Client Id number must be 19 digits long.'],
      }).find('MaskedInputField[label="Client ID"]')
      expect(component.props().errors).toEqual(['Client Id number must be 19 digits long.'])
    })

    it('does not display error message if clientIdError is not present', () => {
      const component = render({
        clientIdError: [],
      }).find('MaskedInputField[label="Client ID"]')
      expect(component.props().errors).toEqual([])
    })

    it('does not display error message if clientIdError is undefined ', () => {
      const component = render({
        clientIdError: undefined,
      }).find('MaskedInputField[label="Client ID"]')
      expect(component.props().errors).toEqual([])
    })
  })

  it('renders suffix select', () => {
    const component = render({personSearchFields: {searchSuffix: ''}})
    const suffixSelect = component.find('SuffixNameSelect')
    expect(suffixSelect.props().id).toEqual('search-suffix')
    expect(suffixSelect.props().value).toEqual('')
  })

  it('renders suffix select when a suffix is selected', () => {
    const component = render({personSearchFields: {searchSuffix: 'Jr'}})
    const suffixSelect = component.find('SuffixNameSelect')
    expect(suffixSelect.props().id).toEqual('search-suffix')
    expect(suffixSelect.props().value).toEqual('Jr')
  })

  it('renders ssn input field with label SSN', () => {
    const ssn = render({personSearchFields: {searchSsn: '123456789'}}).find(
      'InputField[label="SSN"]'
    )
    expect(ssn.props().id).toEqual('search-ssn')
    expect(ssn.props().value).toEqual('123456789')
  })

  it('calls onChange when a new lastName is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-last-name')
      .props()
      .onChange({target: {value: 'Bravo'}})

    expect(onChange).toHaveBeenCalledWith('searchLastName', 'Bravo')
  })

  it('calls onChange when a new firstName is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-first-name')
      .props()
      .onChange({target: {value: 'Armando'}})

    expect(onChange).toHaveBeenCalledWith('searchFirstName', 'Armando')
  })

  it('calls onChange when a new middleName is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-middle-name')
      .props()
      .onChange({target: {value: 'Middle'}})

    expect(onChange).toHaveBeenCalledWith('searchMiddleName', 'Middle')
  })

  it('calls onChange when a new clientId is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-client-id')
      .props()
      .onChange({target: {value: '1'}})

    expect(onChange).toHaveBeenCalledWith('searchClientId', '1')
  })

  it('calls onChange when new suffix is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('SuffixNameSelect')
      .props()
      .onChange('searchSuffix', 'Jr')
    expect(onChange).toHaveBeenCalledWith('searchSuffix', 'Jr')
  })

  it('calls onChange when a new ssn is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-ssn')
      .props()
      .onChange({target: {value: '111223333'}})

    expect(onChange).toHaveBeenCalledWith('searchSsn', '111223333')
  })
})
