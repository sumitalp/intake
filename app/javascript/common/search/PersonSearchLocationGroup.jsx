import React from 'react'
import PropTypes from 'prop-types'
import InputField from 'common/InputField'
import CountyNameSelect from 'common/county/CountyNameSelect'
import StateNameSelect from 'common/search/state/StateNameSelect'
import {PersonSearchFieldsPropType, PersonSearchFieldsDefaultProps} from 'data/personSearch'

const PersonSearchLocationGroup = ({onChange, personSearchFields}) => (
  <div className="row person-search-field-group">
    <div className="col-md-12 person-search-field-title">Location</div>
    <InputField
      id="search-address"
      gridClassName="col-md-4 address-field"
      label="Street Address"
      onChange={({target: {value}}) => onChange('searchAddress', value)}
      value={personSearchFields.searchAddress}
    />
    <InputField
      id="search-city"
      gridClassName="col-md-4 city-field"
      label="City"
      onChange={({target: {value}}) => onChange('searchCity', value)}
      value={personSearchFields.searchCity}
    />
    <CountyNameSelect
      id="search-county"
      gridClassName="col-md-4 county-field"
      onChange={onChange}
      value={personSearchFields.searchCounty}
    />
    <StateNameSelect
      id="search-state"
      gridClassName="col-md-4 state-field"
      onChange={onChange}
      value={personSearchFields.searchState}
    />
    <InputField
      id="search-country"
      gridClassName="col-md-4 country-field"
      label="Country"
      onChange={({target: {value}}) => onChange('searchCountry', value)}
      value={personSearchFields.searchCountry}
      disabled={true}
    />
    <InputField
      id="search-zip-code"
      gridClassName="col-md-4 zip-code-field"
      label="Zip Code"
      onChange={({target: {value}}) => onChange('searchZipCode', value)}
      value={personSearchFields.searchZipCode}
      placeholder="Seperate multiple zip codes with commas"
      disabled={true}
    />
  </div>
)

PersonSearchLocationGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  personSearchFields: PersonSearchFieldsPropType,
}

PersonSearchLocationGroup.defaultProps = PersonSearchFieldsDefaultProps

export default PersonSearchLocationGroup
