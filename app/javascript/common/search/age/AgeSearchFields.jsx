import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import DateOfBirthDateField from 'common/search/age/DateOfBirthDateField'
import AgeUnitForm from 'common/search/age/AgeUnitForm'
import ApproximateAgeNumberSelect from 'common/search/age/ApproximateAgeNumberSelect'
import {PersonSearchFieldsPropType, PersonSearchFieldsDefaultProps} from 'data/personSearch'

class AgeSearchFields extends React.Component {
  renderDateOfBirth() {
    const {onBlur, onChange, dobErrors, onKeyUp, onKeyPress, personSearchFields} = this.props
    const shouldRender = personSearchFields.searchByAgeMethod === 'dob'
    const dateOfBirthSection = (
      <div className="col-md-9 date-of-birth-section">
        <DateOfBirthDateField
          errors={dobErrors}
          onBlur={onBlur}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          value={personSearchFields.searchDateOfBirth}
        />
      </div>
    )
    return shouldRender ? dateOfBirthSection : null
  }

  renderAgeUnitForm() {
    const {onChange, onKeyPress, personSearchFields} = this.props
    return (
      <AgeUnitForm
        formLabel="Unit"
        monthsLabel="Months"
        yearsLabel="Years"
        onChange={onChange}
        onKeyPress={onKeyPress}
        searchApproximateAgeUnits={personSearchFields.searchApproximateAgeUnits}
      />
    )
  }

  renderApproximateAgeNumberSelect() {
    const {onChange, onKeyPress, personSearchFields} = this.props
    return (
      <ApproximateAgeNumberSelect
        ageUnit={personSearchFields.searchApproximateAgeUnits}
        gridClassName="age-number-field"
        id="search-approximate-age-number"
        onChange={onChange}
        onKeyPress={onKeyPress}
        value={personSearchFields.searchApproximateAge}
      />
    )
  }

  renderApproximateAge() {
    const {personSearchFields} = this.props
    const shouldRender = personSearchFields.searchByAgeMethod === 'approximate'
    const approximateAgeSection = (
      <div className="approximate-age-section">
        <div className="col-md-6 approximate-age-selector unit">
          {this.renderAgeUnitForm()}
        </div>
        <div className="col-md-6 approximate-age-selector number">
          {this.renderApproximateAgeNumberSelect()}
        </div>
      </div>
    )
    return shouldRender ? approximateAgeSection : null
  }

  render() {
    return (
      <Fragment>
        {this.renderDateOfBirth()}
        {this.renderApproximateAge()}
      </Fragment>
    )
  }
}

AgeSearchFields.propTypes = {
  dobErrors: PropTypes.array,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  personSearchFields: PersonSearchFieldsPropType,
}

AgeSearchFields.defaultProps = PersonSearchFieldsDefaultProps

export default AgeSearchFields
