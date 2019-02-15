import Autocompleter from 'common/search/Autocompleter'
import React from 'react'
import {shallow, mount} from 'enzyme'
import * as Analytics from 'utils/analytics'
import {Provider} from 'react-redux'
import {createMockStore} from 'redux-test-utils'
import {fromJS} from 'immutable'

describe('<Autocompleter />', () => {
  function mountAutocompleter({
    id = null,
    isSelectable = () => true,
    onLoadMoreResults = () => null,
    onChange = () => null,
    onClear = () => null,
    onCancel = () => null,
    onSearch = () => null,
    onSelect = () => null,
    results = [],
    searchTerm = '',
    searchAddress,
    searchApproximateAge,
    searchApproximateAgeUnits,
    searchCity,
    searchClientId,
    searchCountry,
    searchCounty,
    searchDateOfBirth,
    searchFirstName,
    searchGenderAtBirth,
    searchLastName,
    searchMiddleName,
    searchSsn,
    searchState,
    searchSuffix,
    searchZipCode,
    total = 0,
    staffId = '0x3',
    canCreateNewPerson = true,
  }) {
    const state = fromJS({systemCodes: {counties: [], usStates: []}})
    const store = createMockStore(state)
    return mount(
      <Provider store={store}>
        <Autocompleter
          id={id}
          isSelectable={isSelectable}
          onLoadMoreResults={onLoadMoreResults}
          onChange={onChange}
          onClear={onClear}
          onCancel={onCancel}
          onSearch={onSearch}
          onSelect={onSelect}
          results={results}
          searchTerm={searchTerm}
          searchAddress={searchAddress}
          searchApproximateAge={searchApproximateAge}
          searchApproximateAgeUnits={searchApproximateAgeUnits}
          searchCity={searchCity}
          searchClientId={searchClientId}
          searchCountry={searchCountry}
          searchCounty={searchCounty}
          searchDateOfBirth={searchDateOfBirth}
          searchFirstName={searchFirstName}
          searchGenderAtBirth={searchGenderAtBirth}
          searchLastName={searchLastName}
          searchMiddleName={searchMiddleName}
          searchSsn={searchSsn}
          searchState={searchState}
          searchSuffix={searchSuffix}
          searchZipCode={searchZipCode}
          total={total}
          staffId={staffId}
          startTime="2018-08-01T16:42:59.674Z"
          canCreateNewPerson={canCreateNewPerson}
        />
      </Provider>
    )
  }
  function renderAutocompleter({
    id = null,
    isSelectable = () => true,
    onLoadMoreResults = () => null,
    onChange = () => null,
    onClear = () => null,
    onCancel = () => null,
    onSearch = () => null,
    onSelect = () => null,
    results = [],
    searchTerm = '',
    searchAddress,
    searchApproximateAge,
    searchApproximateAgeUnits,
    searchCity,
    searchClientId,
    searchCountry,
    searchCounty,
    searchDateOfBirth,
    searchFirstName,
    searchGenderAtBirth,
    searchLastName,
    searchMiddleName,
    searchSsn,
    searchState,
    searchSuffix,
    searchZipCode,
    total = 0,
    staffId = '0x3',
  }) {
    return shallow(
      <Autocompleter
        id={id}
        isSelectable={isSelectable}
        onLoadMoreResults={onLoadMoreResults}
        onChange={onChange}
        onClear={onClear}
        onCancel={onCancel}
        onSearch={onSearch}
        onSelect={onSelect}
        results={results}
        searchTerm={searchTerm}
        searchAddress={searchAddress}
        searchApproximateAge={searchApproximateAge}
        searchApproximateAgeUnits={searchApproximateAgeUnits}
        searchCity={searchCity}
        searchClientId={searchClientId}
        searchCountry={searchCountry}
        searchCounty={searchCounty}
        searchDateOfBirth={searchDateOfBirth}
        searchFirstName={searchFirstName}
        searchGenderAtBirth={searchGenderAtBirth}
        searchLastName={searchLastName}
        searchMiddleName={searchMiddleName}
        searchSsn={searchSsn}
        searchState={searchState}
        searchSuffix={searchSuffix}
        searchZipCode={searchZipCode}
        total={total}
        staffId={staffId}
        startTime="2018-08-01T16:42:59.674Z"
      />,
      {disableLifecycleMethods: true}
    )
  }

  beforeEach(() => {
    spyOn(Analytics, 'logEvent')
  })

  describe('handleSubmit', () => {
    let personSearchFields
    let searchButton
    let onSearch
    let onClear

    describe('when user types two or more non whitespace characters', () => {
      beforeEach(() => {
        onSearch = jasmine.createSpy('onSearch')
        onClear = jasmine.createSpy('onClear')
        personSearchFields = renderAutocompleter({
          onSearch,
          onClear,
          searchTerm: 'Carmen Sandiego',
          searchAddress: '123 Main St',
          searchCity: 'Sac Town',
          searchCounty: 'Sacramento',
        })
          .find('PersonSearchFields')
          .dive()
        searchButton = personSearchFields.find(
          'button.person-search-button-search'
        )
        searchButton.simulate('click')
      })

      it('performs a search', () => {
        expect(onSearch).toHaveBeenCalledWith('Carmen Sandiego', {
          address: '123 Main St',
          city: 'Sac Town',
          county: 'Sacramento',
        })
      })

      it('calls props onClear', () => {
        expect(onClear).toHaveBeenCalledWith()
      })
    })
  })

  describe('renderInput', () => {
    it('renders an input element', () => {
      const autocompleter = renderAutocompleter({})
      const input = shallow(
        autocompleter
          .find('Autocomplete')
          .props()
          .renderInput()
      )
      expect(input.name()).toEqual('input')
    })
  })

  describe('render', () => {
    it('displays an Autocomplete component', () => {
      const autocomplete = renderAutocompleter({
        id: 'search-input-id',
      }).find('Autocomplete')
      expect(autocomplete.length).toBe(1)

      const input = autocomplete.dive().find('input')
      expect(input.props().id).toEqual('search-input-id')
    })

    it('hides search results when search is less than two characters', () => {
      const results = Array.from(Array(5).keys()).map(id => ({
        legacyDescriptor: {legacy_id: id},
      }))
      const autocomplete = mountAutocompleter({results}).find('Autocomplete')
      autocomplete.find('input').simulate('change', {target: {value: 'a'}})
      expect(autocomplete.find('PersonSuggestion').length).toEqual(0)
    })

    describe('with search results present', () => {
      const address = {id: 'test address'}
      const ethnicity = {id: 'test ethnicity'}
      const languages = ['test languages']
      const phoneNumber = {id: 'test phone number'}
      const races = ['test race']
      const legacyDescriptor = {legacy_id: 'some-legacy-id'}
      const results = [
        {
          address,
          dateOfBirth: 'test date of birth',
          isCsec: false,
          isDeceased: false,
          isProbationYouth: false,
          ethnicity,
          fullName: 'test full name',
          gender: 'male',
          isSealed: false,
          isSensitive: false,
          languages,
          legacyDescriptor,
          phoneNumber,
          races,
          ssn: 'test ssn',
        },
        {
          legacyDescriptor: {legacy_id: 'some-other-legacy-id'},
        },
      ]

      let autocompleter
      let personSearchFields
      let searchButton
      let onSearch
      let onClear

      beforeEach(() => {
        onSearch = jasmine.createSpy('onSearch')
        onClear = jasmine.createSpy('onClear')
        autocompleter = mountAutocompleter({
          results,
          onSearch,
          onClear,
          searchTerm: 'Carmen Sandiego',
          searchAddress: '123 Main St',
          searchCity: 'Sac Town',
          searchCounty: 'Sacramento',
        })
        personSearchFields = autocompleter.find('PersonSearchFields')
        searchButton = personSearchFields.find(
          'button.person-search-button-search'
        )
        searchButton.simulate('click')
      })

      it('displays multiple suggestions', () => {
        const suggestions = autocompleter
          .find('Autocomplete')
          .find('PersonSuggestion')
        expect(suggestions.length).toEqual(2)
      })

      it('displays person suggestion', () => {
        const suggestions = autocompleter.find('PersonSuggestion')
        const suggestion = suggestions.at(0)

        expect(suggestion.props().address).toEqual(address)
        expect(suggestion.props().dateOfBirth).toEqual('test date of birth')
        expect(suggestion.props().isCsec).toEqual(false)
        expect(suggestion.props().isDeceased).toEqual(false)
        expect(suggestion.props().isProbationYouth).toEqual(false)
        expect(suggestion.props().ethnicity).toEqual(ethnicity)
        expect(suggestion.props().fullName).toEqual('test full name')
        expect(suggestion.props().gender).toEqual('male')
        expect(suggestion.props().isSealed).toEqual(false)
        expect(suggestion.props().isSensitive).toEqual(false)
        expect(suggestion.props().languages).toEqual(languages)
        expect(suggestion.props().legacyDescriptor).toEqual(legacyDescriptor)
        expect(suggestion.props().phoneNumber).toEqual(phoneNumber)
        expect(suggestion.props().races).toEqual(races)
        expect(suggestion.props().ssn).toEqual('test ssn')
      })
    })

    it('displays no results were found', () => {
      const autocompleter = renderAutocompleter({
        total: 0,
        searchTerm: 'Simpson',
      })
      autocompleter.setState({menuVisible: true})
      const suggestionHeader = autocompleter
        .find('Autocomplete')
        .dive()
        .find('SuggestionHeader')
      expect(suggestionHeader.html()).toContain(
        'No results were found for &quot;Simpson&quot;'
      )
    })

    it('displays number of results found', () => {
      const fiveResults = Array.from(Array(5).keys()).map(id => ({
        legacyDescriptor: {legacy_id: id},
      }))
      const autocompleter = renderAutocompleter({
        results: fiveResults,
        total: 10,
        searchTerm: 'Simpson',
      })
      autocompleter.setState({menuVisible: true})
      const suggestionHeader = autocompleter
        .find('Autocomplete')
        .dive()
        .find('SuggestionHeader')
      expect(suggestionHeader.html()).toContain(
        'Showing 1-5 of 10 results for &quot;Simpson&quot;'
      )
    })
  })
})
