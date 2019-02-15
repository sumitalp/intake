import React from 'react'
import PropTypes from 'prop-types'
import InputField from 'common/InputField'
import DateField from 'common/DateField'
import StateNameSelect from 'common/search/state/StateNameSelect'
import CountyNameSelect from 'common/county/CountyNameSelect'
import SuffixNameSelect from 'common/search/suffix/SuffixNameSelect'
import GenderAtBirthSelect from 'common/search/gender/GenderAtBirthSelect'
import ApproximateAgeUnitsSelect from 'common/search/age/ApproximateAgeUnitsSelect'

const MIN_SEARCHABLE_CHARS = 2

const canSearch = ({
  searchLastName,
  searchFirstName,
  searchMiddleName,
  searchSsn,
  searchDateOfBirth,
  searchAddress,
}) =>
  (searchLastName &&
    searchLastName.replace(/^\s+/, '').length >= MIN_SEARCHABLE_CHARS) ||
  (searchFirstName &&
    searchFirstName.replace(/^\s+/, '').length >= MIN_SEARCHABLE_CHARS) ||
  (searchMiddleName &&
    searchMiddleName.replace(/^\s+/, '').length >= MIN_SEARCHABLE_CHARS) ||
  (searchSsn && searchSsn.replace(/^\s+/, '').length >= MIN_SEARCHABLE_CHARS) ||
  (searchDateOfBirth &&
    searchDateOfBirth.replace(/^\s+/, '').length >= MIN_SEARCHABLE_CHARS) ||
  (searchAddress &&
    searchAddress.replace(/^\s+/, '').length >= MIN_SEARCHABLE_CHARS)

