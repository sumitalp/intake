import StateNameSelect from 'common/search/state/StateNameSelect'
import React from 'react'
import {shallow} from 'enzyme'

describe('StateNameSelect', () => {
  const render = ({
    states = [],
    gridClassName,
    id = 'state-select',
    onChange = () => {},
    value = '',
  } = {}) => {
    const props = {
      states,
      gridClassName,
      id,
      onChange,
      value,
    }
    return shallow(<StateNameSelect {...props} />)
  }

  const findField = component =>
    component.find('StateSelect')

  it('displays the select field', () => {
    const component = render()
    expect(findField(component).exists()).toEqual(true)
  })

  it('passes props to the select field', () => {
    const states = [{code: '1', value: 'California'}]
    const component = render({
      gridClassName: 'foo',
      id: 'my-field',
      value: 'California',
      states,
    })

    const field = findField(component)

    expect(field.props().gridClassName).toEqual('foo')
    expect(field.props().id).toEqual('my-field')
    expect(field.props().value).toEqual('California')
    expect(field.props().states).toEqual(states)
  })

  it('calls back with the state name when the selection changes', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})

    findField(component)
      .props()
      .onChange({code: '123', value: 'California'})

    expect(onChange).toHaveBeenCalledWith('searchState', 'California')
  })
})
