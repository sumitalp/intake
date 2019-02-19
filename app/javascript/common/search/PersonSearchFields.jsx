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
}) => {
  return (
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
      />
      <PersonSearchButtonGroup onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  )
}

PersonSearchFields.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  personSearchFields: PersonSearchFieldsPropType,
}

PersonSearchFields.defaultProps = {
  personSearchFields: {
    searchLastName: '',
    searchFirstName: '',
    searchMiddleName: '',
    searchClientId: '',
    searchSuffix: '',
    searchSsn: '',
    searchDateOfBirth: '',
    searchApproximateAge: '',
    searchApproximateAgeUnits: '',
    searchSexAtBirth: '',
    searchAddress: '',
    searchCity: '',
    searchCounty: '',
    searchState: '',
    searchCountry: '',
    searchZipCode: '',
  },
}

export default PersonSearchFields
