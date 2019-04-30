import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchAgeGenderNumbersGroup from 'common/search/PersonSearchAgeGenderNumbersGroup'

const defaultPersonSearchFields = {
  searchApproximateAgeUnits: '',
  searchByAgeMethod: '',
}

const render = (
  {
    onBlur = () => {},
    onFocus = () => {},
    onChange = () => {},
    onKeyPress = () => {},
    onKeyUp = () => {},
    personSearchFields = defaultPersonSearchFields,
    clientIdError = [],
    ssnErrors = [],
    dobErrors = [],
  } = {},
) =>
  shallow(
    <PersonSearchAgeGenderNumbersGroup
      onBlur={onBlur}
      onChange={onChange}
      personSearchFields={personSearchFields}
      clientIdError={clientIdError}
      ssnErrors={ssnErrors}
      dobErrors={dobErrors}
      onFocus={onFocus}
      onKeyPress={onKeyPress}
      onKeyUp={onKeyUp}
    />
  )

describe('PersonSearchAgeGenderNumbersGroup', () => {
  describe('layout', () => {
    it('render the age search field container', () => {
      const container = render({}).find('div.age-search-field-container')
      expect(container.exists()).toEqual(true)
    })

    it('renders the SearchByAgeMethodSelect within a container and sets props', () => {
      const methodSelect = render({}).find('div.age-search-field-container').find('SearchByAgeMethodSelect')
      const props = methodSelect.props()
      expect(methodSelect.exists()).toEqual(true)
      expect(props.gridClassName).toEqual('search-by-age-method-field')
      expect(props.id).toEqual('search-by-age-method')
      expect(typeof props.onChange).toBe('function')
      expect(typeof props.onKeyPress).toBe('function')
      expect(props.value).toEqual('')
    })

    it('renders the AgeSearchFields component within a container and sets props', () => {
      const ageSearchFields = render({}).find('div.age-search-field-container').find('AgeSearchFields')
      const props = ageSearchFields.props()
      expect(ageSearchFields.exists()).toBe(true)
      expect(props.dobErrors).toEqual([])
      expect(typeof props.onBlur).toBe('function')
      expect(typeof props.onChange).toBe('function')
      expect(typeof props.onKeyPress).toBe('function')
      expect(typeof props.onKeyUp).toBe('function')
      expect(props.personSearchFields).toBe(defaultPersonSearchFields)
    })

    describe('Sex At Birth', () => {
      it('renders sex at birth select', () => {
        const component = render({personSearchFields: {searchSexAtBirth: ''}})
        const sexAtBirthSelect = component.find('SexAtBirthSelect')
        expect(sexAtBirthSelect.props().id).toEqual('search-sex-at-birth')
        expect(sexAtBirthSelect.props().value).toEqual('')
        expect(typeof sexAtBirthSelect.prop('onKeyPress')).toEqual('function')
      })

      it('renders sex at birth select when a gender is selected', () => {
        const component = render({
          personSearchFields: {searchSexAtBirth: 'Female'},
        })
        const sexAtBirthSelect = component.find('SexAtBirthSelect')
        expect(sexAtBirthSelect.props().id).toEqual('search-sex-at-birth')
        expect(sexAtBirthSelect.props().value).toEqual('Female')
      })
    })

    describe('Client ID', () => {
      it('renders masked input field with label', () => {
        const personSearchFields = {
          personSearchFields: {
            searchClientId: '0965-9408-8355-7001109',
            searchApproximateAgeUnits: '',
          },
        }
        const clientId = render(personSearchFields).find('MaskedInputField[label="Client ID Number"]')
        expect(clientId.props().id).toEqual('search-client-id')
        expect(clientId.props().label).toEqual('Client ID Number')
        expect(clientId.props().gridClassName).toEqual('col-md-3 client-id-field')
        expect(typeof clientId.props().onBlur).toEqual('function')
        expect(typeof clientId.props().onFocus).toEqual('function')
        expect(typeof clientId.props().onChange).toEqual('function')
        expect(clientId.props().value).toEqual('0965-9408-8355-7001109')
        expect(clientId.props().mask).toEqual('1111-1111-1111-1111111')
        expect(clientId.props().placeholder).toEqual('____-____-____-_______')
        expect(clientId.props().maxLength).toEqual('19')
        expect(typeof clientId.props().moveCursor).toEqual('function')
        expect(typeof clientId.props().onKeyPress).toEqual('function')
      })

      describe('errors', () => {
        it('display error message if clientIdError is present', () => {
          const component = render({
            clientIdError: ['Client Id number must be 19 digits long.'],
          }).find('MaskedInputField[label="Client ID Number"]')
          expect(component.props().errors).toEqual(['Client Id number must be 19 digits long.'])
        })

        it('does not display error message if clientIdError is not present', () => {
          const component = render({
            clientIdError: [],
          }).find('MaskedInputField[label="Client ID Number"]')
          expect(component.props().errors).toEqual([])
        })

        it('does not display error message if clientIdError is undefined ', () => {
          const component = render({
            clientIdError: undefined,
          }).find('MaskedInputField[label="Client ID Number"]')
          expect(component.props().errors).toEqual([])
        })
      })

      describe('when field is blurred', () => {
        it('calls onBlur to set clientIdErrorCheck to true', () => {
          const onBlur = jasmine.createSpy('onBlur')
          const component = render({onBlur})
          const maskedInputField = component.find('MaskedInputField[label="Client ID Number"]')
          maskedInputField.props().onBlur()
          expect(onBlur).toHaveBeenCalledWith('clientIdErrorCheck', true)
        })
      })
    })

    describe('SSN', () => {
      it('renders a masked input field with label', () => {
        const personSearchFields = {
          personSearchFields: {
            searchSsn: '123456789',
            searchApproximateAgeUnits: '',
          },
        }
        const component = render(personSearchFields)
        const ssn = component.find('MaskedInputField[label="Social Security Number"]')
        expect(ssn.props().id).toEqual('search-ssn')
        expect(ssn.props().label).toEqual('Social Security Number')
        expect(ssn.props().gridClassName).toEqual('col-md-3 ssn-field')
        expect(typeof ssn.props().onBlur).toEqual('function')
        expect(typeof ssn.props().onChange).toEqual('function')
        expect(ssn.props().value).toEqual('123456789')
        expect(ssn.props().mask).toEqual('111-11-1111')
        expect(ssn.props().placeholder).toEqual('___-__-____')
        expect(ssn.props().maxLength).toEqual('9')
        expect(typeof ssn.props().moveCursor).toEqual('function')
        expect(typeof ssn.props().onKeyPress).toEqual('function')
      })

      describe('errors', () => {
        it('displays error messages if ssnErrors are present', () => {
          const ssnErrors = [
            'Social security number must be 9 digits long.',
            'Social security number cannot begin with 9.',
            'Social security number cannot begin with 666.',
            'Social security number cannot contain all 0s in a group.',
          ]
          const component = render({ssnErrors})
          const maskedInputField = component.find('MaskedInputField[label="Social Security Number"]')
          expect(maskedInputField.props().errors).toEqual(ssnErrors)
        })

        it('does not display error messages if ssnErrors are not present', () => {
          const component = render({})
          const maskedInputField = component.find('MaskedInputField[label="Social Security Number"]')
          expect(maskedInputField.props().errors).toEqual([])
        })

        it('does not display error messages if ssnErrors is undefined', () => {
          const component = render({ssnErrors: undefined})
          const maskedInputField = component.find('MaskedInputField[label="Social Security Number"]')
          expect(maskedInputField.props().errors).toEqual([])
        })
      })

      describe('when field is blurred', () => {
        it('calls onBlur to set ssnErrorCheck to true', () => {
          const onBlur = jasmine.createSpy('onBlur')
          const component = render({onBlur})
          const maskedInputField = component.find('MaskedInputField[label="Social Security Number"]')
          maskedInputField.props().onBlur()
          expect(onBlur).toHaveBeenCalledWith('ssnErrorCheck', true)
        })
      })      
    })
  })

  describe('when the sex at birth value changes', () => {
    it('calls onChange when a new sex at birth is selected', () => {
      const onChange = jasmine.createSpy('onChange')
      const component = render({onChange})
      component
        .find('SexAtBirthSelect')
        .props()
        .onChange('searchSexAtBirth', 'Female')
      expect(onChange).toHaveBeenCalledWith('searchSexAtBirth', 'Female')
    })
  })

  describe('when the client id value changes', () => {
    it('calls onChange when a new clientId is entered', () => {
      const onChange = jasmine.createSpy('onChange')
      const component = render({onChange})
      component
        .find('#search-client-id')
        .props()
        .onChange({target: {value: '1'}})

      expect(onChange).toHaveBeenCalledWith('searchClientId', '1')
    })
  })

  describe('when the ssn value changes', () => {
    it('calls onChange when a new ssn is entered', () => {
      const onChange = jasmine.createSpy('onChange')
      const component = render({onChange})
      component
        .find('#search-ssn')
        .props()
        .onChange({target: {value: '111223333'}})

      expect(onChange).toHaveBeenCalledWith('searchSsn', '111223333')
    })
  })
})
