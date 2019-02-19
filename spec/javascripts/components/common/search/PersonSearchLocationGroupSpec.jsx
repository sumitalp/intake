import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchLocationGroup from 'common/search/PersonSearchLocationGroup'

const render = ({onChange = () => {}, personSearchFields = {}} = {}) =>
  shallow(
    <PersonSearchLocationGroup
      onChange={onChange}
      personSearchFields={personSearchFields}
    />
  )

describe('PersonSearchLocationGroup', () => {
  it('renders address input field with label Street Address', () => {
    const address = render({
      personSearchFields: {searchAddress: '1600 Pennsylvania Ave NW'},
    }).find('InputField[label="Street Address"]')
    expect(address.props().id).toEqual('search-address')
    expect(address.props().value).toEqual('1600 Pennsylvania Ave NW')
  })

  it('renders city input field with label City', () => {
    const city = render({
      personSearchFields: {searchCity: 'Damascus'},
    }).find('InputField[label="City"]')
    expect(city.props().id).toEqual('search-city')
    expect(city.props().value).toEqual('Damascus')
  })

  it('renders county select', () => {
    const component = render({personSearchFields: {searchCounty: ''}})
    const countySelect = component.find('CountyNameSelect')
    expect(countySelect.props().id).toEqual('search-county')
    expect(countySelect.props().value).toEqual('')
  })

  it('renders county select when a county is selected', () => {
    const component = render({
      personSearchFields: {searchCounty: 'Contra Costa'},
    })
    const countySelect = component.find('CountyNameSelect')
    expect(countySelect.props().id).toEqual('search-county')
    expect(countySelect.props().value).toEqual('Contra Costa')
  })

  it('renders state select', () => {
    const component = render({personSearchFields: {searchState: ''}})
    const stateSelect = component.find('StateNameSelect')
    expect(stateSelect.props().id).toEqual('search-state')
    expect(stateSelect.props().value).toEqual('')
  })

  it('renders state select when a state is selected', () => {
    const component = render({
      personSearchFields: {searchState: 'California'},
    })
    const stateSelect = component.find('StateNameSelect')
    expect(stateSelect.props().id).toEqual('search-state')
    expect(stateSelect.props().value).toEqual('California')
  })

  it('renders country input field with label Country', () => {
    const country = render({
      personSearchFields: {searchCountry: 'United States'},
    }).find('InputField[label="Country"]')
    expect(country.props().id).toEqual('search-country')
    expect(country.props().value).toEqual('United States')
    expect(country.props().disabled).toEqual(true)
  })

  it('renders zip code input field with label Zip Code', () => {
    const zipCode = render({
      personSearchFields: {searchZipCode: '12345'},
    }).find('InputField[label="Zip Code"]')
    expect(zipCode.props().id).toEqual('search-zip-code')
    expect(zipCode.props().value).toEqual('12345')
    expect(zipCode.props().disabled).toEqual(true)
  })

  it('calls onChangeAddress when new address is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-address')
      .props()
      .onChange({target: {value: '1 Infinite Loop'}})
    expect(onChange).toHaveBeenCalledWith('searchAddress', '1 Infinite Loop')
  })

  it('calls onChange when new city is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-city')
      .props()
      .onChange({target: {value: 'Metropolis'}})
    expect(onChange).toHaveBeenCalledWith('searchCity', 'Metropolis')
  })

  it('calls onChange when new county is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('CountyNameSelect')
      .props()
      .onChange('searchCounty', 'Inyo')
    expect(onChange).toHaveBeenCalledWith('searchCounty', 'Inyo')
  })

  it('calls onChange when new state is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('StateNameSelect')
      .props()
      .onChange('searchState', 'California')
    expect(onChange).toHaveBeenCalledWith('searchState', 'California')
  })

  it('calls onChange when new country is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-country')
      .props()
      .onChange({target: {value: 'United States'}})
    expect(onChange).toHaveBeenCalledWith('searchCountry', 'United States')
  })

  it('calls onChange when new zip code is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-zip-code')
      .props()
      .onChange({target: {value: '12345'}})
    expect(onChange).toHaveBeenCalledWith('searchZipCode', '12345')
  })
})
