import React from 'react'
import PropTypes from 'prop-types'
import MaskedInputField from 'common/MaskedInputField'
import AgeForm from 'common/search/age/AgeForm'
import AgeUnitForm from 'common/search/age/AgeUnitForm'
import DateOfBirthDateField from 'common/search/age/DateOfBirthDateField'
import ApproximateAgeNumberSelect from 'common/search/age/ApproximateAgeNumberSelect'
import {PersonSearchFieldsPropType, PersonSearchFieldsDefaultProps} from 'data/personSearch'

const PersonSearchNumbersAgeGroup = ({onBlur, onChange, personSearchFields, clientIdError, ssnErrors}) => (
  <div className="row person-search-field-group">
    <div className="col-md-12 person-search-field-title">Identifying Numbers & Age</div>
    <div className="col-md-4 person-search-identifying-numbers-section">
      <div className="row">
        <MaskedInputField
          id="search-client-id"
          label="Client ID Number"
          gridClassName="col-md-12 client-id-field"
          onBlur={onBlur}
          onChange={({target: {value}}) => onChange('searchClientId', value)}
          value={personSearchFields.searchClientId}
          mask='1111-1111-1111-1111111'
          placeholder='____-____-____-_______'
          maxLength='19'
          errors={clientIdError}
        />
      </div>
      <div className="row">
        <MaskedInputField
          id="search-ssn"
          label="Social Security Number"
          gridClassName="col-md-12 ssn-field"
          onBlur={onBlur}
          onChange={({target: {value}}) => onChange('searchSsn', value)}
          value={personSearchFields.searchSsn}
          mask='111-11-1111'
          placeholder='___-__-____'
          maxLength='9'
          errors={ssnErrors}
        />
      </div>
    </div>
    <div className="col-md-8 person-search-age-section">
      <div className="row">
        <div className="col-md-12 radio-choice-message">
          Choose one: (<span className="radio-choice-message-action">clear</span>)
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <AgeForm
            dateOfBirthLabel="Date of Birth"
            approximateAgeLabel="Approximate Age"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6 date-of-birth-section">
            <DateOfBirthDateField
              value={personSearchFields.searchDateOfBirth}
              onChange={onChange}
              searchByAgeMethod={personSearchFields.searchByAgeMethod}
            />
          </div>
          <div className="col-md-6 approximate-age-section">
            <div className="col-md-6 approximate-age-selector unit">
              <AgeUnitForm
                formLabel = "Unit"
                monthsLabel = "Months"
                yearsLabel = "Years"
                onChange={onChange}
                searchApproximateAgeUnits={personSearchFields.searchApproximateAgeUnits}
                searchByAgeMethod={personSearchFields.searchByAgeMethod}
              />
            </div>
            <div className="col-md-6 approximate-age-selector number">
              <ApproximateAgeNumberSelect
                ageUnit={personSearchFields.searchApproximateAgeUnits}
                id="search-approximate-age-number"
                gridClassName="age-number-field"
                onChange={onChange}
                value={personSearchFields.searchApproximateAge}
                searchByAgeMethod={personSearchFields.searchByAgeMethod}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

PersonSearchNumbersAgeGroup.propTypes = {
  clientIdError: PropTypes.array,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  personSearchFields: PersonSearchFieldsPropType,
  ssnErrors: PropTypes.array,
}

PersonSearchNumbersAgeGroup.defaultProps = PersonSearchFieldsDefaultProps

export default PersonSearchNumbersAgeGroup
