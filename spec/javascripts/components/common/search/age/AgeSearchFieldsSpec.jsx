import React from 'react'
import {shallow} from 'enzyme'
import AgeSearchFields from 'common/search/age/AgeSearchFields'

const defaultPersonSearchFields = {
  searchApproximateAge: '',
  searchApproximateAgeUnits: '',
  searchByAgeMethod: '',
  searchClientId: '',
  searchDateOfBirth: '',
  searchFirstName: '',
  searchSexAtBirth: '',
  searchLastName: '',
  searchMiddleName: '',
  searchSsn: '',
  searchSuffix: '',
  searchTerm: '',
}

const render = (
  {
    dobErrors = [],
    onBlur = () => {},
    onChange = () => {},
    onKeyPress = () => {},
    onKeyUp = () => {},
    personSearchFields = defaultPersonSearchFields,
  } = {}
) =>
  shallow(
    <AgeSearchFields
      dobErrors={dobErrors}
      onBlur={onBlur}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onKeyUp={onKeyUp}
      personSearchFields={personSearchFields}
    />
  )

describe('AgeSearchFields', () => {
  describe('layout', () => {
    describe('when the search by age method is empty string', () => {
      it('does not render date of birth or approximate age fields', () => {
        const component = render({})
        expect(component.find('DateOfBirthDateField').exists()).toBe(false)
        expect(component.find('AgeUnitForm').exists()).toBe(false)
        expect(component.find('ApproximateAgeNumberSelect').exists()).toBe(false)
      })
    })
    describe('when the search by age method is dob', () => {
      let personSearchFields
      let component

      beforeEach(() => {
        personSearchFields = {
          ...defaultPersonSearchFields,
          searchByAgeMethod: 'dob',
          searchDateOfBirth: '2019-03-01',
          dobErrors: [],
        }
        component = render({personSearchFields})
      })

      it('renders the date of birth section only', () => {
        expect(component.find('div.col-md-9.date-of-birth-section').exists()).toBe(true)
        expect(component.find('div.approximate-age-section').exists()).toBe(false)
      })

      it('renders the date of birth field', () => {
        const dateField = component.find('DateOfBirthDateField')
        const props = dateField.props()
        expect(dateField.exists()).toEqual(true)
        expect(props.errors).toEqual([])
        expect(typeof props.onBlur).toEqual('function')
        expect(typeof props.onChange).toEqual('function')
        expect(typeof props.onKeyPress).toEqual('function')
        expect(typeof props.onKeyUp).toEqual('function')
        expect(props.value).toEqual('2019-03-01')
      })
    })

    describe('when the search by age method is approximate', () => {
      let personSearchFields
      let component

      beforeEach(() => {
        personSearchFields = {
          ...defaultPersonSearchFields,
          searchByAgeMethod: 'approximate',
          searchApproximateAge: '120',
          searchApproximateAgeUnits: 'years',
        }
        component = render({personSearchFields})
      })

      it('renders the approximate age section only', () => {
        expect(component.find('div.approximate-age-section').exists()).toBe(true)
        expect(component.find('div.date-of-birth-section').exists()).toBe(false)
      })

      it('renders the AgeUnitForm', () => {
        const ageUnitForm = component.find('AgeUnitForm')
        const props = ageUnitForm.props()
        expect(ageUnitForm.exists()).toEqual(true)
        expect(props.formLabel).toEqual('Unit')
        expect(props.monthsLabel).toEqual('Months')
        expect(props.yearsLabel).toEqual('Years')
        expect(typeof props.onChange).toEqual('function')
        expect(typeof props.onKeyPress).toEqual('function')
        expect(props.searchApproximateAgeUnits).toEqual('years')
      })

      it('renders the ApproximateAgeNumberSelect', () => {
        const approximateAgeSelect = component.find('ApproximateAgeNumberSelect')
        const props = approximateAgeSelect.props()
        expect(approximateAgeSelect.exists()).toEqual(true)
        expect(props.ageUnit).toEqual('years')
        expect(props.gridClassName).toEqual('age-number-field')
        expect(props.id).toEqual('search-approximate-age-number')
        expect(typeof props.onChange).toEqual('function')
        expect(typeof props.onKeyPress).toEqual('function')
        expect(props.value).toEqual('120')
      })
    })
  })
})
