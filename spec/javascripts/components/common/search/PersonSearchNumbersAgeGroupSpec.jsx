import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchNumbersAgeGroup from 'common/search/PersonSearchNumbersAgeGroup'

const render = (
  {
    onBlur = () => {},
    onChange = () => {},
    onClear = () => {},
    personSearchFields = {
      searchApproximateAgeUnits: '',
      searchByAgeMethod: '',
    },
    clientIdError = [],
    ssnErrors = [],
    dobErrors = [],
  } = {},
) =>
  shallow(
    <PersonSearchNumbersAgeGroup
      onBlur={onBlur}
      onChange={onChange}
      onClear={onClear}
      personSearchFields={personSearchFields}
      clientIdError={clientIdError}
      ssnErrors={ssnErrors}
      dobErrors={dobErrors}
    />
  )

describe('PersonSearchNumbersAgeGroup', () => {
  describe('layout', () => {
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
        expect(clientId.props().gridClassName).toEqual('col-md-12 client-id-field')
        expect(typeof clientId.props().onBlur).toEqual('function')
        expect(typeof clientId.props().onChange).toEqual('function')
        expect(clientId.props().value).toEqual('0965-9408-8355-7001109')
        expect(clientId.props().mask).toEqual('1111-1111-1111-1111111')
        expect(clientId.props().placeholder).toEqual('____-____-____-_______')
        expect(clientId.props().maxLength).toEqual('19')
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
        expect(ssn.props().gridClassName).toEqual('col-md-12 ssn-field')
        expect(typeof ssn.props().onBlur).toEqual('function')
        expect(typeof ssn.props().onChange).toEqual('function')
        expect(ssn.props().value).toEqual('123456789')
        expect(ssn.props().mask).toEqual('111-11-1111')
        expect(ssn.props().placeholder).toEqual('___-__-____')
        expect(ssn.props().maxLength).toEqual('9')
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
    })

    it('renders the AgeClearButton', () => {
      const button = render({}).find('AgeClearButton')
      expect(button.exists()).toBe(true)
    })

    it('renders AgeForm', () => {
      const component = render({})
      const ageForm = component.find('AgeForm')
      expect(ageForm.props().dateOfBirthLabel).toEqual('Date of Birth')
      expect(ageForm.props().approximateAgeLabel).toEqual('Approximate Age')
      expect(typeof ageForm.props().onChange).toEqual('function')
      expect(ageForm.props().searchByAgeMethod).toEqual('')
    })

    it('renders a DateOfBirthDateField component', () => {
      const personSearchFields = {
        personSearchFields: {
          searchDateOfBirth: '2019-03-01',
          searchByAgeMethod: '',
          searchApproximateAgeUnits: '',
          dobErrors: [],
        },
      }
      const component = render(personSearchFields)
      const dateField = component.find('DateOfBirthDateField')
      expect(dateField.exists()).toEqual(true)
      expect(dateField.props().value).toEqual('2019-03-01')
      expect(typeof dateField.props().onBlur).toEqual('function')
      expect(typeof dateField.props().onChange).toEqual('function')
      expect(dateField.props().searchByAgeMethod).toEqual('')
      expect(dateField.props().errors).toEqual([])
    })

    it('renders div.approximate-age-selector.unit', () => {
      const component = render({})
      const selector = component.find('div.approximate-age-selector.unit')
      expect(selector.exists()).toEqual(true)
    })

    it('renders div.approximate-age-selector.number', () => {
      const component = render({})
      const selector = component.find('div.approximate-age-selector.number')
      expect(selector.exists()).toEqual(true)
    })

    it('renders AgeUnitForm', () => {
      const personSearchFields = {
        personSearchFields: {
          searchApproximateAgeUnits: 'months',
          searchByAgeMethod: '',
        },
      }
      const component = render(personSearchFields)
      const ageUnitForm = component.find('AgeUnitForm')
      expect(ageUnitForm.exists()).toEqual(true)
      expect(ageUnitForm.props().formLabel).toEqual('Unit')
      expect(ageUnitForm.props().monthsLabel).toEqual('Months')
      expect(ageUnitForm.props().yearsLabel).toEqual('Years')
      expect(typeof ageUnitForm.props().onChange).toEqual('function')
      expect(ageUnitForm.props().searchApproximateAgeUnits).toEqual('months')
      expect(ageUnitForm.props().searchByAgeMethod).toEqual('')
    })

    it('renders ApproximateAgeNumberSelect', () => {
      const personSearchFields = {
        personSearchFields: {
          searchApproximateAgeUnits: 'months',
          searchApproximateAge: '10',
          searchByAgeMethod: '',
        },
      }
      const component = render(personSearchFields)
      const ageNumberSelect = component.find('ApproximateAgeNumberSelect')
      expect(ageNumberSelect.exists()).toEqual(true)
      expect(ageNumberSelect.props().ageUnit).toEqual('months')
      expect(ageNumberSelect.props().id).toEqual('search-approximate-age-number')
      expect(ageNumberSelect.props().gridClassName).toEqual('age-number-field')
      expect(typeof ageNumberSelect.props().onChange).toEqual('function')
      expect(ageNumberSelect.props().value).toEqual('10')
      expect(ageNumberSelect.props().searchByAgeMethod).toEqual('')
    })
  })

  describe('clear the search ui age fields', () => {
    describe('when the clear button is clicked', () => {
      it('calls onClear to clear age fields', () => {
        const onClear = jasmine.createSpy('onClear')
        const component = render({onClear})
        const clearButton = component.find('AgeClearButton')
        clearButton.props().onClear('age')
        expect(onClear).toHaveBeenCalledWith('age')
      })
    })
  })

  describe('when the field values', () => {
    it('calls onChange when a new clientId is entered', () => {
      const onChange = jasmine.createSpy('onChange')
      const component = render({onChange})
      component
        .find('#search-client-id')
        .props()
        .onChange({target: {value: '1'}})

      expect(onChange).toHaveBeenCalledWith('searchClientId', '1')
    })

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
