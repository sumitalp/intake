import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

class AgeUnitForm extends React.Component {
  handleClick({target: {value}}) {
    const {onChange, searchApproximateAgeUnits} = this.props
    const unitsHaveChanged = value !== searchApproximateAgeUnits
    if (unitsHaveChanged) {
      const isValidValue = value === 'months' || value === 'years'
      onChange('searchApproximateAgeUnits', isValidValue ? value : '')
      onChange('searchApproximateAge', '')
    }
  }

  renderRadioWithLabel({id, value, disabled, label, onKeyPress}) {
    const {searchApproximateAgeUnits} = this.props
    return (
      <Fragment>
        <div className={id} onKeyPress={onKeyPress} role='presentation'>
          <input
            checked={searchApproximateAgeUnits === value}
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
    const {formLabel, monthsLabel, yearsLabel, onKeyPress} = this.props
    const monthsRadioProps = {
      id: 'age-unit-months',
      value: 'months',
      label: monthsLabel,
      onKeyPress: onKeyPress,
    }
    const yearsRadioProps = {
      id: 'age-unit-years',
      value: 'years',
      label: yearsLabel,
      onKeyPress: onKeyPress,
    }

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
  onKeyPress: PropTypes.func,
  searchApproximateAgeUnits: PropTypes.string,
  yearsLabel: PropTypes.string.isRequired,
}

export default AgeUnitForm
