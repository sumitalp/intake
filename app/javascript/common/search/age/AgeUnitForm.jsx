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

  renderRadioWithLabel({id, value, disabled, label}) {
    return (
      <Fragment>
        <div>
          <input
            type="radio"
            name="age-unit"
            id={id}
            value={value}
            onClick={this.handleClick.bind(this)}
            disabled={disabled}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      </Fragment>
    )
  }

  render() {
    const {formLabel, monthsLabel, yearsLabel, searchByAgeMethod} = this.props
    const disabled = !(searchByAgeMethod === '' || searchByAgeMethod === 'approximate')
    const monthsRadioProps = {id: 'age-unit-months', value: 'months', disabled, label: monthsLabel}
    const yearsRadioProps = {id: 'age-unit-years', value: 'years', disabled, label: yearsLabel}

    return (
      <Fragment>
        <label htmlFor="age-unit-form">{formLabel}</label>
        <form className="age-unit-form" name="age-unit-form">
          {this.renderRadioWithLabel(monthsRadioProps)}
          {this.renderRadioWithLabel(yearsRadioProps)}
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
