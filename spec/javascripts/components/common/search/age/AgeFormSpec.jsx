import React from 'react'
import {shallow} from 'enzyme'
import AgeForm from 'common/search/age/AgeForm'

const render = (
  {
    onChange = () => {},
    onKeyPress = () => {},
    searchByAgeMethod = '',
  } = {},
) => {
  const props = {
    dateOfBirthLabel: 'Date of Birth',
    approximateAgeLabel: 'Approximate Age',
    onChange,
    searchByAgeMethod,
    onKeyPress,
  }

  return shallow(<AgeForm {...props} />)
}

describe('AgeForm', () => {
  describe('layout', () => {
    it('renders a form with props', () => {
      const component = render({})
      const form = component.find('form')
      expect(form.exists()).toBe(true)
      expect(form.props().className).toEqual('client-age-form')
      expect(form.props().name).toEqual('client-age-form')
    })

    it('renders div.client-age-selector.date-of-birth', () => {
      const component = render({})
      const selector = component.find('div.client-age-selector.date-of-birth')
      expect(selector.exists()).toEqual(true)
    })

    it('renders div.client-age-selector.approximate-age', () => {
      const component = render({})
      const selector = component.find('div.client-age-selector.approximate-age')
      expect(selector.exists()).toEqual(true)
    })

    describe('date of birth', () => {
      it('renders a radio button with props', () => {
        const component = render({})
        const radioButton = component.find('input#date-of-birth')
        expect(radioButton.exists()).toBe(true)
        expect(radioButton.props().type).toEqual('radio')
        expect(radioButton.props().name).toEqual('age')
        expect(radioButton.props().id).toEqual('date-of-birth')
        expect(radioButton.props().value).toEqual('dob')
        expect(radioButton.props().checked).toEqual(false)
      })

      it('renders a label for the radio button', () => {
        const component = render({})
        const label = component.find('label[htmlFor="date-of-birth"]')
        expect(label.exists()).toEqual(true)
        expect(label.text()).toEqual('Date of Birth')
      })
    })

    describe('approximate age', () => {
      it('renders a radio button with props', () => {
        const component = render({})
        const radioButton = component.find('input#approximate-age')
        expect(radioButton.exists()).toEqual(true)
        expect(radioButton.props().type).toEqual('radio')
        expect(radioButton.props().name).toEqual('age')
        expect(radioButton.props().id).toEqual('approximate-age')
        expect(radioButton.props().value).toEqual('approximate')
        expect(radioButton.props().checked).toEqual(false)
      })

      it('renders a label for the radio button', () => {
        const component = render({})
        const label = component.find('label[htmlFor="approximate-age"]')
        expect(label.exists()).toEqual(true)
        expect(label.text()).toEqual('Approximate Age')
      })
    })
  })

  describe('radio buttons', () => {
    describe('date of birth radio button', () => {
      describe('is checked', () => {
        it('when the search by age method equals the radio value', () => {
          const component = render({searchByAgeMethod: 'dob'})
          const radioButton = component.find('input#date-of-birth')
          expect(radioButton.props().checked).toEqual(true)
        })
      })

      describe('is not checked', () => {
        it('when the search by age method does not equal the radio value', () => {
          const component = render({searchByAgeMethod: 'approximate'})
          const radioButton = component.find('input#date-of-birth')
          expect(radioButton.props().checked).toEqual(false)
        })
      })

      describe('onClick', () => {
        it('calls onChange to store the selection', () => {
          const onChange = jasmine.createSpy('onChange')
          const component = render({onChange})
          const radioButton = component.find('input#date-of-birth')
          const target = {target: {value: 'dob'}}
          radioButton.props().onClick(target)
          expect(onChange).toHaveBeenCalledWith('searchByAgeMethod', 'dob')
        })
      })

      describe('onEnter', () => {
        it('calls onKeyPress ', () => {
          const onKeyPress = jasmine.createSpy('onKeyPress')
          const component = render({onKeyPress})
          const radioButton = component.find('form div.date-of-birth')
          radioButton.simulate('keypress', {charCode: 13})
          expect(onKeyPress).toHaveBeenCalled()
        })
      })
    })

    describe('approximate age radio button', () => {
      describe('is checked', () => {
        it('when the search by age method equals the radio value', () => {
          const component = render({searchByAgeMethod: 'approximate'})
          const radioButton = component.find('input#approximate-age')
          expect(radioButton.props().checked).toEqual(true)
        })
      })

      describe('is not checked', () => {
        it('when the search by age method does not equal the radio value', () => {
          const component = render({searchByAgeMethod: 'dob'})
          const radioButton = component.find('input#approximate-age')
          expect(radioButton.props().checked).toEqual(false)
        })
      })

      describe('onClick', () => {
        it('calls onChange to store the selection', () => {
          const onChange = jasmine.createSpy('onChange')
          const component = render({onChange})
          const radioButton = component.find('input#approximate-age')
          const target = {target: {value: 'approximate'}}
          radioButton.props().onClick(target)
          expect(onChange).toHaveBeenCalledWith('searchByAgeMethod', 'approximate')
        })
      })

      describe('onEnter', () => {
        it('calls onKeyPress ', () => {
          const onKeyPress = jasmine.createSpy('onKeyPress')
          const component = render({onKeyPress})
          const radioButton = component.find('form div.approximate-age')
          radioButton.simulate('keypress', {charCode: 13})
          expect(onKeyPress).toHaveBeenCalled()
        })
      })
    })
  })
})
