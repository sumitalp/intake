import React from 'react'
import PropTypes from 'prop-types'
import InputField from 'common/InputField'
import DateField from 'common/DateField'
import ApproximateAgeUnitsSelect from 'common/search/age/ApproximateAgeUnitsSelect'
import SexAtBirthSelect from 'common/search/sexatbirth/SexAtBirthSelect'
import {PersonSearchFieldsPropType, PersonSearchFieldsDefaultProps} from 'data/personSearch'

const PersonSearchAgeGenderGroup = ({onChange, personSearchFields}) => (
  <div className="row person-search-field-group">
    <div className="col-md-12 person-search-field-title">Age & Gender</div>
    <div className="col-md-8">
      <div className="row">
        <div className="col-md-12">
          <label
            className="person-search-label-date-of-birth"
            htmlFor="search-date-of-birth_input"
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
            className="person-search-label-approximate-age"
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
            placeholder='number'
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
)

PersonSearchAgeGenderGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  personSearchFields: PersonSearchFieldsPropType,
}

PersonSearchAgeGenderGroup.defaultProps = PersonSearchFieldsDefaultProps

export default PersonSearchAgeGenderGroup
