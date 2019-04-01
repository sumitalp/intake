import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

class AgeForm extends React.Component {
  handleClick({target: {value}}) {
    const {onChange} = this.props
    const isValidValue = value === 'dob' || value === 'approximate'
    onChange('searchByAgeMethod', isValidValue ? value : '')
  }

  renderRadioDateOfBirth(dateOfBirthLabel) {
    const {searchByAgeMethod} = this.props
    return (
      <Fragment>
        <div className="col-md-6 client-age-selector date-of-birth">
          <input
            checked={searchByAgeMethod === 'dob'}
            type="radio"
            name="age"
            id="date-of-birth"
            value="dob"
            onClick={this.handleClick.bind(this)}
          />
          <label htmlFor="date-of-birth">{dateOfBirthLabel}</label>
        </div>
      </Fragment>
    )
  }

  renderRadioApproximateAge(approximateAgeLabel) {
    const {searchByAgeMethod} = this.props
    return (
      <Fragment>
        <div className="col-md-6 client-age-selector approximate-age">
          <input
            checked={searchByAgeMethod === 'approximate'}
            type="radio"
            id="approximate-age"
            name="age"
            value="approximate"
            onClick={this.handleClick.bind(this)}
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
        {this.renderRadioDateOfBirth(dateOfBirthLabel)}
        {this.renderRadioApproximateAge(approximateAgeLabel)}
      </form>
    )
  }
}

AgeForm.propTypes = {
  approximateAgeLabel: PropTypes.string.isRequired,
  dateOfBirthLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  searchByAgeMethod: PropTypes.string,
}

export default AgeForm
