import Autocompleter from 'common/search/Autocompleter'
import React from 'react'
import Autocomplete from 'react-autocomplete'
import {shallow, mount} from 'enzyme'
import * as Analytics from 'utils/analytics'
import moment from 'moment'

const defaultPersonSearchFields = {
  searchTerm: '',
  searchAddress: '',
  searchApproximateAge: '',
  searchApproximateAgeUnits: '',
  searchByAgeMethod: '',
  searchCity: '',
  searchClientId: '',
  searchCountry: '',
  searchCounty: '',
  searchDateOfBirth: '',
  searchFirstName: '',
  searchSexAtBirth: '',
  searchLastName: '',
  searchMiddleName: '',
  searchSsn: '',
  searchState: '',
  searchSuffix: '',
  searchZipCode: '',
}

describe('<Autocompleter />', () => {
  function mountAutocompleter({
    canCreateNewPerson = true,
    id = null,
    isSelectable = () => true,
    onBlur = () => null,
    onCancel = () => null,
    onChange = () => null,
    onClear = () => null,
    onLoadMoreResults = () => null,
    onSearch = () => null,
    onSelect = () => null,
    personSearchFields = defaultPersonSearchFields,
    results = [],
    staffId = '0x3',
    total = 0,
    states = [],
    counties = [],
    isAdvancedSearchOn = false,
    dobErrors = [],
    ssnErrors = [],
  }) {
    return mount(
      <Autocompleter
        canCreateNewPerson={canCreateNewPerson}
        id={id}
        isSelectable={isSelectable}
        onBlur={onBlur}
        onCancel={onCancel}
        onChange={onChange}
        onClear={onClear}
        onLoadMoreResults={onLoadMoreResults}
        onSearch={onSearch}
        onSelect={onSelect}
        personSearchFields={personSearchFields}
        results={results}
        staffId={staffId}
        startTime="2018-08-01T16:42:59.674Z"
        total={total}
        states={states}
        counties={counties}
        isAdvancedSearchOn={isAdvancedSearchOn}
        dobErrors={dobErrors}
        ssnErrors={ssnErrors}
      />
    )
  }
  function renderAutocompleter({
    id = null,
    isSelectable = () => true,
    onBlur = () => null,
    onCancel = () => null,
    onChange = () => null,
    onClear = () => null,
    onLoadMoreResults = () => null,
    onSearch = () => null,
    onSelect = () => null,
    personSearchFields = {
      searchTerm: '',
      searchAddress: '',
      searchApproximateAge: '',
      searchApproximateAgeUnits: '',
      searchByAgeMethod: '',
      searchCity: '',
      searchClientId: '',
      searchCountry: '',
      searchCounty: '',
      searchDateOfBirth: '',
      searchFirstName: '',
      searchSexAtBirth: '',
      searchLastName: '',
      searchMiddleName: '',
      searchSsn: '',
      searchState: '',
      searchSuffix: '',
      searchZipCode: '',
    },
    results = [],
    staffId = '0x3',
    total = 0,
    states = [],
    counties = [],
    isAdvancedSearchOn = false,
    dobErrors = [],
    ssnErrors = [],
  }) {
    return shallow(
      <Autocompleter
        id={id}
        isSelectable={isSelectable}
        onBlur={onBlur}
        onCancel={onCancel}
        onChange={onChange}
        onClear={onClear}
        onLoadMoreResults={onLoadMoreResults}
        onSearch={onSearch}
        onSelect={onSelect}
        personSearchFields={personSearchFields}
        results={results}
        staffId={staffId}
        startTime="2018-08-01T16:42:59.674Z"
        total={total}
        states={states}
        counties={counties}
        isAdvancedSearchOn={isAdvancedSearchOn}
        dobErrors={dobErrors}
        ssnErrors={ssnErrors}
      />,
      {disableLifecycleMethods: true}
    )
  }

  beforeEach(() => {
    spyOn(Analytics, 'logEvent')
  })

  describe('#onItemSelect', () => {
    let onLoadMoreResults
    let onCancel
    let onClear
    let onSelect
    let total
    const results = [
      {legacyDescriptor: {legacy_id: 1}},
      {legacyDescriptor: {legacy_id: 2}},
      {legacyDescriptor: {legacy_id: 3}},
    ]
    const item = results[0]

    beforeEach(() => {
      onCancel = jasmine.createSpy('onCancel')
      onClear = jasmine.createSpy('onClear')

      onSelect = jasmine.createSpy('onSelect')
      onLoadMoreResults = jasmine.createSpy('onLoadMoreResults')
    })

    describe('when an item is selectable', () => {
      let autocompleter
      beforeEach(() => {
        autocompleter = mountAutocompleter({
          results,
          onCancel,
          onSelect,
        })
        autocompleter.setState({menuVisible: true})
        autocompleter
          .find('div[id="search-result-1-of-3"]')
          .first()
          .simulate('click', null)
      })

      it('clears the results and the search fields', () => {
        expect(onCancel).toHaveBeenCalled()
      })

      it('calls onSelect with the selected result', () => {
        expect(onSelect).toHaveBeenCalledWith(item)
      })

      it('hides the menu', () => {
        const header = autocompleter.find('SuggestionHeader')
        expect(header.length).toBe(0)
      })

      it('logs a search result event', () => {
        expect(Analytics.logEvent).toHaveBeenCalledWith('searchResultClick', {
          searchIndex: 0,
          staffId: '0x3',
          startTime: moment('2018-08-01T16:42:59.674Z').valueOf(),
        })
      })
    })

    describe('when an item is selectable and is create new person', () => {
      let autocompleter
      beforeEach(() => {
        autocompleter = mountAutocompleter({
          results,
          onCancel,
          onClear,
          onSelect,
        })
        autocompleter.setState({menuVisible: true})
        autocompleter
          .find('div[id="search-result-create-new-of-the-same"]')
          .first()
          .simulate('click', null)
      })

      it('clears the results and the search fields', () => {
        expect(onCancel).toHaveBeenCalled()
      })

      it('calls onSelect with the selected result', () => {
        expect(onSelect).toHaveBeenCalled()
      })

      it('hides the menu', () => {
        const header = autocompleter.find('SuggestionHeader')
        expect(header.length).toBe(0)
      })
    })

    describe('when an item is selectable and is show more results', () => {
      describe(', and canCreateNewPerson and canLoadMoreResults is true', () => {
        let autocompleter
        total = 11
        beforeEach(() => {
          autocompleter = mountAutocompleter({
            results,
            onClear,
            onSelect,
            onLoadMoreResults,
            total,
          })
          autocompleter.setState({menuVisible: true})
          autocompleter
            .find('div[id="search-result-show-more-of-the-same"]')
            .first()
            .simulate('click', null)
        })

        it('calls onLoadMoreResults', () => {
          expect(onLoadMoreResults).toHaveBeenCalled()
        })

        it('contain className col-md-6', () => {
          expect(
            autocompleter
              .find('div[id="search-result-show-more-of-the-same"]')
              .props().className
          ).toContain('col-md-6')
          expect(
            autocompleter
              .find('div[id="search-result-create-new-of-the-same"]')
              .props().className
          ).toContain('col-md-6')
        })
      })

      describe(', and canCreateNewPerson and canLoadMoreResults is false', () => {
        let autocompleter
        const canCreateNewPerson = false
        beforeEach(() => {
          autocompleter = mountAutocompleter({
            results,
            onClear,
            onSelect,
            onLoadMoreResults,
            canCreateNewPerson,
          })
          autocompleter.setState({menuVisible: true})
        })
        it('doesnot contain className col-md-6', () => {
          expect(
            autocompleter
              .find('div[id="search-result-create-new-of-the-same"]')
              .exists()
          ).toBe(false)
          expect(
            autocompleter
              .find('div[id="search-result-show-more-of-the-same"]')
              .exists()
          ).toBe(false)
        })
      })

      describe(', and canCreateNewPerson is true and canLoadMoreResults is false', () => {
        let autocompleter
        const canCreateNewPerson = true
        beforeEach(() => {
          autocompleter = mountAutocompleter({
            results,
            onClear,
            onSelect,
            onLoadMoreResults,
            canCreateNewPerson,
          })
          autocompleter.setState({menuVisible: true})
        })
        it('doesnot contain className col-md-6', () => {
          expect(
            autocompleter
              .find('div[id="search-result-create-new-of-the-same"]')
              .props().className
          ).not.toContain('col-md-6')
          expect(
            autocompleter
              .find('div[id="search-result-show-more-of-the-same"]')
              .exists()
          ).toBe(false)
        })
      })

      describe('isAdvancedSearchOn feature toggle is On', () => {
        it('calls onLoadMoreResults', () => {
          const autocompleter = mountAutocompleter({
            results,
            onClear,
            onSelect,
            onLoadMoreResults,
            total,
            isAdvancedSearchOn: true,
            dobErrors: [],
          })
          autocompleter
            .find('Autocomplete')
            .props()
            .onSelect('_value', {showMoreResults: true})
          expect(onLoadMoreResults).toHaveBeenCalledWith(true, defaultPersonSearchFields)
        })

        it('calls onLoadMoreResults with an address', () => {
          const autocompleter = mountAutocompleter({
            results,
            onClear,
            onSelect,
            onLoadMoreResults,
            total,
            personSearchFields: {
              searchState: '',
              searchCounty: 'Colusa',
              searchCity: 'Central City',
              searchAddress: 'Star Labs',
              searchApproximateAgeUnits: '',
            },
            isAdvancedSearchOn: true,
          })
          autocompleter
            .find('Autocomplete')
            .props()
            .onSelect('_value', {showMoreResults: true})
          expect(onLoadMoreResults).toHaveBeenCalledWith(true, {
            searchState: '',
            searchCounty: 'Colusa',
            searchCity: 'Central City',
            searchAddress: 'Star Labs',
            searchApproximateAgeUnits: '',
          })
        })
      })
    })

    it('logs a search result event when a deeper item is clicked', () => {
      const autocompleter = mountAutocompleter({
        results,
        onClear,
        onSelect,
      })
      autocompleter.setState({menuVisible: true})
      autocompleter
        .find('div[id="search-result-3-of-3"]')
        .first()
        .simulate('click', null)

      expect(Analytics.logEvent).toHaveBeenCalledWith('searchResultClick', {
        searchIndex: 2,
        staffId: '0x3',
        startTime: moment('2018-08-01T16:42:59.674Z').valueOf(),
      })
    })

    describe('when an item is not selectable', () => {
      beforeEach(() => {
        spyOn(window, 'alert')
        const isSelectable = jasmine
          .createSpy('isSelectable')
          .and.returnValue(false)
        const autocompleter = mountAutocompleter({
          results,
          onCancel,
          onSelect,
          isSelectable,
          onLoadMoreResults,
        })
        autocompleter.setState({menuVisible: true})
        autocompleter
          .find('div[id="search-result-1-of-3"]')
          .first()
          .simulate('click', null)
      })

      it('only presents error message', () => {
        expect(onCancel).not.toHaveBeenCalled()
        expect(onSelect).not.toHaveBeenCalled()
        expect(window.alert).toHaveBeenCalledWith(
          'You are not authorized to add this person.'
        )
        expect(onLoadMoreResults).not.toHaveBeenCalled()
      })
    })
  })

  describe('onChangeInput', () => {
    let searchInput
    let onSearch
    let onChange
    beforeEach(() => {
      onSearch = jasmine.createSpy('onSearch')
      onChange = jasmine.createSpy('onChange')
      searchInput = renderAutocompleter({onSearch, onChange})
        .find('Autocomplete')
        .dive()
        .find('input')
    })
    describe('when user types two non whitespace characters', () => {
      const value = 'aa'
      beforeEach(() => searchInput.simulate('change', {target: {value}}))

      it('performs a search', () => {
        expect(onSearch).toHaveBeenCalledWith(false, {searchTerm: value})
      })

      it('calls props onChange', () => {
        expect(onChange).toHaveBeenCalledWith('searchTerm', value)
      })
    })
    describe('when search value contains a character then a whitespace', () => {
      const value = 'a '
      beforeEach(() => searchInput.simulate('change', {target: {value}}))

      it('performs a search', () => {
        expect(onSearch).toHaveBeenCalledWith(false, {searchTerm: value})
      })

      it('calls props onChange', () => {
        expect(onChange).toHaveBeenCalledWith('searchTerm', value)
      })
    })
    describe('when search value contains two whitespace characters', () => {
      const value = '  '
      beforeEach(() => searchInput.simulate('change', {target: {value}}))

      it('does not perform a search', () => {
        expect(onSearch).not.toHaveBeenCalled()
      })

      it('calls props onChange', () => {
        expect(onChange).toHaveBeenCalledWith('searchTerm', value)
      })
    })
    describe('when search value contains a whitespace then a character', () => {
      const value = ' a'
      beforeEach(() => searchInput.simulate('change', {target: {value}}))

      it('does not perform a search', () => {
        expect(onSearch).not.toHaveBeenCalled()
      })

      it('calls props onChange', () => {
        expect(onChange).toHaveBeenCalledWith('searchTerm', value)
      })
    })
    describe('when isAdvancedSearchOn flag is on', () => {
      it('does not perform a search', () => {
        const isAdvancedSearchOn = true
        const value = 'Girish'
        const searchInput = renderAutocompleter({onSearch, onChange, isAdvancedSearchOn})
          .find('Autocomplete')
          .dive()
          .find('input')
        searchInput.simulate('change', {target: {value}})

        expect(onSearch).not.toHaveBeenCalled()
      })
    })
  })

  describe('handleSubmit', () => {
    let onClear
    let onSearch
    let onChange

    beforeEach(() => {
      onClear = jasmine.createSpy('onClear')
      onSearch = jasmine.createSpy('onSearch')
      onChange = jasmine.createSpy('onChange')
    })

    it('searches when button is submitted', () => {
      const autocompleter = renderAutocompleter({
        onChange,
        onSearch,
        isAdvancedSearchOn: true,
        personSearchFields: {
          searchLastName: 'Sandiego',
          searchFirstName: 'Carmen',
          searchSuffix: 'Jr',
          searchAddress: '123 Main St',
          searchCity: 'Woodland',
          searchCounty: 'Yolo',
          searchApproximateAge: '24',
          searchApproximateAgeUnits: 'months',
        },
      })
      const personSearchFields = autocompleter.find('PersonSearchFields')
      personSearchFields.props().onSubmit()
      expect(onSearch).toHaveBeenCalledWith(true, {
        searchLastName: 'Sandiego',
        searchFirstName: 'Carmen',
        searchSuffix: 'Jr',
        searchAddress: '123 Main St',
        searchCity: 'Woodland',
        searchCounty: 'Yolo',
        searchApproximateAge: '24',
        searchApproximateAgeUnits: 'months',
      })
    })

    describe('sets the search term', () => {
      describe('search by age method is', () => {
        describe('date of birth', () => {
          it('sets the search term with date of birth', () => {
            const autocompleter = renderAutocompleter({
              onChange,
              onSearch,
              isAdvancedSearchOn: true,
              personSearchFields: {
                searchLastName: 'Sandiego',
                searchFirstName: 'Carmen',
                searchSuffix: 'Jr',
                searchByAgeMethod: 'dob',
                searchDateOfBirth: '1985/09/09',
                searchApproximateAge: '120',
                searchApproximateAgeUnits: 'years',
              },
            })
            const personSearchFields = autocompleter.find('PersonSearchFields')
            personSearchFields.props().onSubmit()
            expect(onChange).toHaveBeenCalledWith('searchTerm', 'Carmen Sandiego, Jr 1985/09/09')
          })
        })
        describe('approximate age', () => {
          it('sets the search term with approximate age and units', () => {
            const autocompleter = renderAutocompleter({
              onChange,
              onSearch,
              isAdvancedSearchOn: true,
              personSearchFields: {
                searchLastName: 'Sandiego',
                searchFirstName: 'Carmen',
                searchSuffix: 'Jr',
                searchByAgeMethod: 'approximate',
                searchDateOfBirth: '1985/09/09',
                searchApproximateAge: '120',
                searchApproximateAgeUnits: 'years',
              },
            })
            const personSearchFields = autocompleter.find('PersonSearchFields')
            personSearchFields.props().onSubmit()
            expect(onChange).toHaveBeenCalledWith('searchTerm', 'Carmen Sandiego, Jr 120 years')
          })
        })
      })
    })

    it('displays search results when button is submitted', () => {
      const autocompleter = renderAutocompleter({
        personSearchFields: {searchTerm: '', searchAddress: '123 Main St', searchCity: 'Woodland', searchCounty: 'Sacramento'},
      })
      const personSearchFields = autocompleter.find('PersonSearchFields')
      expect(autocompleter.state().menuVisible).toEqual(false)
      personSearchFields.props().onSubmit()
      expect(autocompleter.state().menuVisible).toEqual(true)
    })

    it('clears old results when button is submitted', () => {
      const autocompleter = renderAutocompleter({
        onClear,
        personSearchFields: {searchTerm: '', searchAddress: '123 Main St', searchCity: 'Woodland', searchCounty: 'Sacramento'},
      })
      const personSearchFields = autocompleter.find('PersonSearchFields')
      personSearchFields.props().onSubmit()
      expect(onClear).toHaveBeenCalledWith('results')
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

    it('stores a ref of the input', () => {
      const autocompleter = mountAutocompleter({})
      const inputRef = autocompleter.instance().inputRef
      expect(inputRef).toBeDefined()
      expect(inputRef.tagName).toEqual('INPUT')
    })

    it('calls the ref callback that ReactAutocomplete provides', () => {
      const internalRef = spyOn(Autocomplete.prototype, 'exposeAPI')
      mountAutocompleter({})
      expect(internalRef).toHaveBeenCalled()
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
      beforeEach(() => {
        autocompleter = mountAutocompleter({results})
        autocompleter.setState({menuVisible: true})
      })

      it('displays multiple suggestions', () => {
        const suggestions = autocompleter.find('PersonSuggestion')
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

      it('changes className when highlighted', () => {
        const input = autocompleter.find('input').at(0)
        autocompleter.setState({menuVisible: true})
        const resultBefore = autocompleter.find(
          'div[id="search-result-1-of-2"]'
        )
        expect(resultBefore.props().className).not.toEqual(
          'search-item highlighted-search-item'
        )

        input.simulate('keyDown', {key: 'ArrowDown', keyCode: 40, which: 40})
        input.simulate('keyDown', {key: 'ArrowDown', keyCode: 40, which: 40})
        const result = autocompleter.find('div[id="search-result-1-of-2"]')
        expect(result.props().className).toEqual(
          'search-item highlighted-search-item'
        )
      })

      it('when enter is pressed it should not highlight', () => {
        const input = autocompleter.find('input').at(0)
        input.simulate('keyDown', {key: 'Enter', keyCode: 13, which: 13})
        autocompleter.setState({menuVisible: true})
        const result = autocompleter.find('div[id="search-result-1-of-2"]')
        expect(result.props().className).not.toEqual(
          'search-item highlighted-search-item'
        )
      })

      it('marks any highlighted item as activedescendant', () => {
        const renderItem = autocompleter.find('Autocomplete').props().renderItem

        const setSize = results.length
        let posInSet = 1
        renderItem(results[posInSet - 1], true)

        expect(
          autocompleter
            .instance()
            .inputRef.getAttribute('aria-activedescendant')
        ).toEqual(`search-result-${posInSet}-of-${setSize}`)

        posInSet = 2
        renderItem(results[posInSet - 1], true)

        expect(
          autocompleter
            .instance()
            .inputRef.getAttribute('aria-activedescendant')
        ).toEqual(`search-result-${posInSet}-of-${setSize}`)
      })
    })

    describe('suggestion header', () => {
      it('displays no results were found', () => {
        const autocompleter = mountAutocompleter({
          total: 0,
          personSearchFields: {searchTerm: 'Simpson', searchCounty: '', searchState: ''},
        })
        autocompleter.setState({menuVisible: true})
        const suggestionHeader = autocompleter.find('SuggestionHeader')
        expect(suggestionHeader.html()).toContain(
          'No results were found for "Simpson"'
        )
      })

      it('displays number of results found', () => {
        const tenResults = Array.from(Array(10).keys()).map(id => ({
          legacyDescriptor: {legacy_id: id},
        }))
        const autocompleter = mountAutocompleter({
          results: tenResults,
          total: 20,
          personSearchFields: {
            searchTerm: 'Simpson Jr 120 years',
            searchCounty: '',
            searchState: '',
          },
        })
        autocompleter.setState({menuVisible: true})
        const suggestionHeader = autocompleter.find('SuggestionHeader')
        expect(suggestionHeader.html()).toContain(
          'Showing 1-10 of 20 results for "Simpson Jr 120 years"'
        )
      })
    })
  })

  it('renders PersonSearchFields with personSearchFields', () => {
    const component = renderAutocompleter({})
    const personSearchFields = component.find('PersonSearchFields')
    expect(personSearchFields.exists()).toBe(true)
    expect(personSearchFields.props().personSearchFields).toEqual(defaultPersonSearchFields)
  })

  it('renders PersonSearchFields with selected county', () => {
    const component = renderAutocompleter({personSearchFields: {searchCounty: 'Yolo'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchCounty).toBe('Yolo')
  })

  it('renders PersonSearchFields with selected lastName', () => {
    const component = renderAutocompleter({personSearchFields: {searchLastName: 'Bravo'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchLastName).toBe('Bravo')
  })

  it('calls onChange when a new lastName is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchLastName', 'Bravo')
    expect(onChange).toHaveBeenCalledWith('searchLastName', 'Bravo')
  })

  it('calls onClear when the clear link is clicked', () => {
    const onClear = jasmine.createSpy('onClear')
    const component = renderAutocompleter({onClear})
    component.find('PersonSearchFields').props().onClear('age')
    expect(onClear).toHaveBeenCalledWith('age')
  })

  it('renders PersonSearchFields with selected firstName', () => {
    const component = renderAutocompleter({personSearchFields: {searchFirstName: 'Miguel'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchFirstName).toBe('Miguel')
  })

  it('calls onChange when a new firstName is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchFirstName', 'Miguel')
    expect(onChange).toHaveBeenCalledWith('searchFirstName', 'Miguel')
  })

  it('renders PersonSearchFields with selected middleName', () => {
    const component = renderAutocompleter({personSearchFields: {searchMiddleName: 'Angel'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchMiddleName).toBe('Angel')
  })

  it('calls onChange when a new middleName is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchMiddleName', 'Angel')
    expect(onChange).toHaveBeenCalledWith('searchMiddleName', 'Angel')
  })

  it('renders PersonSearchFields with selected clientId', () => {
    const component = renderAutocompleter({personSearchFields: {searchClientId: '1'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchClientId).toBe('1')
  })

  it('calls onChange when a new clientId is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchClientId', '2')
    expect(onChange).toHaveBeenCalledWith('searchClientId', '2')
  })

  it('renders PersonSearchFields with selected suffix', () => {
    const component = renderAutocompleter({personSearchFields: {searchSuffix: 'Jr'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchSuffix).toBe('Jr')
  })

  it('calls onChange when new suffix is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchSuffix', 'Sr')
    expect(onChange).toHaveBeenCalledWith('searchSuffix', 'Sr')
  })

  it('renders PersonSearchFields with selected ssn', () => {
    const component = renderAutocompleter({personSearchFields: {searchSsn: '111223333'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchSsn).toBe('111223333')
  })

  it('calls onChange when a new ssn is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchSsn', '222334444')
    expect(onChange).toHaveBeenCalledWith('searchSsn', '222334444')
  })

  it('renders PersonSearchFields with selected dateOfBirth', () => {
    const component = renderAutocompleter({personSearchFields: {searchDateOfBirth: '01/01/2000'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchDateOfBirth).toBe('01/01/2000')
  })

  it('calls onChange when new dateOfBirth is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchDateOfBirth', '02/02/2001')
    expect(onChange).toHaveBeenCalledWith('searchDateOfBirth', '02/02/2001')
  })

  it('renders PersonSearchFields with selected age value', () => {
    const component = renderAutocompleter({personSearchFields: {searchApproximateAge: '1'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchApproximateAge).toBe('1')
  })

  it('calls onChange when a new age value is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchApproximateAge', '2')
    expect(onChange).toHaveBeenCalledWith('searchApproximateAge', '2')
  })

  it('renders PersonSearchFields with selected approximateAgeUnits', () => {
    const component = renderAutocompleter({personSearchFields: {searchApproximateAgeUnits: 'Months'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchApproximateAgeUnits).toBe('Months')
  })

  it('calls onChange when new approximateAgeUnits is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchApproximateAgeUnits', 'Years')
    expect(onChange).toHaveBeenCalledWith('searchApproximateAgeUnits', 'Years')
  })

  it('renders PersonSearchFields with selected sex at birth', () => {
    const component = renderAutocompleter({personSearchFields: {searchSexAtBirth: 'Female'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchSexAtBirth).toBe('Female')
  })

  it('calls onChange when new sex at birth is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchSexAtBirth', 'Male')
    expect(onChange).toHaveBeenCalledWith('searchSexAtBirth', 'Male')
  })

  it('renders PersonSearchFields with selected address', () => {
    const component = renderAutocompleter({personSearchFields: {searchAddress: 'Goodbye Road'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchAddress).toBe('Goodbye Road')
  })

  it('calls onChange when new address is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchAddress', 'Penny Lane')
    expect(onChange).toHaveBeenCalledWith('searchAddress', 'Penny Lane')
  })

  it('renders PersonSearchFields with selected city', () => {
    const component = renderAutocompleter({personSearchFields: {searchCity: 'Emerald City'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchCity).toBe('Emerald City')
  })

  it('calls onChange when new city is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchCity', 'Woodland')
    expect(onChange).toHaveBeenCalledWith('searchCity', 'Woodland')
  })

  it('renders PersonSearchFields with selected county', () => {
    const component = renderAutocompleter({personSearchFields: {searchCounty: 'Yolo'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchCounty).toBe('Yolo')
  })

  it('calls onChange when new county is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchCounty', 'Yolo')
    expect(onChange).toHaveBeenCalledWith('searchCounty', 'Yolo')
  })

  it('renders PersonSearchFields with selected state', () => {
    const component = renderAutocompleter({personSearchFields: {searchState: 'California'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchState).toBe('California')
  })

  it('calls onChange when new state is selected', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchState', 'Nevada')
    expect(onChange).toHaveBeenCalledWith('searchState', 'Nevada')
  })

  it('renders PersonSearchFields with selected country', () => {
    const component = renderAutocompleter({personSearchFields: {searchCountry: 'United States'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchCountry).toBe('United States')
  })

  it('calls onChange when new country is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchCountry', 'Mexico')
    expect(onChange).toHaveBeenCalledWith('searchCountry', 'Mexico')
  })

  it('renders PersonSearchFields with selected zip code', () => {
    const component = renderAutocompleter({personSearchFields: {searchZipCode: '12345'}})
    expect(component.find('PersonSearchFields').props().personSearchFields.searchZipCode).toBe('12345')
  })

  it('calls onChange when new zip code is entered', () => {
    const onChange = jasmine.createSpy('onChange')
    const component = renderAutocompleter({onChange})
    component.find('PersonSearchFields').props().onChange('searchZipCode', '54321')
    expect(onChange).toHaveBeenCalledWith('searchZipCode', '54321')
  })
})
