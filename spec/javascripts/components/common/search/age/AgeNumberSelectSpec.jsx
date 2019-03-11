import AgeNumberSelect from 'common/search/age/AgeNumberSelect'
import React from 'react'
import {shallow} from 'enzyme'

const render = ({
  id = 'search-approximate-age-number',
  gridClassName = 'age-number-field',
  value = '',
  onChange = () => {},
}) => {
  const props = {
    id,
    gridClassName,
    value,
    onChange,
  }
  return shallow(<AgeNumberSelect {...props} />)
}

describe('AgeNumberSelect', () => {
  let component
  let selectField

  beforeEach(() => {
    component = render({})
    selectField = component.find('SelectField')
  })

  describe('layout', () => {
    it('renders the select field', () => {
      expect(selectField.exists()).toEqual(true)
      expect(selectField.find('option[value=""]').exists()).toEqual(true)
    })

    it('sets select field props', () => {
      expect(selectField.props().id).toEqual('search-approximate-age-number')
      expect(selectField.props().gridClassName).toEqual('age-number-field')
      expect(selectField.props().label).toEqual('Number')
      expect(typeof selectField.props().onChange).toEqual('function')
      expect(selectField.props().value).toEqual('')
      expect(selectField.props().disabled).toEqual(true)
    })
  })
})
