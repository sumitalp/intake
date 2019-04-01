import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

class AgeUnitForm extends React.Component {
  handleClick({target: {value}}) {
    const {onChange, searchApproximateAgeUnits} = this.props
    const unitsHaveChanged = value !== searchApproximateAgeUnits
    onChange('searchByAgeMethod', 'approximate')
    if (unitsHaveChanged) {
      const isValidValue = value === 'months' || value === 'years'
      onChange('searchApproximateAgeUnits', isValidValue ? value : '')
      onChange('searchApproximateAge', '')
    }
  }

  renderRadioMonths(monthsLabel, disabled) {
    return (
      <Fragment>
        <div>
          <input
            type="radio"
            name="age-unit"
            id="age-unit-months"
            value="months"
            onClick={this.handleClick.bind(this)}
            disabled={disabled}
          />
          <label htmlFor="age-unit-months">{monthsLabel}</label>
        </div>
      </Fragment>
    )
  }

  renderRadioYears(yearsLabel, disabled) {
    return (
      <Fragment>
        <div>
          <input
            type="radio"
            name="age-unit"
            id="age-unit-years"
            value="years"
            onClick={this.handleClick.bind(this)}
            disabled={disabled}
          />
          <label htmlFor="age-unit-years">{yearsLabel}</label>
        </div>
      </Fragment>
    )
  }

  render() {
    const {formLabel, monthsLabel, yearsLabel, searchByAgeMethod} = this.props
    const disableRadioButtons = !(searchByAgeMethod === '' || searchByAgeMethod === 'approximate')

    return (
      <Fragment>
        <label htmlFor="age-unit-form">{formLabel}</label>
        <form className="age-unit-form" name="age-unit-form">
          {this.renderRadioMonths(monthsLabel, disableRadioButtons)}
          {this.renderRadioYears(yearsLabel, disableRadioButtons)}
        </form>
      </Fragment>
    )
  }
}

AgeUnitForm.propTypes = {
  formLabel: PropTypes.string.isRequired,
  monthsLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  searchApproximateAgeUnits: PropTypes.string,
  searchByAgeMethod: PropTypes.string,
  yearsLabel: PropTypes.string.isRequired,
}

export default AgeUnitForm
