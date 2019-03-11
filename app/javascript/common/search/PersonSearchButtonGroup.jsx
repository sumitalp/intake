import React from 'react'
import PropTypes from 'prop-types'
import {PersonSearchFieldsPropType, PersonSearchFieldsDefaultProps} from 'data/personSearch'

const MIN_SEARCHABLE_CHARS = 2

const isSearchable = value =>
  value && value.replace(/^\s+/, '').length >= MIN_SEARCHABLE_CHARS

const canSearch = ({
  searchLastName,
  searchFirstName,
  searchMiddleName,
  searchClientId,
  searchSsn,
  searchDateOfBirth,
  searchAddress,
}) => {
  const fields = [searchLastName, searchFirstName, searchMiddleName, searchClientId, searchSsn, searchDateOfBirth, searchAddress]
  const searchableFields = fields.filter(field => isSearchable(field))
  return Boolean(searchableFields.length)
}

const PersonSearchButtonGroup = ({
  onSubmit,
  onCancel,
  personSearchFields,
}) => (
  <div className="row person-search-field-group">
    <div className="col-md-12">
      <button
        className="btn btn-primary person-search-button search"
        onClick={onSubmit}
        disabled={!canSearch(personSearchFields)}
      >
        Search
      </button>
      <button
        className="btn btn-primary person-search-button clear"
        onClick={onCancel}
      >
        Clear All
      </button>
    </div>
  </div>
)

PersonSearchButtonGroup.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  personSearchFields: PersonSearchFieldsPropType,
}

PersonSearchButtonGroup.defaultProps = PersonSearchFieldsDefaultProps

export default PersonSearchButtonGroup
