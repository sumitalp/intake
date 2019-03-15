import React from 'react'
import PropTypes from 'prop-types'
import InputField from 'common/InputField'
import SexAtBirthSelect from 'common/search/sexatbirth/SexAtBirthSelect'
import {PersonSearchFieldsPropType, PersonSearchFieldsDefaultProps} from 'data/personSearch'

const PersonSearchNameGroup = ({onChange, personSearchFields}) => (
  <div className="row person-search-field-group">
    <InputField
      id="search-last-name"
      gridClassName="col-md-4 last-name-field"
      label="Last Name"
      onChange={({target: {value}}) => onChange('searchLastName', value)}
      value={personSearchFields.searchLastName}
    />
    <InputField
      id="search-first-name"
      gridClassName="col-md-4 first-name-field"
      label="First Name"
      onChange={({target: {value}}) => onChange('searchFirstName', value)}
      value={personSearchFields.searchFirstName}
    />
    <InputField
      id="search-middle-name"
      gridClassName="col-md-4 middle-name-field"
      label="Middle Name"
      onChange={({target: {value}}) => onChange('searchMiddleName', value)}
      value={personSearchFields.searchMiddleName}
    />
    <InputField
      id="search-suffix"
      gridClassName="col-md-4 suffix-field"
      label="Suffix"
      onChange={({target: {value}}) => onChange('searchSuffix', value)}
      value={personSearchFields.searchSuffix}
      maxLength='4'
    />
    <SexAtBirthSelect
      id="search-sex-at-birth"
      gridClassName="col-md-4 sex-at-birth-field"
      onChange={onChange}
      value={personSearchFields.searchSexAtBirth}
    />
  </div>
)

PersonSearchNameGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  personSearchFields: PersonSearchFieldsPropType,
}

PersonSearchNameGroup.defaultProps = PersonSearchFieldsDefaultProps

export default PersonSearchNameGroup
