import SuffixNameSelect from 'common/search/suffix/SuffixNameSelect'
import React from 'react'
import {shallow} from 'enzyme'

describe('SuffixNameSelect', () => {
  const render = ({
    gridClassName,
    id = 'suffix-select',
    onChange = () => {},
    value = '',
  } = {}) => {
    const props = {
      gridClassName,
      id,
      onChange,
      value,
    }
    return shallow(<SuffixNameSelect {...props} />)
  }

  const findField = component => component.find('SuffixSelect')

  it('displays the select field', () => {
    const component = render()
    expect(findField(component).exists()).toEqual(true)
  })

  it('passes props to the select field', () => {
    const component = render({
      gridClassName: 'foo',
      id: 'my-field',
      value: 'Jr',
    })

    const field = findField(component)

    expect(field.props().gridClassName).toEqual('foo')
    expect(field.props().id).toEqual('my-field')
    expect(field.props().value).toEqual('Jr')
    expect(field.props().suffixes).toEqual({
      2: 'II',
      3: 'III',
      4: 'IV',
      5: 'V',
      jr: 'Jr',
      sr: 'Sr',
    })
  })

  it('calls back with the units when the selection changes', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})

    findField(component)
      .props()
      .onChange({value: 'Jr'})

    expect(onChange).toHaveBeenCalledWith({value: 'Jr'})
  })
})
