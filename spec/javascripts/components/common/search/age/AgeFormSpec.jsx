import React from 'react'
import {shallow} from 'enzyme'
import AgeForm from 'common/search/age/AgeForm'

const render = () => {
  const props = {
    dateOfBirthLabel: 'Date of Birth',
    approximateAgeLabel: 'Approximate Age',
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

    it('renders two columns', () => {
      const component = render()
      const columns = component.find('.col-md-6')
      expect(columns.length).toEqual(2)
    })

    describe('date of birth', () => {
      it('renders a radio button with props', () => {
        const component = render()
        const radioButton = component.find('input#date-of-birth')
        expect(radioButton.exists()).toBe(true)
        expect(radioButton.props().type).toEqual('radio')
        expect(radioButton.props().name).toEqual('age')
        expect(radioButton.props().id).toEqual('date-of-birth')
        expect(radioButton.props().value).toEqual('date-of-birth')
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
        expect(radioButton.props().value).toEqual('approximate-age')
        expect(radioButton.props().disabled).toEqual(true)
      })

      it('renders a label for the radio button', () => {
        const component = render()
        const label = component.find('label[htmlFor="approximate-age"]')
        expect(label.exists()).toEqual(true)
        expect(label.text()).toEqual('Approximate Age')
      })
    })
  })
})
