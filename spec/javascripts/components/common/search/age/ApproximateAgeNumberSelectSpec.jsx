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
      it('sets the correct range object for "months" age unit', () => {
        const component = render ({ageUnit: 'months'})
        const numberSelect = component.find('AgeNumberSelect')
        expect(numberSelect.props().range).toEqual({min: 0, max: 24})
      })

      it('sets the correct range object for "years" age unit', () => {
        const component = render ({ageUnit: 'years'})
        const numberSelect = component.find('AgeNumberSelect')
        expect(numberSelect.props().range).toEqual({min: 0, max: 120})
      })
    })
  })
})
