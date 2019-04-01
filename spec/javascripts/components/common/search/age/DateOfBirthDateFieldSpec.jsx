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
    it('renders a div with props', () => {
      const component = render({})
      const dateFieldParent = component.find('div')
      expect(dateFieldParent.exists()).toBe(true)
      expect(typeof dateFieldParent.props().onClick).toEqual('function')
      expect(dateFieldParent.props().role).toEqual('presentation')
    })

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

    describe('when the value is "dob"', () => {
      it('does not disable the date field', () => {
        const component = render({searchByAgeMethod: 'dob'})
        const dateField = component.find('DateField')
        expect(dateField.props().disabled).toEqual(false)
      })
    })

    describe('when the value is not empty string or "dob"', () => {
      it('does not disable the date field', () => {
        const component = render({searchByAgeMethod: 'approximate'})
        const dateField = component.find('DateField')
        expect(dateField.props().disabled).toEqual(true)
      })
    })
  })

  describe('event handler', () => {
    describe('onClick', () => {
      describe('when the date field parent is clicked', () => {
        it('onChange sets the search by age method to dob', () => {
          const onChange = jasmine.createSpy('onChange')
          const component = render({onChange})
          const dateFieldParent = component.find('div')
          dateFieldParent.props().onClick()
          expect(onChange).toHaveBeenCalledWith('searchByAgeMethod', 'dob')
        })
      })
    })
  })
})
