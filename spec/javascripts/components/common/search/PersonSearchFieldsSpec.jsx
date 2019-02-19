import React from 'react'
import PersonSearchFields from 'common/search/PersonSearchFields'
import {shallow} from 'enzyme'

describe('PersonSearchFields', () => {
  const render = ({
    onChange = () => {},
    onCancel = () => {},
    onSubmit = () => {},
    ...props
  } = {}) =>
    shallow(
      <PersonSearchFields
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        {...props}
      />
    )

  it('renders a PersonSearchNameGroup component', () => {
    const component = render()
    expect(component.find('PersonSearchNameGroup').exists()).toBe(true)
  })

  it('renders a PersonSearchAgeGenderGroup component', () => {
    const component = render()
    expect(component.find('PersonSearchAgeGenderGroup').exists()).toBe(true)
  })

  it('renders a PersonSearchLocationGroup component', () => {
    const component = render()
    expect(component.find('PersonSearchLocationGroup').exists()).toBe(true)
  })

  it('renders a PersonSearchButtonGroup component', () => {
    const component = render()
    expect(component.find('PersonSearchButtonGroup').exists()).toBe(true)
  })
})
