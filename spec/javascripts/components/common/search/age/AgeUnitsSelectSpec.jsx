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

  it('passes id to select field', () => {
    const component = render({
      gridClassName: 'my-class-name',
      id: 'my-id',
    })

    expect(component.find('SelectField').props().id).toEqual('my-id')
  })

  describe('gridClassName', () => {
    describe('passes gridClassName to the select field', () => {
      describe('when the SelectField value is month or year age', () => {
        describe('when the value is month', () => {
          it('does not add placeholder-option-selected to the gridClassName', () => {
            const component = render({
              gridClassName: 'my-class-name',
              id: 'my-id',
              value: 'Months',
            })
            expect(component.find('SelectField').props().gridClassName).toEqual(
              'my-class-name'
            )
          })
        })

        describe('when the value is year', () => {
          it('does not add placeholder-option-selected to the gridClassName', () => {
            const component = render({
              gridClassName: 'my-class-name',
              id: 'my-id',
              value: 'Years',
            })
            expect(component.find('SelectField').props().gridClassName).toEqual(
              'my-class-name'
            )
          })
        })
      })

      describe('when the SelectField value is falsy', () => {
        it('concatenates placeholder-option-selected to the gridClassName', () => {
          const component = render({
            gridClassName: 'my-class-name',
            id: 'my-id',
            value: '',
          })

          expect(component.find('SelectField').props().gridClassName).toEqual(
            'my-class-name placeholder-option-selected'
          )
        })
      })
    })
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
      .onChange({target: {value: 'Years'}})

    expect(onChange).toHaveBeenCalledWith('searchApproximateAgeUnits', 'Years')
  })

  it('calls back with empty string when selection changes to unknown value', () => {
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

    expect(onChange).toHaveBeenCalledWith('searchApproximateAgeUnits', '')
  })

  it('sets Select Field disabled prop to true', () => {
    const component = render({})
    expect(component.find('SelectField').props().disabled).toEqual(true)
  })
})
