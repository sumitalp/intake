import React from 'react'
import PersonSearchFields from 'common/search/PersonSearchFields'
import {shallow} from 'enzyme'

describe('PersonSearchFields', () => {
  const render = ({
    states = [],
    counties = [],
    onChange = () => {},
    onCancel = () => {},
    onSubmit = () => {},
    ...props
  } = {}) =>
    shallow(
      <PersonSearchFields
        states={states}
        counties={counties}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
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

    it('renders a PersonSearchNumbersAgeGroup component', () => {
      expect(component.find('PersonSearchNumbersAgeGroup').exists()).toBe(true)
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
