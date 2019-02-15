import AgeUnitsSelect from 'common/search/age/AgeUnitsSelect'
import React from 'react'
import {shallow} from 'enzyme'

describe('AgeUnitsSelect', () => {
  function render({
    units = {},
    gridClassName = 'gridClassName',
    id = 'age-units-select',
    onChange = () => null,
    value = null,
  }) {
    const props = {
      units,
      gridClassName,
      id,
      onChange,
      value,
    }
    return shallow(<AgeUnitsSelect {...props} />)
  }

  it('displays the select field', () => {
    const component = render({
      units: {
        months: 'Months',
        years: 'Years',
      },
    })
    expect(component.find('option[value="Months"]').text()).toEqual('Months')
  })

  it('selects the value passed in', () => {
    const component = render({
      units: {
        months: 'Months',
        years: 'Years',
      },
      value: 'Years',
    })
    expect(component.find('SelectField').props().value).toEqual('Years')
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

  it('calls back with the age units value when selection changes', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({
      units: {
        months: 'Months',
        years: 'Years',
      },
      onChange,
      value: 'Months',
    })

    component
      .find('SelectField')
      .props()
      .onChange({target: {value: 'Years'}}, 'approximateageunits')

    expect(onChange).toHaveBeenCalledWith('Years', 'approximateageunits')
  })

  it('calls back with null when selection changes to unknown value', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({
      units: {
        months: 'Months',
        years: 'Years',
      },
      onChange,
      value: 'Months',
    })

    component
      .find('SelectField')
      .props()
      .onChange({target: {value: 'Days'}}, 'approximateageunits')

    expect(onChange).toHaveBeenCalledWith(null, 'approximateageunits')
  })
})
