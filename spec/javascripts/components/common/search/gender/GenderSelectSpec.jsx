import GenderSelect from 'common/search/gender/GenderSelect'
import React from 'react'
import {shallow} from 'enzyme'

describe('GenderSelect', () => {
  function render({
    genders = {},
    gridClassName = 'gridClassName',
    id = 'gender-select',
    onChange = () => null,
    value = null,
  }) {
    const props = {
      genders,
      gridClassName,
      id,
      onChange,
      value,
    }
    return shallow(<GenderSelect {...props} />)
  }

  it('displays the select field', () => {
    const component = render({
      genders: {
        male: 'Male',
        female: 'Female',
        intersex: 'Intersex',
        unknown: 'Unknown',
      },
    })
    expect(component.find('option[value="Female"]').text()).toEqual('Female')
  })

  it('selects the value passed in', () => {
    const component = render({
      genders: {
        male: 'Male',
        female: 'Female',
        intersex: 'Intersex',
        unknown: 'Unknown',
      },
      value: 'Male',
    })
    expect(component.find('SelectField').props().value).toEqual('Male')
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

  it('calls back with the gender value when selection changes', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({
      genders: {
        male: 'Male',
        female: 'Female',
        intersex: 'Intersex',
        unknown: 'Unknown',
      },
      onChange,
      value: 'Unknown',
    })

    component
      .find('SelectField')
      .props()
      .onChange({target: {value: 'Female'}}, 'genderatbirth')

    expect(onChange).toHaveBeenCalledWith('Female', 'genderatbirth')
  })

  it('calls back with null when the selection changes to unknown value', () => {
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
      .onChange({target: {value: 'Days'}})

    expect(onChange).toHaveBeenCalledWith(null, 'genderatbirth')
  })
})
