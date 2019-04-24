import React from 'react'
import PersonSearchFields from 'common/search/PersonSearchFields'
import {shallow} from 'enzyme'

describe('PersonSearchFields', () => {
  const render = ({
    onBlur = () => {},
    onChange = () => {},
    onCancel = () => {},
    onSubmit = () => {},
    onKeyPress = () => {},
    onKeyUp = () => {},
    ...props
  } = {}) =>
    shallow(
      <PersonSearchFields
        onBlur={onBlur}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
        {...props}
      />
    )

  describe('isAdvancedSearchOn feature toggle is On', () => {
    let component
    beforeEach(() => {
      component = render({isAdvancedSearchOn: true})
    })

    it('renders a PersonSearchNameGroup component', () => {
      expect(component.find('PersonSearchNameGroup').exists()).toBe(true)
    })

    it('renders a PersonSearchAgeGenderNumbersGroup component with onKeyPress and onKeyUp props', () => {
      expect(component.find('PersonSearchAgeGenderNumbersGroup').exists()).toBe(true)
      expect(typeof component.find('PersonSearchAgeGenderNumbersGroup').props().onKeyPress).toEqual('function')
      expect(typeof component.find('PersonSearchAgeGenderNumbersGroup').props().onKeyUp).toEqual('function')
    })

    it('renders a PersonSearchButtonGroup component', () => {
      expect(component.find('PersonSearchButtonGroup').exists()).toBe(true)
    })
  })

  describe('isAdvancedSearchOn feature toggle is Off', () => {
    let component
    beforeEach(() => {
      component = render({isAdvancedSearchOn: false})
    })

    it('does not render a PersonSearchNameGroup component', () => {
      expect(component.find('PersonSearchNameGroup').exists()).toBe(false)
    })

    it('does not render a PersonSearchAgeGenderNumbersGroup component', () => {
      expect(component.find('PersonSearchAgeGenderNumbersGroup').exists()).toBe(false)
    })

    it('does not render a PersonSearchButtonGroup component', () => {
      expect(component.find('PersonSearchButtonGroup').exists()).toBe(false)
    })
  })
})
