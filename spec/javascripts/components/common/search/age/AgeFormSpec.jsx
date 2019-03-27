import React from 'react'
import {shallow} from 'enzyme'
import AgeForm from 'common/search/age/AgeForm'

const render = (onChange = () => {}) => {
  const props = {
    dateOfBirthLabel: 'Date of Birth',
    approximateAgeLabel: 'Approximate Age',
    onChange,
  }

  return shallow(<AgeForm {...props} />)
}

describe('AgeForm', () => {
  describe('layout', () => {
    it('renders a form with props', () => {
      const component = render()
      const form = component.find('form')
      expect(form.exists()).toBe(true)
      expect(form.props().className).toEqual('client-age-form')
      expect(form.props().name).toEqual('client-age-form')
    })

    it('renders div.client-age-selector.date-of-birth', () => {
      const component = render()
      const selector = component.find('div.client-age-selector.date-of-birth')
      expect(selector.exists()).toEqual(true)
    })

    it('renders div.client-age-selector.approximate-age', () => {
      const component = render()
      const selector = component.find('div.client-age-selector.approximate-age')
      expect(selector.exists()).toEqual(true)
    })

    describe('date of birth', () => {
      it('renders a radio button with props', () => {
        const component = render()
        const radioButton = component.find('input#date-of-birth')
        expect(radioButton.exists()).toBe(true)
        expect(radioButton.props().type).toEqual('radio')
        expect(radioButton.props().name).toEqual('age')
        expect(radioButton.props().id).toEqual('date-of-birth')
        expect(radioButton.props().value).toEqual('dateOfBirth')
      })

      it('renders a label for the radio button', () => {
        const component = render()
        const label = component.find('label[htmlFor="date-of-birth"]')
        expect(label.exists()).toEqual(true)
        expect(label.text()).toEqual('Date of Birth')
      })
    })

    describe('approximate age', () => {
      it('renders a radio button with props', () => {
        const component = render()
        const radioButton = component.find('input#approximate-age')
        expect(radioButton.exists()).toEqual(true)
        expect(radioButton.props().type).toEqual('radio')
        expect(radioButton.props().name).toEqual('age')
        expect(radioButton.props().id).toEqual('approximate-age')
        expect(radioButton.props().value).toEqual('approximateAge')
      })

      it('renders a label for the radio button', () => {
        const component = render()
        const label = component.find('label[htmlFor="approximate-age"]')
        expect(label.exists()).toEqual(true)
        expect(label.text()).toEqual('Approximate Age')
      })
    })
  })

  describe('radio buttons', () => {
    describe('date of birth radio button', () => {
      describe('onClick', () => {
        it('calls onChange to store the selection', () => {
          const onChange = jasmine.createSpy('onChange')
          const component = render(onChange)
          const radioButton = component.find('input#date-of-birth')
          const target = {target: {value: 'dateOfBirth'}}
          radioButton.props().onClick(target)
          expect(onChange).toHaveBeenCalledWith('searchByAgeMethod', 'dateOfBirth')
        })
      })
    })

    describe('approximate age radio button', () => {
      describe('onClick', () => {
        it('calls onChange to store the selection', () => {
          const onChange = jasmine.createSpy('onChange')
          const component = render(onChange)
          const radioButton = component.find('input#approximate-age')
          const target = {target: {value: 'approximateAge'}}
          radioButton.props().onClick(target)
          expect(onChange).toHaveBeenCalledWith('searchByAgeMethod', 'approximateAge')
        })
      })
    })
  })
})
