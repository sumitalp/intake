import React from 'react'
import {shallow} from 'enzyme'
import AgeUnitForm from 'common/search/age/AgeUnitForm'

const render = ({onChange = () => {}, searchApproximateAgeUnits = '', searchByAgeMethod = ''}) => {
  const props = {
    formLabel: 'Unit',
    monthsLabel: 'Months',
    yearsLabel: 'Years',
    onChange,
    searchApproximateAgeUnits,
    searchByAgeMethod,
  }

  return shallow(<AgeUnitForm {...props} />)
}

describe('AgeUnitForm', () => {
  describe('layout', () => {
    it('renders a label for the form', () => {
      const component = render({})
      const formLabel = component.find('label[htmlFor="age-unit-form"]')
      expect(formLabel.exists()).toEqual(true)
      expect(formLabel.text()).toEqual('Unit')
    })

    it('renders a form with props', () => {
      const component = render({})
      const form = component.find('form')
      expect(form.exists()).toBe(true)
      expect(form.props().className).toEqual('age-unit-form')
      expect(form.props().name).toEqual('age-unit-form')
    })

    it('renders two rows', () => {
      const component = render({})
      const columns = component.find('div')
      expect(columns.length).toEqual(2)
    })

    describe('months', () => {
      it('renders a radio button with props', () => {
        const component = render({})
        const radioButton = component.find('input#age-unit-months')
        expect(radioButton.exists()).toBe(true)
        expect(radioButton.props().type).toEqual('radio')
        expect(radioButton.props().name).toEqual('age-unit')
        expect(radioButton.props().id).toEqual('age-unit-months')
        expect(radioButton.props().value).toEqual('months')
        expect(typeof radioButton.props().onClick).toEqual('function')
        expect(radioButton.props().disabled).toEqual(false)
        expect(radioButton.props().checked).toEqual(false)
      })

      it('renders a label for the radio button', () => {
        const component = render({})
        const label = component.find('label[htmlFor="age-unit-months"]')
        expect(label.exists()).toEqual(true)
        expect(label.text()).toEqual('Months')
      })
    })

    describe('years', () => {
      it('renders a radio button with props', () => {
        const component = render({})
        const radioButton = component.find('input#age-unit-years')
        expect(radioButton.exists()).toEqual(true)
        expect(radioButton.props().type).toEqual('radio')
        expect(radioButton.props().name).toEqual('age-unit')
        expect(radioButton.props().id).toEqual('age-unit-years')
        expect(radioButton.props().value).toEqual('years')
        expect(typeof radioButton.props().onClick).toEqual('function')
        expect(radioButton.props().disabled).toEqual(false)
        expect(radioButton.props().checked).toEqual(false)
      })

      it('renders a label for the radio button', () => {
        const component = render({})
        const label = component.find('label[htmlFor="age-unit-years"]')
        expect(label.exists()).toEqual(true)
        expect(label.text()).toEqual('Years')
      })
    })

    describe('radio buttons', () => {
      describe('months radio button', () => {
        describe('is checked', () => {
          it('when the age units value equals the radio value', () => {
            const component = render({searchApproximateAgeUnits: 'months'})
            const radioButton = component.find('input#age-unit-months')
            expect(radioButton.props().checked).toEqual(true)
          })
        })

        describe('is not checked', () => {
          it('when the age units value does not equal the radio value', () => {
            const component = render({searchApproximateAgeUnits: 'years'})
            const radioButton = component.find('input#age-unit-months')
            expect(radioButton.props().checked).toEqual(false)
          })
        })

        describe('onClick', () => {
          describe('when the radio button has not been selected', () => {
            it('calls onChange to store the age units and reset approximate age', () => {
              const onChange = jasmine.createSpy('onChange')
              const component = render({onChange, searchApproximateAgeUnits: 'years'})
              const radioButton = component.find('input#age-unit-months')
              const target = {target: {value: 'months'}}
              radioButton.props().onClick(target)
              expect(onChange).toHaveBeenCalledWith('searchByAgeMethod', 'approximate')
              expect(onChange).toHaveBeenCalledWith('searchApproximateAgeUnits', 'months')
              expect(onChange).toHaveBeenCalledWith('searchApproximateAge', '')
              expect(onChange).toHaveBeenCalledTimes(3)
            })
          })

          describe('when the radio button is currently selected', () => {
            it('calls onChange to set search by age method', () => {
              const onChange = jasmine.createSpy('onChange')
              const component = render({onChange, searchApproximateAgeUnits: 'months'})
              const radioButton = component.find('input#age-unit-months')
              const target = {target: {value: 'months'}}
              radioButton.props().onClick(target)
              expect(onChange).toHaveBeenCalledWith('searchByAgeMethod', 'approximate')
              expect(onChange).toHaveBeenCalledTimes(1)
            })
          })
        })
      })

      describe('years radio button', () => {
        describe('is checked', () => {
          it('when the age units value equals the radio value', () => {
            const component = render({searchApproximateAgeUnits: 'years'})
            const radioButton = component.find('input#age-unit-years')
            expect(radioButton.props().checked).toEqual(true)
          })
        })

        describe('is not checked', () => {
          it('when the age units value does not equal the radio value', () => {
            const component = render({searchApproximateAgeUnits: 'months'})
            const radioButton = component.find('input#age-unit-years')
            expect(radioButton.props().checked).toEqual(false)
          })
        })

        describe('onClick', () => {
          describe('when the radio button has not been selected', () => {
            it('calls onChange to store the age units and reset approximate age', () => {
              const onChange = jasmine.createSpy('onChange')
              const component = render({onChange, searchApproximateAgeUnits: 'months'})
              const radioButton = component.find('input#age-unit-years')
              const target = {target: {value: 'years'}}
              radioButton.props().onClick(target)
              expect(onChange).toHaveBeenCalledWith('searchByAgeMethod', 'approximate')
              expect(onChange).toHaveBeenCalledWith('searchApproximateAgeUnits', 'years')
              expect(onChange).toHaveBeenCalledWith('searchApproximateAge', '')
              expect(onChange).toHaveBeenCalledTimes(3)
            })
          })

          describe('when the radio button is currently selected', () => {
            it('calls onChange to set search by age method', () => {
              const onChange = jasmine.createSpy('onChange')
              const component = render({onChange, searchApproximateAgeUnits: 'years'})
              const radioButton = component.find('input#age-unit-years')
              const target = {target: {value: 'years'}}
              radioButton.props().onClick(target)
              expect(onChange).toHaveBeenCalledWith('searchByAgeMethod', 'approximate')
              expect(onChange).toHaveBeenCalledTimes(1)
            })
          })
        })
      })
    })
  })

  describe('searchByAgeMethod', () => {
    describe('when the value is empty string', () => {
      it('does not disable the radio buttons', () => {
        const component = render({searchByAgeMethod: ''})
        const radioButtonMonths = component.find('input#age-unit-months')
        const radioButtonYears = component.find('input#age-unit-years')
        expect(radioButtonMonths.props().disabled).toEqual(false)
        expect(radioButtonYears.props().disabled).toEqual(false)
      })
    })

    describe('when the value is "approximate"', () => {
      it('does not disable the radio buttons', () => {
        const component = render({searchByAgeMethod: 'approximate'})
        const radioButtonMonths = component.find('input#age-unit-months')
        const radioButtonYears = component.find('input#age-unit-years')
        expect(radioButtonMonths.props().disabled).toEqual(false)
        expect(radioButtonYears.props().disabled).toEqual(false)
      })
    })

    describe('when the value is not empty string or "approximate"', () => {
      it('does not disable the radio buttons', () => {
        const component = render({searchByAgeMethod: 'dob'})
        const radioButtonMonths = component.find('input#age-unit-months')
        const radioButtonYears = component.find('input#age-unit-years')
        expect(radioButtonMonths.props().disabled).toEqual(true)
        expect(radioButtonYears.props().disabled).toEqual(true)
        expect(radioButtonYears.props().value).toEqual('')
      })
    })
  })
})
