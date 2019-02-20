import SuffixSelect from 'common/search/suffix/SuffixSelect'
import React from 'react'
import {shallow} from 'enzyme'

describe('SuffixSelect', () => {
  function render({
    suffixes = {},
    gridClassName = 'gridClassName',
    id = 'suffix-select',
    onChange = () => null,
    value = null,
  }) {
    const props = {
      suffixes,
      gridClassName,
      id,
      onChange,
      value,
    }
    return shallow(<SuffixSelect {...props} />)
  }

  it('displays the select field', () => {
    const component = render({
      suffixes: {
        jr: 'Jr',
        sr: 'Sr',
      },
    })
    expect(component.find('option[value="Jr"]').text()).toEqual('Jr')
  })

  it('selects the value passed in', () => {
    const component = render({
      suffixes: {
        jr: 'Jr',
        sr: 'Sr',
      },
      value: 'Sr',
    })
    expect(component.find('SelectField').props().value).toEqual('Sr')
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

  it('calls back with the suffix value when selection changes', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({
      suffixes: {
        jr: 'Jr',
        sr: 'Sr',
      },
      onChange,
      value: 'Sr',
    })

    component
      .find('SelectField')
      .props()
      .onChange({target: {value: 'Jr'}})

    expect(onChange).toHaveBeenCalledWith('searchSuffix', 'Jr')
  })

  it('calls back with null when selection changes to unknown value', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({
      suffixes: {
        jr: 'Jr',
        sr: 'Sr',
      },
      onChange,
      value: 'Months',
    })

    component
      .find('SelectField')
      .props()
      .onChange({target: {value: 'X'}})

    expect(onChange).toHaveBeenCalledWith('searchSuffix', '')
  })
})
