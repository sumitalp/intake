import React from 'react'
import PropTypes from 'prop-types'
import {PersonSearchFieldsPropType, PersonSearchFieldsDefaultProps} from 'data/personSearch'

const LAST_NAME_MIN_SEARCHABLE_CHARS = 1
const CLIENT_ID_MIN_SEARCHABLE_CHARS = 19
const SSN_MIN_SEARCHABLE_CHARS = 9

const isSearchable = (value, min) => {
  if (min === LAST_NAME_MIN_SEARCHABLE_CHARS) {
    return value && value.length >= min
  }
  return value && value.replace(/-|_/g, '').length === min
}

let emptyCheckForLastName
let emptyCheckForClientId
let emptyCheckForSsn
let emptyCheckForFields = true

const isEmptyCheckForLastName = (searchableLastName) => {
  if (searchableLastName === '') {
    emptyCheckForLastName = true
  } else {
    emptyCheckForLastName = false
  }
}
const isEmptyCheckForClientId = (searchableClientId) => {
  if (searchableClientId === '') {
    emptyCheckForClientId = true
  } else {
    emptyCheckForClientId = false
  }
}
const isEmptyCheckForSsn = (searchableSsn) => {
  if (searchableSsn === '') {
    emptyCheckForSsn = true
  } else {
    emptyCheckForSsn = false
  }
}
const isEmptyCheckForFields = (searchLastName, searchClientId, searchSsn, searchDateOfBirth) => {
  if (searchLastName === '' && searchClientId === '' && searchSsn === '' && searchDateOfBirth === '') {
    emptyCheckForFields = false
  } else {
    emptyCheckForFields = true
  }
}
const canSearchable = (searchableLastName, searchableClientId, searchableSsn, dobErrors, ssnErrors) => {
  const isSearchableLastName = emptyCheckForLastName || searchableLastName
  const isSearchableClientId = emptyCheckForClientId || searchableClientId
  const isSearchableSsn = emptyCheckForSsn || searchableSsn
  const isSearchableDobErrors = dobErrors.length === 0
  const isSearchableSsnErrors = ssnErrors.length === 0
  const isSearchable = emptyCheckForFields && isSearchableLastName &&
    isSearchableClientId && isSearchableSsn && isSearchableDobErrors &&
    isSearchableSsnErrors
  return isSearchable
}

const canSearch = (personSearchFields, dobErrors, ssnErrors) => {
  const {searchLastName, searchClientId, searchSsn, searchDateOfBirth} = personSearchFields
  const searchableLastName = isSearchable(searchLastName, LAST_NAME_MIN_SEARCHABLE_CHARS)
  const searchableClientId = isSearchable(searchClientId, CLIENT_ID_MIN_SEARCHABLE_CHARS)
  const searchableSsn = isSearchable(searchSsn, SSN_MIN_SEARCHABLE_CHARS)
  isEmptyCheckForFields(searchLastName, searchClientId, searchSsn, searchDateOfBirth)
  isEmptyCheckForLastName(searchableLastName)
  isEmptyCheckForClientId(searchableClientId)
  isEmptyCheckForSsn(searchableSsn)
  return canSearchable(searchableLastName, searchableClientId, searchableSsn, dobErrors, ssnErrors)
}

const PersonSearchButtonGroup = ({
  onSubmit,
  onCancel,
  personSearchFields,
  dobErrors,
  ssnErrors,
}) => (
  <div className="row person-search-field-group">
    <div className="col-md-12">
      <button
        className="btn person-search-button search"
        onClick={onSubmit}
        disabled={!canSearch(personSearchFields, dobErrors, ssnErrors)}
      >
        Search
      </button>
      <button
        className="btn person-search-button clear"
        onClick={onCancel}
      >
        Clear All
      </button>
    </div>
  </div>
)

PersonSearchButtonGroup.propTypes = {
  dobErrors: PropTypes.array,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  personSearchFields: PersonSearchFieldsPropType,
  ssnErrors: PropTypes.array,
}

PersonSearchButtonGroup.defaultProps = PersonSearchFieldsDefaultProps

export default PersonSearchButtonGroup
