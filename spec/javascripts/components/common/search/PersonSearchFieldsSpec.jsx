import React from 'react'
import PersonSearchFields from 'common/search/PersonSearchFields'
import {shallow} from 'enzyme'

describe('PersonSearchFields', () => {
  const render = ({
    onChange = () => {},
    onCancel = () => {},
    onSubmit = () => {},
    ...props
  } = {}) =>
    shallow(
      <PersonSearchFields
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        {...props}
      />
    )

  it('renders last name input field with label Last Name', () => {
    const lastName = render({searchLastName: 'Bravo'}).find(
      'InputField[label="Last Name"]'
    )
    expect(lastName.props().id).toEqual('search-last-name')
    expect(lastName.props().value).toEqual('Bravo')
  })

  it('renders first name input field with label First Name', () => {
    const firstName = render({searchFirstName: 'Armando'}).find(
      'InputField[label="First Name"]'
    )
    expect(firstName.props().id).toEqual('search-first-name')
    expect(firstName.props().value).toEqual('Armando')
  })

  it('renders middle name input field with label Middle Name', () => {
    const middleName = render({searchMiddleName: 'Middle'}).find(
      'InputField[label="Middle Name"]'
    )
    expect(middleName.props().id).toEqual('search-middle-name')
    expect(middleName.props().value).toEqual('Middle')
  })

  it('renders client id input field with label Client ID', () => {
    const clientId = render({searchClientId: '1'}).find(
      'InputField[label="Client ID"]'
    )
    expect(clientId.props().id).toEqual('search-client-id')
    expect(clientId.props().value).toEqual('1')
  })

  it('renders suffix select', () => {
    const component = render()
    const suffixSelect = component.find('SuffixNameSelect')
    expect(suffixSelect.props().id).toEqual('search-suffix')
    expect(suffixSelect.props().value).toEqual('')
  })

  it('renders suffix select when a suffix is selected', () => {
    const component = render({searchSuffix: 'Jr'})
    const suffixSelect = component.find('SuffixNameSelect')
    expect(suffixSelect.props().id).toEqual('search-suffix')
    expect(suffixSelect.props().value).toEqual('Jr')
  })

  it('renders ssn input field with label SSN', () => {
    const ssn = render({searchSsn: '123456789'}).find(
      'InputField[label="SSN"]'
    )
    expect(ssn.props().id).toEqual('search-ssn')
    expect(ssn.props().value).toEqual('123456789')
  })

  it('renders the date field label', () => {
    const component = render()
    const label = component.find('label.person-search-label-date-of-birth')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Date of Birth')
  })

  it('renders date field', () => {
    const component = render()
    const dateField = component.find('DateField')
    expect(dateField.props().id).toEqual('search-date-of-birth')
    expect(dateField.props().value).toEqual('')
  })

  it('renders date field when a date is selected', () => {
    const component = render({searchDateOfBirth: '01/01/2000'})
    const dateField = component.find('DateField')
    expect(dateField.props().id).toEqual('search-date-of-birth')
    expect(dateField.props().value).toEqual('01/01/2000')
  })

  it('renders the approximate age label', () => {
    const component = render()
    const label = component.find('label.person-search-label-approximate-age')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Approximate Age')
  })

  it('renders approximate age input field', () => {
    const approximateAge = render({searchApproximateAge: '1'}).find(
      'InputField#search-approximate-age-number'
    )
    expect(approximateAge.props().id).toEqual('search-approximate-age-number')
    expect(approximateAge.props().value).toEqual('1')
  })

  it('renders approximate age units select', () => {
    const component = render()
    const approximateAgeUnitsSelect = component.find(
      'ApproximateAgeUnitsSelect'
    )
    expect(approximateAgeUnitsSelect.props().id).toEqual(
      'search-approximate-age-units'
    )
    expect(approximateAgeUnitsSelect.props().value).toEqual('')
  })

  it('renders approximate age units select when a unit is selected', () => {
    const component = render({searchApproximateAgeUnits: 'Months'})
    const approximateAgeUnitsSelect = component.find(
      'ApproximateAgeUnitsSelect'
    )
    expect(approximateAgeUnitsSelect.props().id).toEqual(
      'search-approximate-age-units'
    )
    expect(approximateAgeUnitsSelect.props().value).toEqual('Months')
  })

  it('renders gender at birth select', () => {
    const component = render()
    const genderSelect = component.find('GenderAtBirthSelect')
    expect(genderSelect.props().id).toEqual('search-gender-at-birth')
    expect(genderSelect.props().value).toEqual('')
  })

  it('renders gender at birth select when a gender is selected', () => {
    const component = render({searchGenderAtBirth: 'Female'})
    const genderSelect = component.find('GenderAtBirthSelect')
    expect(genderSelect.props().id).toEqual('search-gender-at-birth')
    expect(genderSelect.props().value).toEqual('Female')
  })

  it('renders address input field with label Street Address', () => {
    const address = render({searchAddress: '1600 Pennsylvania Ave NW'}).find(
      'InputField[label="Street Address"]'
    )
    expect(address.props().id).toEqual('search-address')
    expect(address.props().value).toEqual('1600 Pennsylvania Ave NW')
  })

  it('renders city input field with label City', () => {
    const city = render({searchCity: 'Damascus'}).find(
      'InputField[label="City"]'
    )
    expect(city.props().id).toEqual('search-city')
    expect(city.props().value).toEqual('Damascus')
  })

  it('renders county select', () => {
    const component = render()
    const countySelect = component.find('CountyNameSelect')
    expect(countySelect.props().id).toEqual('search-county')
    expect(countySelect.props().value).toEqual('')
  })

  it('renders county select when a county is selected', () => {
    const component = render({searchCounty: 'Contra Costa'})
    const countySelect = component.find('CountyNameSelect')
    expect(countySelect.props().id).toEqual('search-county')
    expect(countySelect.props().value).toEqual('Contra Costa')
  })

  it('renders state select', () => {
    const component = render()
    const stateSelect = component.find('StateNameSelect')
    expect(stateSelect.props().id).toEqual('search-state')
    expect(stateSelect.props().value).toEqual('')
  })

  it('renders state select when a state is selected', () => {
    const component = render({searchState: 'California'})
    const stateSelect = component.find('StateNameSelect')
    expect(stateSelect.props().id).toEqual('search-state')
    expect(stateSelect.props().value).toEqual('California')
  })

  it('renders country input field with label Country', () => {
    const city = render({searchCountry: 'United States'}).find(
      'InputField[label="Country"]'
    )
    expect(city.props().id).toEqual('search-country')
    expect(city.props().value).toEqual('United States')
  })

  it('renders zip code input field with label Zip Code', () => {
    const zipCode = render({searchZipCode: '12345'}).find(
      'InputField[label="Zip Code"]'
    )
    expect(zipCode.props().id).toEqual('search-zip-code')
    expect(zipCode.props().value).toEqual('12345')
  })

  it('renders button for search', () => {
    const component = render()
    expect(component.find('button.person-search-button-search').text()).toEqual(
      'Search'
    )
  })

  it('renders button for cancel', () => {
    const component = render()
    expect(component.find('button.person-search-button-cancel').text()).toEqual(
      'Cancel'
    )
  })

  describe('when there is no search terms', () => {
    it('disables the search button when there are no search criteria', () => {
      const component = render({})
      expect(
        component.find('button.person-search-button-search').props().disabled
      ).toBeTruthy()
    })
  })

  describe('when there is an existing search terms', () => {
    describe('when the search term has a valid length', () => {
      it('enables the search button with last name', () => {
        const component = render({searchLastName: 'Doe'})
        expect(
          component.find('button.person-search-button-search').props().disabled
        ).toBeFalsy()
      })

      it('enables the search button with first name', () => {
        const component = render({searchFirstName: 'Jane'})
        expect(
          component.find('button.person-search-button-search').props().disabled
        ).toBeFalsy()
      })

      it('enables the search button with middle name', () => {
        const component = render({searchMiddleName: 'Middle'})
        expect(
          component.find('button.person-search-button-search').props().disabled
        ).toBeFalsy()
      })

      it('enables the search button with ssn', () => {
        const component = render({searchSsn: '123'})
        expect(
          component.find('button.person-search-button-search').props().disabled
        ).toBeFalsy()
      })

      it('enables the search button with date of birth', () => {
        const component = render({searchDateOfBirth: '01/01'})
        expect(
          component.find('button.person-search-button-search').props().disabled
        ).toBeFalsy()
      })

      it('enables the search button with address', () => {
        const component = render({searchAddress: '123 Main'})
        expect(
          component.find('button.person-search-button-search').props().disabled
        ).toBeFalsy()
      })
    })

    describe('when the search term is too short', () => {
      it('disables the search button with last name', () => {
        const component = render({searchLastName: 'D'})
        expect(
          component.find('button.person-search-button-search').props().disabled
        ).toBeTruthy()
      })

      it('disables the search button with first name', () => {
        const component = render({searchFirstName: 'J'})
        expect(
          component.find('button.person-search-button-search').props().disabled
        ).toBeTruthy()
      })

      it('disables the search button with middle name', () => {
        const component = render({searchMiddleName: 'M'})
        expect(
          component.find('button.person-search-button-search').props().disabled
        ).toBeTruthy()
      })

      it('disables the search button with ssn', () => {
        const component = render({searchSsn: '1'})
        expect(
          component.find('button.person-search-button-search').props().disabled
        ).toBeTruthy()
      })

      it('disables the search button with date of birth', () => {
        const component = render({searchDateOfBirth: '0'})
        expect(
          component.find('button.person-search-button-search').props().disabled
        ).toBeTruthy()
      })

      it('disables the search button with address', () => {
        const component = render({searchAddress: '1'})
        expect(
          component.find('button.person-search-button-search').props().disabled
        ).toBeTruthy()
      })
    })

    it('strips leading whitespace when deciding to enable search', () => {
      const component = render({searchLastName: ' Y'})
      expect(
        component.find('button.person-search-button-search').props().disabled
      ).toBeTruthy()
    })
  })

  it('calls onSubmit when search button is clicked', () => {
    const onSubmit = jasmine.createSpy('onClick')
    const component = render({onSubmit})
    const searchButton = component.find('.person-search-button-search')
    searchButton.simulate('click')
    expect(onSubmit).toHaveBeenCalled()
  })

  it('calls onCancel when cancel button is clicked', () => {
    const onCancel = jasmine.createSpy('onCancel')
    const component = render({onCancel})
    const cancelButton = component.find('.person-search-button-cancel')
    cancelButton.simulate('click')
    expect(onCancel).toHaveBeenCalled()
  })

  it('calls onChange when a new lastName is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-last-name')
      .props()
      .onChange({target: {value: 'Bravo'}}, 'lastname')

    expect(onChange).toHaveBeenCalledWith('Bravo', 'lastname')
  })

  it('calls onChange when a new firstName is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-first-name')
      .props()
      .onChange({target: {value: 'Armando'}}, 'firstname')

    expect(onChange).toHaveBeenCalledWith('Armando', 'firstname')
  })

  it('calls onChange when a new middleName is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-middle-name')
      .props()
      .onChange({target: {value: 'Middle'}}, 'middlename')

    expect(onChange).toHaveBeenCalledWith('Middle', 'middlename')
  })

  it('calls onChange when a new clientId is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-client-id')
      .props()
      .onChange({target: {value: '1'}}, 'clientid')

    expect(onChange).toHaveBeenCalledWith('1', 'clientid')
  })

  it('calls onChange when new suffix is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('SuffixNameSelect')
      .props()
      .onChange('Jr', 'suffix')
    expect(onChange).toHaveBeenCalledWith('Jr', 'suffix')
  })

  it('calls onChange when a new ssn is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-ssn')
      .props()
      .onChange({target: {value: '111223333'}}, 'ssn')

    expect(onChange).toHaveBeenCalledWith('111223333', 'ssn')
  })

  it('calls onChange when new date is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('DateField')
      .props()
      .onChange('01/01/2000', 'dateofbirth')
    expect(onChange).toHaveBeenCalledWith('01/01/2000', 'dateofbirth')
  })

  it('calls onChange when a new approximate age is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-approximate-age-number')
      .props()
      .onChange({target: {value: '1'}}, 'approximateage')

    expect(onChange).toHaveBeenCalledWith('1', 'approximateage')
  })

  it('calls onChange when new approximate age unit is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('ApproximateAgeUnitsSelect')
      .props()
      .onChange('Months', 'approximateageunits')
    expect(onChange).toHaveBeenCalledWith('Months', 'approximateageunits')
  })

  it('calls onChange when new gender is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('GenderAtBirthSelect')
      .props()
      .onChange('Female', 'genderatbirth')
    expect(onChange).toHaveBeenCalledWith('Female', 'genderatbirth')
  })

  it('calls onChangeAddress when new address is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-address')
      .props()
      .onChange({target: {value: '1 Infinite Loop'}}, 'address')
    expect(onChange).toHaveBeenCalledWith('1 Infinite Loop', 'address')
  })

  it('calls onChange when new city is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-city')
      .props()
      .onChange({target: {value: 'Metropolis'}}, 'city')
    expect(onChange).toHaveBeenCalledWith('Metropolis', 'city')
  })

  it('calls onChange when new county is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('CountyNameSelect')
      .props()
      .onChange('Inyo', 'county')
    expect(onChange).toHaveBeenCalledWith('Inyo', 'county')
  })

  it('calls onChange when new state is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('StateNameSelect')
      .props()
      .onChange('California', 'state')
    expect(onChange).toHaveBeenCalledWith('California', 'state')
  })

  it('calls onChange when new country is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-country')
      .props()
      .onChange({target: {value: 'United States'}}, 'country')
    expect(onChange).toHaveBeenCalledWith('United States', 'country')
  })

  it('calls onChange when new zip code is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = render({onChange})
    component
      .find('#search-zip-code')
      .props()
      .onChange({target: {value: '12345'}}, 'zipcode')
    expect(onChange).toHaveBeenCalledWith('12345', 'zipcode')
  })
})
