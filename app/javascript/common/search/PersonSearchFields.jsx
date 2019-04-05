import React from 'react'
import PropTypes from 'prop-types'
import PersonSearchNameGroup from 'common/search/PersonSearchNameGroup'
import PersonSearchNumbersAgeGroup from 'common/search/PersonSearchNumbersAgeGroup'
import PersonSearchButtonGroup from 'common/search/PersonSearchButtonGroup'
import {PersonSearchFieldsPropType} from 'data/personSearch'

const PersonSearchFields = ({
  onBlur,
  onChange,
  onCancel,
  onClear,
  onSubmit,
  personSearchFields,
  clientIdError,
  ssnErrors,
  dobErrors,
  isAdvancedSearchOn,
  canSearch,
}) => isAdvancedSearchOn ? (
  <div>
    <PersonSearchNameGroup
      onChange={onChange}
      personSearchFields={personSearchFields}
    />
    <PersonSearchNumbersAgeGroup
      onBlur={onBlur}
      onChange={onChange}
      onClear={onClear}
      personSearchFields={personSearchFields}
      clientIdError={clientIdError}
      ssnErrors={ssnErrors}
      dobErrors={dobErrors}
    />
    <PersonSearchButtonGroup
      onSubmit={onSubmit}
      onCancel={onCancel}
      canSearch={canSearch}
    />
  </div>
) : null

PersonSearchFields.propTypes = {
  canSearch: PropTypes.bool,
  clientIdError: PropTypes.array,
  dobErrors: PropTypes.array,
  isAdvancedSearchOn: PropTypes.bool,
  onBlur: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  personSearchFields: PersonSearchFieldsPropType,
  ssnErrors: PropTypes.array,
}

export default PersonSearchFields
