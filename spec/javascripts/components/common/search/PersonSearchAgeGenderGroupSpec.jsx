import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchAgeGenderGroup from 'common/search/PersonSearchAgeGenderGroup'

const render = ({onChange = () => {}, personSearchFields = {}} = {}) =>
  shallow(
    <PersonSearchAgeGenderGroup
      onChange={onChange}
      personSearchFields={personSearchFields}
    />
  )

describe('PersonSearchAgeGenderGroup', () => {
  it('renders the date field label', () => {
    const component = render()
    const label = component.find('label.person-search-label-date-of-birth')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Date of Birth')
  })

  it('renders date field', () => {
    const component = render({personSearchFields: {searchDateOfBirth: ''}})
    const dateField = component.find('DateField')
    expect(dateField.props().id).toEqual('search-date-of-birth')
    expect(dateField.props().value).toEqual('')
  })

  it('renders date field when a date is selected', () => {
    const component = render({
      personSearchFields: {searchDateOfBirth: '01/01/2000'},
    })
    const dateField = component.find('DateField')
    expect(dateField.props().id).toEqual('search-date-of-birth')
    expect(dateField.props().value).toEqual('01/01/2000')
  })

  it('renders the approximate age label', () => {
    const component = render()
    const label = component.find('label.person-search-label-approximate-age')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Approximate Age')
  })

  it('renders approximate age input field', () => {
    const approximateAge = render({
      personSearchFields: {searchApproximateAge: '1'},
    }).find('InputField#search-approximate-age-number')
    expect(approximateAge.props().id).toEqual('search-approximate-age-number')
    expect(approximateAge.props().value).toEqual('1')
    expect(approximateAge.props().disabled).toEqual(true)
  })

  it('renders approximate age units select', () => {
    const component = render({
      personSearchFields: {searchApproximateAgeUnits: ''},
    })
    const approximateAgeUnitsSelect = component.find(
      'ApproximateAgeUnitsSelect'
    )
    expect(approximateAgeUnitsSelect.props().id).toEqual(
      'search-approximate-age-units'
    )
    expect(approximateAgeUnitsSelect.props().value).toEqual('')
  })

  it('renders approximate age units select when a unit is selected', () => {
    const component = render({
      personSearchFields: {searchApproximateAgeUnits: 'Months'},
    })
    const approximateAgeUnitsSelect = component.find(
      'ApproximateAgeUnitsSelect'
    )
    expect(approximateAgeUnitsSelect.props().id).toEqual(
      'search-approximate-age-units'
    )
    expect(approximateAgeUnitsSelect.props().value).toEqual('Months')
  })

  it('renders sex at birth select', () => {
    const component = render({personSearchFields: {searchSexAtBirth: ''}})
    const sexAtBirthSelect = component.find('SexAtBirthSelect')
    expect(sexAtBirthSelect.props().id).toEqual('search-sex-at-birth')
    expect(sexAtBirthSelect.props().value).toEqual('')
  })

  it('renders sex at birth select when a gender is selected', () => {
    const component = render({
      personSearchFields: {searchSexAtBirth: 'Female'},
    })
    const sexAtBirthSelect = component.find('SexAtBirthSelect')
    expect(sexAtBirthSelect.props().id).toEqual('search-sex-at-birth')
    expect(sexAtBirthSelect.props().value).toEqual('Female')
  })

  it('calls onChange when new date is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('DateField')
      .props()
      .onChange('01/01/2000')
    expect(onChange).toHaveBeenCalledWith('searchDateOfBirth', '01/01/2000')
  })

  it('calls onChange when a new approximate age is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-approximate-age-number')
      .props()
      .onChange({target: {value: '1'}})

    expect(onChange).toHaveBeenCalledWith('searchApproximateAge', '1')
  })

  it('calls onChange when new approximate age unit is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('ApproximateAgeUnitsSelect')
      .props()
      .onChange('searchApproximateAgeUnits', 'Months')
    expect(onChange).toHaveBeenCalledWith('searchApproximateAgeUnits', 'Months')
  })

  it('calls onChange when new sex at birth is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('SexAtBirthSelect')
      .props()
      .onChange('searchSexAtBirth', 'Female')
    expect(onChange).toHaveBeenCalledWith('searchSexAtBirth', 'Female')
  })
})
