import React from 'react'
import PropTypes from 'prop-types'
import InputField from 'common/InputField'
import MaskedInputField from 'common/MaskedInputField'
import SuffixNameSelect from 'common/search/suffix/SuffixNameSelect'
import {PersonSearchFieldsPropType, PersonSearchFieldsDefaultProps} from 'data/personSearch'

const PersonSearchNameGroup = ({onChange, personSearchFields, clientIdError}) => (
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
    <MaskedInputField
      id="search-client-id"
      label="Client ID"
      gridClassName="col-md-4 client-id-field"
      onChange={({target: {value}}) => onChange('searchClientId', value)}
      value={personSearchFields.searchClientId}
      mask='1111-1111-1111-1111111'
      placeholder='____-____-____-_______'
      maxLength='19'
      errors={clientIdError}
    />
    <SuffixNameSelect
      id="search-suffix"
      gridClassName="col-md-4 suffix-field"
      onChange={onChange}
      value={personSearchFields.searchSuffix}
    />
    <InputField
      id="search-ssn"
      gridClassName="col-md-4 ssn-field"
      label="SSN"
      onChange={({target: {value}}) => onChange('searchSsn', value)}
      value={personSearchFields.searchSsn}
    />
  </div>
)

PersonSearchNameGroup.propTypes = {
  clientIdError: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  personSearchFields: PersonSearchFieldsPropType,
}

PersonSearchNameGroup.defaultProps = PersonSearchFieldsDefaultProps

export default PersonSearchNameGroup
