import StateSelect from 'common/search/state/StateSelect'
import React from 'react'
import {shallow} from 'enzyme'

describe('StateSelect', () => {
  function render({
    states = [],
    gridClassName = 'gridClassName',
    id = 'state-select',
    onChange = () => null,
    value = null,
  }) {
    const props = {
      states,
      gridClassName,
      id,
      onChange,
      value,
    }
    return shallow(<StateSelect {...props} />)
  }

  it('displays the select field', () => {
    const component = render({
      states: [
        {code: '123', value: 'California'},
        {code: '456', value: 'Nevada'},
      ],
    })
    expect(component.find('option[value="California"]').text()).toEqual(
      'California'
    )
  })

  it('selects the value passed in', () => {
    const component = render({
      states: [
        {code: '123', value: 'California'},
        {code: '456', value: 'Nevada'},
      ],
      value: 'Nevada',
    })
    expect(component.find('SelectField').props().value).toEqual('Nevada')
  })

  it('passes id, and gridClassName to select field', () => {
    const component = render({
      gridClassName: 'my-class-name',
      id: 'my-id',
    })
    expect(component.find('SelectField').props().gridClassName).toEqual(
      'my-class-name'
    )
    expect(component.find('SelectField').props().id).toEqual('my-id')
  })

  it('calls back with the full system code when selection changes', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({
      states: [
        {code: '123', value: 'California'},
        {code: '456', value: 'Nevada'},
      ],
      onChange,
      value: 'California',
    })

    component
      .find('SelectField')
      .props()
      .onChange({target: {value: 'Nevada'}})

    expect(onChange).toHaveBeenCalledWith({
      code: '456',
      value: 'Nevada',
    })
  })

  it('calls back with the null when selection changes to unknown code', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({
      states: [
        {code: '123', value: 'California'},
        {code: '456', value: 'Nevada'},
      ],
      onChange,
      value: 'California',
    })

    component
      .find('SelectField')
      .props()
      .onChange({target: {value: 'Merrimack'}})

    expect(onChange).toHaveBeenCalledWith(null)
  })
})
