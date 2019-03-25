import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const AgeUnitForm = ({formLabel, monthsLabel, yearsLabel}) => {
  return (
    <Fragment>
      <label htmlFor="age-unit-form">{formLabel}</label>
      <form className="age-unit-form" name="age-unit-form">
        <div>
          <input
            type="radio"
            name="age-unit"
            id="age-unit-months"
            value="months"
          />
          <label htmlFor="age-unit-months">{monthsLabel}</label>
        </div>
        <div>
          <input
            type="radio"
            name="age-unit"
            id="age-unit-years"
            value="years"
          />
          <label htmlFor="age-unit-years">{yearsLabel}</label>
        </div>
      </form>
    </Fragment>
  )
}

AgeUnitForm.propTypes = {
  formLabel: PropTypes.string.isRequired,
  monthsLabel: PropTypes.string.isRequired,
  yearsLabel: PropTypes.string.isRequired,
}

export default AgeUnitForm
