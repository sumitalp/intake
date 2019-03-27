import React from 'react'
import {shallow} from 'enzyme'
import DateOfBirthDateField from 'common/search/age/DateOfBirthDateField'

const render = ({value = '', onChange = () => {}, searchByAgeMethod = ''}) =>
  shallow(
    <DateOfBirthDateField
      onChange={onChange}
      value={value}
      searchByAgeMethod={searchByAgeMethod}
    />
  )

describe('DateOfBirthDateField', () => {
  describe('layout', () => {
    it('renders a DateField', () => {
      const component = render({value: '2019-03-01'})
      const dateField = component.find('DateField')
      expect(dateField.exists()).toEqual(true)
      expect(dateField.props().id).toEqual('search-date-of-birth')
      expect(dateField.props().gridClassName).toEqual('date-field')
      expect(dateField.props().label).toEqual('Date')
      expect(dateField.props().value).toEqual('2019-03-01')
      expect(typeof dateField.props().onChange).toEqual('function')
      expect(dateField.props().hasTime).toEqual(false)
      expect(dateField.props().disabled).toEqual(false)
    })
  })

  describe('searchByAgeMethod', () => {
    describe('when the value is empty string', () => {
      it('does not disable the date field', () => {
        const component = render({searchByAgeMethod: ''})
        const dateField = component.find('DateField')
        expect(dateField.props().disabled).toEqual(false)
      })
    })

    describe('when the value is "dateOfBirth"', () => {
      it('does not disable the date field', () => {
        const component = render({searchByAgeMethod: 'dateOfBirth'})
        const dateField = component.find('DateField')
        expect(dateField.props().disabled).toEqual(false)
      })
    })

    describe('when the value is not empty string or "dateOfBirth"', () => {
      it('does not disable the date field', () => {
        const component = render({searchByAgeMethod: 'approximateAge'})
        const dateField = component.find('DateField')
        expect(dateField.props().disabled).toEqual(true)
      })
    })
  })
})