const PersonSearchFields = ({
  onChange,
  onCancel,
  onSubmit,
  searchLastName,
  searchFirstName,
  searchMiddleName,
  searchClientId,
  searchSuffix,
  searchSsn,
  searchDateOfBirth,
  searchApproximateAge,
  searchApproximateAgeUnits,
  searchGenderAtBirth,
  searchAddress,
  searchCity,
  searchCounty,
  searchState,
  searchCountry,
  searchZipCode,
}) => (
  <div>
    <div className="row person-search-field-group">
      <InputField
        id="search-last-name"
        gridClassName="col-md-4 last-name-field"
        label="Last Name"
        onChange={({target: {value}}) => onChange(value, 'lastname')}
        value={searchLastName}
      />
      <InputField
        id="search-first-name"
        gridClassName="col-md-4 first-name-field"
        label="First Name"
        onChange={({target: {value}}) => onChange(value, 'firstname')}
        value={searchFirstName}
      />
      <InputField
        id="search-middle-name"
        gridClassName="col-md-4 middle-name-field"
        label="Middle Name"
        onChange={({target: {value}}) => onChange(value, 'middlename')}
        value={searchMiddleName}
      />
      <InputField
        id="search-client-id"
        label="Client ID"
        gridClassName="col-md-4 client-id-field"
        onChange={({target: {value}}) => onChange(value, 'clientid')}
        value={searchClientId}
        placeholder="xxxx - xxxx - xxxx - xxxxxxx"
        disabled={true}
      />
      <SuffixNameSelect
        id="search-suffix"
        gridClassName="col-md-4 suffix-field"
        onChange={onChange}
        value={searchSuffix}
      />
      <InputField
        id="search-ssn"
        gridClassName="col-md-4 ssn-field"
        label="SSN"
        onChange={({target: {value}}) => onChange(value, 'ssn')}
        value={searchSsn}
      />
    </div>
    <div className="row person-search-field-group">
      <div className="col-md-12 person-search-field-title">Age & Gender</div>
      <div className="col-md-8">
        <div className="row">
          <div className="col-md-12">
            <label
              className="pull-left person-search-label-date-of-birth"
              htmlFor="search-date-of-birth"
            >
              Date of Birth
            </label>
            <DateField
              id="search-date-of-birth"
              gridClassName="col-md-6"
              label=""
              value={searchDateOfBirth}
              onChange={value => onChange(value, 'dateofbirth')}
              hasTime={false}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label
              className="pull-left person-search-label-approximate-age"
              htmlFor="search-approximate-age-number"
            >
              Approximate Age
            </label>
            <InputField
              id="search-approximate-age-number"
              gridClassName="col-md-3 age-number-field"
              label=""
              onChange={({target: {value}}) =>
                onChange(value, 'approximateage')
              }
              value={searchApproximateAge}
              disabled={true}
            />
            <ApproximateAgeUnitsSelect
              id="search-approximate-age-units"
              gridClassName="col-md-3 age-unit-field"
              onChange={onChange}
              value={searchApproximateAgeUnits}
            />
          </div>
        </div>
      </div>
      <div className="col-md-4 person-search-gender-at-birth-wrapper">
        <GenderAtBirthSelect
          id="search-gender-at-birth"
          onChange={onChange}
          value={searchGenderAtBirth}
        />
      </div>
    </div>
    <div className="row person-search-field-group">
      <div className="col-md-12 person-search-field-title">Location</div>
      <InputField
        id="search-address"
        gridClassName="col-md-4 address-field"
        label="Street Address"
        onChange={({target: {value}}) => onChange(value, 'address')}
        value={searchAddress}
      />
      <InputField
        id="search-city"
        gridClassName="col-md-4 city-field"
        label="City"
        onChange={({target: {value}}) => onChange(value, 'city')}
        value={searchCity}
      />
      <CountyNameSelect
        id="search-county"
        gridClassName="col-md-4 county-field"
        onChange={onChange}
        value={searchCounty}
      />
      <StateNameSelect
        id="search-state"
        gridClassName="col-md-4 state-field"
        onChange={onChange}
        value={searchState}
      />
      <InputField
        id="search-country"
        gridClassName="col-md-4 country-field"
        label="Country"
        onChange={({target: {value}}) => onChange(value, 'country')}
        value={searchCountry}
        disabled={true}
      />
      <InputField
        id="search-zip-code"
        gridClassName="col-md-4 zip-code-field"
        label="Zip Code"
        onChange={({target: {value}}) => onChange(value, 'zipcode')}
        value={searchZipCode}
        placeholder="Seperate multiple zip codes with commas"
        disabled={true}
      />
    </div>
    <div className="row person-search-field-group">
      <div className="col-md-12">
        <button
          className="btn btn-primary person-search-button-search"
          onClick={onSubmit}
          disabled={
            !canSearch({
              searchLastName,
              searchFirstName,
              searchMiddleName,
              searchSuffix,
              searchSsn,
              searchDateOfBirth,
              searchAddress,
              searchCity,
              searchCounty,
            })
          }
        >
          Search
        </button>
        <button
          className="btn btn-primary person-search-button-cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)

PersonSearchFields.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  searchAddress: PropTypes.string,
  searchApproximateAge: PropTypes.string,
  searchApproximateAgeUnits: PropTypes.string,
  searchCity: PropTypes.string,
  searchClientId: PropTypes.string,
  searchCountry: PropTypes.string,
  searchCounty: PropTypes.string,
  searchDateOfBirth: PropTypes.string,
  searchFirstName: PropTypes.string,
  searchGenderAtBirth: PropTypes.string,
  searchLastName: PropTypes.string,
  searchMiddleName: PropTypes.string,
  searchSsn: PropTypes.string,
  searchState: PropTypes.string,
  searchSuffix: PropTypes.string,
  searchZipCode: PropTypes.string,
}

PersonSearchFields.defaultProps = {
  searchLastName: '',
  searchFirstName: '',
  searchMiddleName: '',
  searchClientId: '',
  searchSuffix: '',
  searchSsn: '',
  searchDateOfBirth: '',
  searchApproximateAge: '',
  searchApproximateAgeUnits: '',
  searchGenderAtBirth: '',
  searchAddress: '',
  searchCity: '',
  searchCounty: '',
  searchState: '',
  searchCountry: '',
  searchZipCode: '',
}

export default PersonSearchFields
