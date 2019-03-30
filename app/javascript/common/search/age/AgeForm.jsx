import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

class AgeForm extends React.Component {
  handleInputClick({target: {value}}) {
    const {onChange} = this.props
    const isValidValue = value === 'dob' || value === 'approximate'
    onChange('searchByAgeMethod', isValidValue ? value : '')
  }

  renderRadioButtons(dateOfBirthLabel, approximateAgeLabel) {
    return (
      <Fragment>
        <div className="col-md-6 client-age-selector date-of-birth">
          <input
            type="radio"
            name="age"
            id="date-of-birth"
            value="dob"
            onClick={this.handleInputClick.bind(this)}
          />
          <label htmlFor="date-of-birth">{dateOfBirthLabel}</label>
        </div>
        <div className="col-md-6 client-age-selector approximate-age">
          <input
            type="radio"
            id="approximate-age"
            name="age"
            value="approximate"
            onClick={this.handleInputClick.bind(this)}
          />
          <label htmlFor="approximate-age">{approximateAgeLabel}</label>
        </div>
      </Fragment>
    )
  }

  render() {
    const {dateOfBirthLabel, approximateAgeLabel} = this.props
    return (
      <form className="client-age-form" name="client-age-form">
        {this.renderRadioButtons(dateOfBirthLabel, approximateAgeLabel)}
      </form>
    )
  }
}

AgeForm.propTypes = {
  approximateAgeLabel: PropTypes.string.isRequired,
  dateOfBirthLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default AgeForm
