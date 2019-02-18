import PersonSuggestion from 'common/PersonSuggestion'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import Autocomplete from 'react-autocomplete'
import SuggestionHeader from 'common/SuggestionHeader'
import CreateUnknownPerson from 'screenings/CreateUnknownPerson'
import ShowMoreResults from 'common/ShowMoreResults'
import {logEvent} from 'utils/analytics'
import moment from 'moment'
import PersonSearchFields from 'common/search/PersonSearchFields'

const MIN_SEARCHABLE_CHARS = 2

const addPosAndSetAttr = results => {
  const one = 1
  for (let len = results.length, i = 0; i < len; ++i) {
    results[i].posInSet = i + one
    results[i].setSize = len
  }
}

const itemClassName = isHighlighted =>
  `search-item${isHighlighted ? ' highlighted-search-item' : ''}`

export default class Autocompleter extends Component {
  constructor(props) {
    super(props)

    this.state = {menuVisible: false}
    this.hideMenu = this.hideMenu.bind(this)
    this.onItemSelect = this.onItemSelect.bind(this)
    this.renderMenu = this.renderMenu.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  constructAddress() {
    const {
      searchAddress,
      searchCity,
      searchCounty,
    } = this.props.personSearchFields
    return {
      address: searchAddress,
      city: searchCity,
      county: searchCounty,
    }
  }

  searchAndFocus(...searchArgs) {
    this.props.onSearch(...searchArgs)
    this.setState({menuVisible: true})
    if (this.inputRef) {
      this.inputRef.focus()
    }
  }

  handleSubmit() {
    const {onClear, personSearchFields} = this.props
    const {searchTerm} = personSearchFields
    onClear()
    this.searchAndFocus(searchTerm, this.constructAddress())
  }

  isSearchable(value) {
    return value && value.replace(/^\s+/, '').length >= MIN_SEARCHABLE_CHARS
  }

  hideMenu() {
    if (this.inputRef) {
      this.inputRef.setAttribute('aria-activedescendant', '')
    }
    this.setState({menuVisible: false})
  }

  loadMoreResults() {
    this.props.onLoadMoreResults(this.constructAddress())
    this.element_ref.setIgnoreBlur(true)
    if (this.inputRef) {
      this.inputRef.focus()
    }
  }

  onSelect(item) {
    this.props.onCancel()
    this.props.onSelect(item)
    this.hideMenu()
  }

  onButtonSelect(item) {
    if (item.createNewPerson) {
      return this.onSelect({id: null})
    } else if (item.suggestionHeader) {
      return false
    } else {
      return this.loadMoreResults()
    }
  }

  onItemSelect(_value, item) {
    const {isSelectable, staffId, startTime} = this.props

    if (!item.legacyDescriptor) {
      this.onButtonSelect(item)
      return
    } else if (!isSelectable(item)) {
      alert('You are not authorized to add this person.') // eslint-disable-line no-alert
      return
    }

    logEvent('searchResultClick', {
      searchIndex: this.props.results.indexOf(item),
      staffId,
      startTime: moment(startTime).valueOf(),
    })
    this.onSelect(item)
  }

  renderMenu(items, _searchTerm, _style) {
    return <div className="autocomplete-menu">{items}</div>
  }

  renderEachItem(item, id, isHighlighted) {
    const {total, results, personSearchFields} = this.props
    const {searchTerm} = personSearchFields
    const key = `${item.posInSet}-of-${item.setSize}`
    if (item.suggestionHeader) {
      return (
        <div id={id} key={key} aria-live="polite">
          <SuggestionHeader
            currentNumberOfResults={results.length}
            total={total}
            searchTerm={searchTerm}
          />
        </div>
      )
    }
    return (
      <div id={id} key={key} className={itemClassName(isHighlighted)}>
        <PersonSuggestion {...item} />
      </div>
    )
  }

  renderItem(item, isHighlighted, _styles) {
    const {canCreateNewPerson, results, total} = this.props
    const canLoadMoreResults = results && total > results.length
    const buttonClassName =
      canLoadMoreResults && canCreateNewPerson ? ' col-md-6' : ''
    const className = itemClassName(isHighlighted) + buttonClassName
    const key = `${item.posInSet}-of-${item.setSize}`
    const id = `search-result-${key}`
    if (isHighlighted && this.inputRef) {
      this.inputRef.setAttribute('aria-activedescendant', id)
    }
    if (item.showMoreResults) {
      return (
        <div id={id} key={key} className={className}>
          {<ShowMoreResults />}
        </div>
      )
    }
    if (item.createNewPerson) {
      return (
        <div id={id} key={key} className={className}>
          {<CreateUnknownPerson />}
        </div>
      )
    }
    return this.renderEachItem(item, id, isHighlighted)
  }

  renderInput(props) {
    const newProps = {
      ...props,
      ref: el => {
        this.inputRef = el
        props.ref(el)
      },
    }
    return <input {...newProps} />
  }

  renderAutocomplete() {
    const {
      personSearchFields,
      id,
      results,
      canCreateNewPerson,
      total,
    } = this.props
    const {searchTerm} = personSearchFields
    const showMoreResults = {
      showMoreResults: 'Show More Results',
      posInSet: 'show-more',
      setSize: 'the-same',
    }
    const createNewPerson = {
      createNewPerson: 'Create New Person',
      posInSet: 'create-new',
      setSize: 'the-same',
    }
    const suggestionHeader = [{suggestionHeader: 'suggestion Header'}]
    const canLoadMoreResults = results && total > results.length
    addPosAndSetAttr(results) // Sequentually numbering items
    const newResults = suggestionHeader.concat(
      results.concat(
        canLoadMoreResults ? showMoreResults : [],
        canCreateNewPerson ? createNewPerson : []
      )
    )

    return (
      <Autocomplete
        ref={el => (this.element_ref = el)}
        getItemValue={_ => searchTerm}
        inputProps={{id, className: 'autocomplete-search-bar'}}
        items={newResults}
        onSelect={this.onItemSelect}
        renderItem={this.renderItem}
        open={this.state.menuVisible}
        renderMenu={this.renderMenu}
        value={searchTerm}
        wrapperStyle={{display: 'block'}}
        renderInput={props => this.renderInput(props)}
      />
    )
  }

  renderPersonSearchFields() {
    const {onChange, onCancel, personSearchFields} = this.props

    return (
      <PersonSearchFields
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={this.handleSubmit}
        personSearchFields={personSearchFields}
      />
    )
  }

  render() {
    return (
      <div>
        {this.renderAutocomplete()}
        {this.renderPersonSearchFields()}
      </div>
    )
  }
}

Autocompleter.propTypes = {
  canCreateNewPerson: PropTypes.bool,
  id: PropTypes.string,
  isSelectable: PropTypes.func,
  location: PropTypes.shape({pathname: PropTypes.string}),
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onLoadMoreResults: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  personSearchFields: PropTypes.shape({
    searchAddress: PropTypes.string,
    searchApproximateAge: PropTypes.string,
    searchApproximateAgeUnits: PropTypes.string,
    searchCity: PropTypes.string,
    searchClientId: PropTypes.string,
    searchCountry: PropTypes.string,
    searchCounty: PropTypes.string,
    searchDateOfBirth: PropTypes.string,
    searchFirstName: PropTypes.string,
    searchSexAtBirth: PropTypes.string,
    searchLastName: PropTypes.string,
    searchMiddleName: PropTypes.string,
    searchSsn: PropTypes.string,
    searchState: PropTypes.string,
    searchSuffix: PropTypes.string,
    searchTerm: PropTypes.string,
    searchZipCode: PropTypes.string,
  }),
  results: PropTypes.array,
  staffId: PropTypes.string,
  startTime: PropTypes.string,
  total: PropTypes.number,
}

Autocompleter.defaultProps = {
  isSelectable: () => true,
}

Autocompleter.displayName = 'Autocompleter'
