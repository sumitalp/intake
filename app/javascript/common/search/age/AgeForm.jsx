import React from 'react'
import PropTypes from 'prop-types'

const AgeForm = ({dateOfBirthLabel, approximateAgeLabel}) => {
    return (
      <form className="client-age-form" name="client-age-form">
        <div className="col-md-6">
          <input type="radio" name="age" id="date-of-birth" value="date-of-birth" />
          <label htmlFor="date-of-birth">{dateOfBirthLabel}</label>
        </div>
        <div className="col-md-6">
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
  dateOfBirthLabel: PropTypes.string.isRequired,
  approximateAgeLabel: PropTypes.string.isRequired,
}

export default AgeForm
