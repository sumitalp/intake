import StateNameSelect from 'common/search/state/StateNameSelect'
import React from 'react'
import {shallow} from 'enzyme'

describe('StateNameSelect', () => {
  const render = ({
    gridClassName,
    id = 'state-select',
    onChange = () => {},
    value = '',
  } = {}) => {
    const props = {
      gridClassName,
      id,
      onChange,
      value,
    }
    return shallow(<StateNameSelect {...props} />)
  }

  const findField = component =>
    component.find('Connect(StatesInjector) StateSelect')

  it('displays the select field with states injected', () => {
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
  })

  it('calls back with the state name when the selection changes', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})

    findField(component)
      .props()
      .onChange({code: '123', value: 'California'}, 'state')

    expect(onChange).toHaveBeenCalledWith('California', 'state')
  })
})
