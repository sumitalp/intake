import React from 'react'
import PropTypes from 'prop-types'
import PersonSearchNameGroup from 'common/search/PersonSearchNameGroup'
import PersonSearchAgeGenderGroup from 'common/search/PersonSearchAgeGenderGroup'
import PersonSearchLocationGroup from 'common/search/PersonSearchLocationGroup'
import PersonSearchButtonGroup from 'common/search/PersonSearchButtonGroup'
import {PersonSearchFieldsPropType} from 'data/personSearch'

const PersonSearchFields = ({
  onChange,
  onCancel,
  onSubmit,
  personSearchFields,
  states,
  counties,
  isAdvancedSearchOn,
}) => isAdvancedSearchOn ? (
  <div>
    <PersonSearchNameGroup
      onChange={onChange}
      personSearchFields={personSearchFields}
    />
    <PersonSearchAgeGenderGroup
      onChange={onChange}
      personSearchFields={personSearchFields}
    />
    <PersonSearchLocationGroup
      onChange={onChange}
      personSearchFields={personSearchFields}
      states={states}
      counties={counties}
    />
    <PersonSearchButtonGroup
      onSubmit={onSubmit}
      onCancel={onCancel}
      personSearchFields={personSearchFields}
    />
  </div>
) : null

PersonSearchFields.propTypes = {
  counties: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    value: PropTypes.string,
  })),
  isAdvancedSearchOn: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  personSearchFields: PersonSearchFieldsPropType,
  states: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      value: PropTypes.string,
    })
  ),
}

export default PersonSearchFields
