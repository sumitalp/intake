import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchNumbersAgeGroup from 'common/search/PersonSearchNumbersAgeGroup'

const render = ({onChange = () => {}, personSearchFields = {}, clientIdError = []} = {}) =>
  shallow(
    <PersonSearchNumbersAgeGroup
      onChange={onChange}
      personSearchFields={personSearchFields}
      clientIdError={clientIdError}
    />
  )

describe('PersonSearchNumbersAgeGroup', () => {
  describe('layout', () => {
    it('renders client id masked input field with label Client ID', () => {
      const clientId = render({
        personSearchFields: {searchClientId: '0965-9408-8355-7001109'},
      }).find('MaskedInputField[label="Client ID Number"]')
      expect(clientId.props().id).toEqual('search-client-id')
      expect(clientId.props().label).toEqual('Client ID Number')
      expect(clientId.props().gridClassName).toEqual('col-md-12 client-id-field')
      expect(typeof clientId.props().onChange).toEqual('function')
      expect(clientId.props().value).toEqual('0965-9408-8355-7001109')
      expect(clientId.props().mask).toEqual('1111-1111-1111-1111111')
      expect(clientId.props().placeholder).toEqual('____-____-____-_______')
      expect(clientId.props().maxLength).toEqual('19')
    })

    describe('clientIdError', () => {
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

    it('renders ssn input field with label SSN', () => {
      const ssn = render({personSearchFields: {searchSsn: '123456789'}}).find(
        'InputField[label="Social Security Number"]'
      )
      expect(ssn.props().id).toEqual('search-ssn')
      expect(ssn.props().gridClassName).toEqual('col-md-12 ssn-field')
      expect(ssn.props().label).toEqual('Social Security Number')
      expect(typeof ssn.props().onChange).toEqual('function')
      expect(ssn.props().value).toEqual('123456789')
    })

    it('renders the radio choice message', () => {
      const component = render({})
      const message = component.find('div.radio-choice-message')
      expect(message.exists()).toEqual(true)
      expect(message.find('span.radio-choice-message-action').exists()).toEqual(true)
      expect(message.text()).toEqual('Choose one: (clear)')
    })

    it('renders AgeForm', () => {
      const component = render({personSearchFields: {}})
      const ageForm = component.find('AgeForm')
      expect(ageForm.props().dateOfBirthLabel).toEqual('Date of Birth')
      expect(ageForm.props().approximateAgeLabel).toEqual('Approximate Age')
    })

    it('renders a DateField', () => {
      const component = render({personSearchFields: {searchDateOfBirth: '2019-03-01'}})
      const dateField = component.find('DateField')
      expect(dateField.exists()).toEqual(true)
      expect(dateField.props().id).toEqual('search-date-of-birth')
      expect(dateField.props().gridClassName).toEqual('date-field')
      expect(dateField.props().label).toEqual('Date')
      expect(dateField.props().value).toEqual('2019-03-01')
      expect(typeof dateField.props().onChange).toEqual('function')
      expect(dateField.props().hasTime).toEqual(false)
    })

    it('renders div.approximate-age-selector.unit', () => {
      const component = render({personSearchFields: {}})
      const selector = component.find('div.approximate-age-selector.unit')
      expect(selector.exists()).toEqual(true)
    })

    it('renders div.approximate-age-selector.number', () => {
      const component = render({personSearchFields: {}})
      const selector = component.find('div.approximate-age-selector.number')
      expect(selector.exists()).toEqual(true)
    })

    it('renders AgeUnitForm', () => {
      const component = render({personSearchFields: {}})
      const ageUnitForm = component.find('AgeUnitForm')
      expect(ageUnitForm.exists()).toEqual(true)
      expect(ageUnitForm.props().formLabel).toEqual('Unit')
      expect(ageUnitForm.props().monthsLabel).toEqual('Months')
      expect(ageUnitForm.props().yearsLabel).toEqual('Years')
    })

    it('renders ApproximateAgeNumberSelect', () => {
      const component = render({personSearchFields: {searchApproximateAge: '10'}})
      const ageNumberSelect = component.find('ApproximateAgeNumberSelect')
      expect(ageNumberSelect.exists()).toEqual(true)
      expect(ageNumberSelect.props().id).toEqual('search-approximate-age-number')
      expect(ageNumberSelect.props().gridClassName).toEqual('age-number-field')
      expect(typeof ageNumberSelect.props().onChange).toEqual('function')
      expect(ageNumberSelect.props().value).toEqual('10')
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
