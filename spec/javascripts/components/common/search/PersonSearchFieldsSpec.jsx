import React from 'react'
import PersonSearchFields from 'common/search/PersonSearchFields'
import {shallow} from 'enzyme'

describe('PersonSearchFields', () => {
  const render = ({
    onBlur = () => {},
    onChange = () => {},
    onCancel = () => {},
    onClear = () => {},
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
        onClear={onClear}
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

    it('renders a PersonSearchNumbersAgeGroup component with onKeyPress and onKeyUp props', () => {
      expect(component.find('PersonSearchNumbersAgeGroup').exists()).toBe(true)
      expect(typeof component.find('PersonSearchNumbersAgeGroup').props().onKeyPress).toEqual('function')
      expect(typeof component.find('PersonSearchNumbersAgeGroup').props().onKeyUp).toEqual('function')
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

    it('renders a PersonSearchNameGroup component', () => {
      expect(component.find('PersonSearchNameGroup').exists()).toBe(false)
    })

    it('renders a PersonSearchAgeGenderGroup component', () => {
      expect(component.find('PersonSearchAgeGenderGroup').exists()).toBe(false)
    })

    it('renders a PersonSearchLocationGroup component', () => {
      expect(component.find('PersonSearchLocationGroup').exists()).toBe(false)
    })

    it('renders a PersonSearchButtonGroup component', () => {
      expect(component.find('PersonSearchButtonGroup').exists()).toBe(false)
    })
  })
})
