import React from 'react'
import PropTypes from 'prop-types'
import PersonSearchNameGroup from 'common/search/PersonSearchNameGroup'
import PersonSearchNumbersAgeGroup from 'common/search/PersonSearchNumbersAgeGroup'
import PersonSearchButtonGroup from 'common/search/PersonSearchButtonGroup'
import {PersonSearchFieldsPropType} from 'data/personSearch'

const PersonSearchFields = ({
  onChange,
  onCancel,
  onSubmit,
  personSearchFields,
  clientIdError,
  isAdvancedSearchOn,
}) => isAdvancedSearchOn ? (
  <div>
    <PersonSearchNameGroup
      onChange={onChange}
      personSearchFields={personSearchFields}
    />
    <PersonSearchNumbersAgeGroup
      onChange={onChange}
      personSearchFields={personSearchFields}
      clientIdError={clientIdError}
    />
    <PersonSearchButtonGroup
      onSubmit={onSubmit}
      onCancel={onCancel}
      personSearchFields={personSearchFields}
    />
  </div>
) : null

PersonSearchFields.propTypes = {
  clientIdError: PropTypes.array,
  isAdvancedSearchOn: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  personSearchFields: PersonSearchFieldsPropType,
}

export default PersonSearchFields
