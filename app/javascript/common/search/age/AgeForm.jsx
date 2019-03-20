import React from 'react'
import PropTypes from 'prop-types'

const AgeForm = ({dateOfBirthLabel, approximateAgeLabel}) => {
  return (
    <form className="client-age-form" name="client-age-form">
      <div className="col-md-6 client-age-selector date-of-birth">
        <input
          type="radio"
          name="age"
          id="date-of-birth"
          value="date-of-birth"
          disabled={true}
        />
        <label htmlFor="date-of-birth">{dateOfBirthLabel}</label>
      </div>
      <div className="col-md-6 client-age-selector approximate-age">
        <input
          type="radio"
          id="approximate-age"
          name="age"
          value="approximate-age"
          disabled={true}
        />
        <label htmlFor="approximate-age">{approximateAgeLabel}</label>
      </div>
    </form>
  )
}

AgeForm.propTypes = {
  approximateAgeLabel: PropTypes.string.isRequired,
  dateOfBirthLabel: PropTypes.string.isRequired,
}

export default AgeForm
