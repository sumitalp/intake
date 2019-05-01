import React from 'react'
import {shallow} from 'enzyme'
import DateOfBirthDateField from 'common/search/age/DateOfBirthDateField'

const render = (
  {
    value = '',
    onBlur = () => {},
    onChange = () => {},
    onKeyPress = () => {},
    onKeyUp = () => {},
    errors = [],
  }) =>
  shallow(
    <DateOfBirthDateField
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      errors={errors}
      onKeyPress={onKeyPress}
      onKeyUp={onKeyUp}
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
      expect(typeof dateField.props().onBlur).toEqual('function')
      expect(typeof dateField.props().onChange).toEqual('function')
      expect(dateField.props().hasTime).toEqual(false)
      expect(dateField.props().errors).toEqual([])
      expect(typeof dateField.props().onKeyPress).toEqual('function')
      expect(typeof dateField.props().onKeyUp).toEqual('function')
    })

    describe('errors', () => {
      it('displays error messages if dobErrors are present', () => {
        const dobErrors = [
          'Please enter date as today or earlier.',
        ]
        const component = render({errors: dobErrors})
        const dateField = component.find('DateField[label="Date"]')
        expect(dateField.props().errors).toEqual(dobErrors)
      })

      it('does not display error messages if dobErrors are not present', () => {
        const component = render({})
        const dateField = component.find('DateField[label="Date"]')
        expect(dateField.props().errors).toEqual([])
      })

      it('does not display error messages if dobErrors is undefined', () => {
        const component = render({errors: undefined})
        const dateField = component.find('DateField[label="Date"]')
        expect(dateField.props().errors).toEqual([])
      })
    })

    describe('when field is blurred', () => {
      it('calls onBlur to set dobErrorCheck to true', () => {
        const onBlur = jasmine.createSpy('onBlur')
        const component = render({onBlur})
        const dateField = component.find('DateField[label="Date"]')
        dateField.props().onBlur()
        expect(onBlur).toHaveBeenCalledWith('dobErrorCheck')
      })
    })
  })
})
