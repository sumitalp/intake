import React from 'react'
import PropTypes from 'prop-types'
import InputField from 'common/InputField'
import DateField from 'common/DateField'
import StateNameSelect from 'common/search/state/StateNameSelect'
import CountyNameSelect from 'common/county/CountyNameSelect'
import SuffixNameSelect from 'common/search/suffix/SuffixNameSelect'
import SexAtBirthSelect from 'common/search/sexatbirth/SexAtBirthSelect'
import ApproximateAgeUnitsSelect from 'common/search/age/ApproximateAgeUnitsSelect'
import {PersonSearchFieldsPropType} from 'data/personSearch'

const MIN_SEARCHABLE_CHARS = 2

const isSearchable = value => value && value.replace(/^\s+/, '').length >= MIN_SEARCHABLE_CHARS

const canSearch = ({
  searchLastName,
  searchFirstName,
  searchMiddleName,
  searchSsn,
  searchDateOfBirth,
  searchAddress,
}) => {
  const fields = [searchLastName, searchFirstName, searchMiddleName, searchSsn, searchDateOfBirth, searchAddress]
  const searchableFields = fields.filter(field => isSearchable(field))
  return Boolean(searchableFields.length)
}

const PersonSearchFields = ({
  onChange,
  onCancel,
  onSubmit,
  personSearchFields,
}) => {
  return (
    <div>
      <div className="row person-search-field-group">
        <InputField
          id="search-last-name"
          gridClassName="col-md-4 last-name-field"
          label="Last Name"
          onChange={({target: {value}}) =>
            onChange('searchLastName', value)
          }
          value={personSearchFields.searchLastName}
        />
        <InputField
          id="search-first-name"
          gridClassName="col-md-4 first-name-field"
          label="First Name"
          onChange={({target: {value}}) =>
            onChange('searchFirstName', value)
          }
          value={personSearchFields.searchFirstName}
        />
        <InputField
          id="search-middle-name"
          gridClassName="col-md-4 middle-name-field"
          label="Middle Name"
          onChange={({target: {value}}) =>
            onChange('searchMiddleName', value)
          }
          value={personSearchFields.searchMiddleName}
        />
        <InputField
          id="search-client-id"
          label="Client ID"
          gridClassName="col-md-4 client-id-field"
          onChange={({target: {value}}) =>
            onChange('searchClientId', value)
          }
          value={personSearchFields.searchClientId}
          placeholder="xxxx - xxxx - xxxx - xxxxxxx"
          disabled={true}
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
                gridClassName="col-md-6 date-field"
                label=""
                value={personSearchFields.searchDateOfBirth}
                onChange={value => onChange('searchDateOfBirth', value)}
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
                  onChange('searchApproximateAge', value)
                }
                value={personSearchFields.searchApproximateAge}
                disabled={true}
              />
              <ApproximateAgeUnitsSelect
                id="search-approximate-age-units"
                gridClassName="col-md-3 age-unit-field"
                onChange={onChange}
                value={personSearchFields.searchApproximateAgeUnits}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 sex-at-birth-field">
          <SexAtBirthSelect
            id="search-sex-at-birth"
            onChange={onChange}
            value={personSearchFields.searchSexAtBirth}
          />
        </div>
      </div>
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
            className="btn btn-primary person-search-button cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

PersonSearchFields.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
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
