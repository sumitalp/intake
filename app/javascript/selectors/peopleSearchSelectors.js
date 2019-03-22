import {List, Map} from 'immutable'
import {
  selectCounties,
  systemCodeDisplayValue,
} from 'selectors/systemCodeSelectors'
import {
  mapLanguages,
  mapIsSensitive,
  mapIsSealed,
  mapIsProbationYouth,
  mapRaces,
  mapEthnicities,
  mapAddress,
  mapPhoneNumber,
} from 'utils/peopleSearchHelper'
import {isCommaSuffix, formatHighlightedSuffix} from 'utils/nameFormatter'
import {phoneNumberFormatter} from 'utils/phoneNumberFormatter'
import Fuse from 'fuse.js'
import {getClientIdErrors} from 'utils/clientIdValidator'
import {getSSNErrors} from 'utils/ssnValidator'

const selectPeopleSearch = state => {
  return state.get('peopleSearch')
}
export const selectSearchTermValue = state =>
  selectPeopleSearch(state).get('searchTerm')
export const selectResultsTotalValue = state =>
  selectPeopleSearch(state).get('total')
export const selectLastResultsSortValue = state => {
  const lastResult = selectPeopleSearch(state)
    .get('results')
    .last()
  return lastResult.get('sort').toJS()
}

const formatSSN = ssn => ssn && ssn.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3')
const formatDOB = (dob, highlight) =>
  highlight ? '<em>'.concat(dob, '</em>') : dob
const formatPhoneNumber = phoneNumber =>
  phoneNumber ?
    Map({
      number: phoneNumberFormatter(phoneNumber.get('number')),
      type: phoneNumber.get('type'),
    }) :
    null

// Try to find a match from a list of highlights by stripping out <em> tags
const highlightNameField = (exactName, highlights) =>
  highlights.find(
    highlight => highlight.replace(/<(\/)?em>/g, '') === exactName
  )

const maybeHighlightedField = (result, highlight, key) =>
  highlight.getIn(
    [key, 0],
    highlightNameField(
      result.get(key),
      highlight.get('autocomplete_search_bar', List())
    )
  )

const combineFullName = (
  firstName,
  middleName,
  lastName,
  nameSuffix,
  isCommaSuffix
) => {
  const nameStem = [firstName, middleName, lastName].filter(Boolean).join(' ')

  if (nameSuffix) {
    return `${nameStem}${isCommaSuffix ? ',' : ''} ${nameSuffix}`
  }

  return nameStem
}

const formatFullName = (result, highlight) =>
  combineFullName(
    maybeHighlightedField(result, highlight, 'first_name') ||
    result.get('first_name'),
    maybeHighlightedField(result, highlight, 'middle_name') ||
    result.get('middle_name'),
    maybeHighlightedField(result, highlight, 'last_name') ||
    result.get('last_name'),
    formatHighlightedSuffix(
      maybeHighlightedField(result, highlight, 'name_suffix') ||
      result.get('name_suffix')
    ),
    isCommaSuffix(result.get('name_suffix'))
  )

const mapCounties = (counties, countyCodes) =>
  counties.map(county => systemCodeDisplayValue(county.get('id'), countyCodes))

const hasActiveCsec = _result => false

export const selectAkaFullName = (state, result) => {
  const akas = result.get('akas', List()).toJS()
  const searchTerm = selectSearchTermValue(state)
  const options = {
    threshold: 0.7,
    keys: ['first_name', 'last_name', 'middle_name'],
  }
  const fuse = new Fuse(akas, options)
  const aka = fuse.search(searchTerm)[0]
  if (!aka) {
    return null
  }
  return ` (${aka.name_type || ''}: ${aka.first_name || ''} ${aka.last_name ||
    ''})`
}

export const selectPeopleResults = (state) => selectPeopleSearch(state)
  .get('results')
  .map((fullResult) => {
    const result = fullResult.get('_source', Map())
    const highlight = fullResult.get('highlight', Map())
    return Map({
      akaFullName: selectAkaFullName(state, result),
      legacy_id: result.get('id'),
      fullName: formatFullName(result, highlight),
      legacyDescriptor: result.get('legacy_descriptor'),
      gender: result.get('gender'),
      languages: mapLanguages(state, result),
      races: mapRaces(state, result),
      ethnicity: mapEthnicities(state, result),
      dateOfBirth: formatDOB(result.get('date_of_birth'), highlight.has('searchable_date_of_birth')),
      isDeceased: Boolean(result.get('date_of_death')),
      isCsec: hasActiveCsec(result),
      ssn: formatSSN(maybeHighlightedField(result, highlight, 'ssn') || result.get('ssn')),
      clientCounties: mapCounties(result.get('client_counties', List()), selectCounties(state)),
      address: mapAddress(state, result),
      phoneNumber: formatPhoneNumber(mapPhoneNumber(result).first()),
      isSensitive: mapIsSensitive(result),
      isSealed: mapIsSealed(result),
      isProbationYouth: mapIsProbationYouth(result),
    })
  })

export const selectStartTime = state =>
  selectPeopleSearch(state).get('startTime')

export const selectPersonCreatedAtTime = state =>
  state
    .get('relationshipsQueryCycleTime')
    .toJS()
    .map(t => t.personCreatedAtTime)
    .pop()

export const selectClientIdError = (state) => {
  const clientIdError = selectPeopleSearch(state).get('clientIdError')
  const clientId = selectPeopleSearch(state).get('searchClientId') || ''
  const clientIdWithoutHyphens = clientId.replace(/-|_/g, '')
  return clientIdError ? getClientIdErrors(clientIdWithoutHyphens) : []
}

export const selectSsnErrors = (state) => {
  const ssnError = selectPeopleSearch(state).get('ssnError')
  const ssn = selectPeopleSearch(state).get('searchSsn')
  const ssnWithoutHyphens = ssn.replace(/-|_/g, '')
  return ssnError ? getSSNErrors(ssnWithoutHyphens) : []
}

export const selectPersonSearchFields = state => {
  const personSearchFields = {
    searchTerm: selectPeopleSearch(state).get('searchTerm'),
    searchLastName: selectPeopleSearch(state).get('searchLastName'),
    searchFirstName: selectPeopleSearch(state).get('searchFirstName'),
    searchMiddleName: selectPeopleSearch(state).get('searchMiddleName'),
    searchClientId: selectPeopleSearch(state).get('searchClientId'),
    searchSuffix: selectPeopleSearch(state).get('searchSuffix'),
    searchSsn: selectPeopleSearch(state).get('searchSsn'),
    searchDateOfBirth: selectPeopleSearch(state).get('searchDateOfBirth'),
    searchApproximateAge: selectPeopleSearch(state).get('searchApproximateAge'),
    searchApproximateAgeUnits: selectPeopleSearch(state).get(
      'searchApproximateAgeUnits'
    ),
    searchSexAtBirth: selectPeopleSearch(state).get('searchSexAtBirth'),
    searchAddress: selectPeopleSearch(state).get('searchAddress'),
    searchCity: selectPeopleSearch(state).get('searchCity'),
    searchCounty: selectPeopleSearch(state).get('searchCounty'),
    searchState: selectPeopleSearch(state).get('searchState'),
    searchCountry: selectPeopleSearch(state).get('searchCountry'),
    searchZipCode: selectPeopleSearch(state).get('searchZipCode'),
  }
  return personSearchFields
}
