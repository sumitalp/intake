import React from 'react'
import {shallow} from 'enzyme'
import ApproximateAgeNumberSelect from 'common/search/age/ApproximateAgeNumberSelect'

const render = ({
  ageUnit = '',
  id = 'search-approximate-age-number',
  gridClassName = 'age-number-field',
  onChange = () => {},
  value = '',
}) => {
  const props = {
    ageUnit,
    id,
    gridClassName,
    onChange,
    value,
  }

  return shallow(<ApproximateAgeNumberSelect {...props} />)
}

describe('ApproximateAgeNumberSelect', () => {
  describe('layout', () => {
    let component
    let numberSelect

    beforeEach(() => {
      component = render({ageUnit: 'months'})
      numberSelect = component.find('AgeNumberSelect')
    })

    it('renders AgeNumberSelect', () => {
      expect(numberSelect.exists()).toEqual(true)
    })

    it('sets props on AgeNumberSelect', () => {
      expect(numberSelect.props().id).toEqual('search-approximate-age-number')
      expect(numberSelect.props().gridClassName).toEqual('age-number-field')
      expect(typeof numberSelect.props().onChange).toEqual('function')
      expect(numberSelect.props().value).toEqual('')
    })

    describe('range prop for AgeNumberSelect', () => {
      describe('when the ageUnit is "months"', () => {
        it('sets the range props to the correct range object', () => {
          const component = render({ageUnit: 'months'})
          const numberSelect = component.find('AgeNumberSelect')
          expect(numberSelect.props().range).toEqual({min: 0, max: 24})
        })
      })

      describe('when the ageUnit is "years', () => {
        it('sets the range prop to the correct range object', () => {
          const component = render({ageUnit: 'years'})
          const numberSelect = component.find('AgeNumberSelect')
          expect(numberSelect.props().range).toEqual({min: 0, max: 120})
        })
      })

      describe('when the ageUnit has not been selected', () => {
        it('sets the range prop to an empty object ', () => {
          const component = render({ageUnit: ''})
          const numberSelect = component.find('AgeNumberSelect')
          expect(numberSelect.props().range).toEqual({})
        })
      })
    })
  })
})
