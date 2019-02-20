import SexAtBirthSelect from 'common/search/sexatbirth/SexAtBirthSelect'
import React from 'react'
import {shallow} from 'enzyme'

describe('SexAtBirthSelect', () => {
  const render = ({
    gridClassName,
    id = 'gender-select',
    onChange = () => {},
    value = '',
  } = {}) => {
    const props = {
      gridClassName,
      id,
      onChange,
      value,
    }
    return shallow(<SexAtBirthSelect {...props} />)
  }

  const findField = component => component.find('GenderSelect')

  it('displays the select field', () => {
    const component = render()
    expect(findField(component).exists()).toEqual(true)
  })

  it('passes props to the select field', () => {
    const component = render({
      gridClassName: 'foo',
      id: 'my-field',
      value: 'Female',
    })

    const field = findField(component)

    expect(field.props().gridClassName).toEqual('foo')
    expect(field.props().id).toEqual('my-field')
    expect(field.props().value).toEqual('Female')
    expect(field.props().genders).toEqual({
      male: 'Male',
      female: 'Female',
      intersex: 'Intersex',
      unknown: 'Unknown',
    })
  })

  it('calls back with the units when the selection changes', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})

    findField(component)
      .props()
      .onChange({value: 'Female'})

    expect(onChange).toHaveBeenCalledWith({value: 'Female'})
  })
})
