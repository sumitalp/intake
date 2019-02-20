import ApproximateAgeUnitsSelect from 'common/search/age/ApproximateAgeUnitsSelect'
import React from 'react'
import {shallow} from 'enzyme'

describe('ApproximateAgeUnitsSelect', () => {
  const render = ({
    gridClassName,
    id = 'age-units-select',
    onChange = () => {},
    value = '',
  } = {}) => {
    const props = {
      gridClassName,
      id,
      onChange,
      value,
    }
    return shallow(<ApproximateAgeUnitsSelect {...props} />)
  }

  const findField = component => component.find('AgeUnitsSelect')

  it('displays the select field', () => {
    const component = render()
    expect(findField(component).exists()).toEqual(true)
  })

  it('passes props to the select field', () => {
    const component = render({
      gridClassName: 'foo',
      id: 'my-field',
      value: 'hello',
    })

    const field = findField(component)

    expect(field.props().gridClassName).toEqual('foo')
    expect(field.props().id).toEqual('my-field')
    expect(field.props().value).toEqual('hello')
    expect(field.props().units).toEqual({
      months: 'Months',
      years: 'Years',
    })
  })

  it('calls back with the units when the selection changes', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})

    findField(component)
      .props()
      .onChange({value: 'Months'})

    expect(onChange).toHaveBeenCalledWith({value: 'Months'})
  })
})
