import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

class AgeForm extends React.Component {
  handleClick({target: {value}}) {
    const {onChange} = this.props
    const isValidValue = value === 'dob' || value === 'approximate'
    onChange('searchByAgeMethod', isValidValue ? value : '')
  }

  renderRadioWithLabel({id, value, searchByAgeMethod, label}) {
    return (
      <Fragment>
        <div className={`col-md-6 client-age-selector ${id}`}>
          <input
            checked={searchByAgeMethod === value}
            type="radio"
            name="age"
            id={id}
            value={value}
            onClick={this.handleClick.bind(this)}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      </Fragment>
    )
  }

  render() {
    const {dateOfBirthLabel, approximateAgeLabel, searchByAgeMethod} = this.props
    const dateOfBirthRadioProps = {id: 'date-of-birth', value: 'dob', searchByAgeMethod, label: dateOfBirthLabel}
    const approximateAgeRadioProps = {id: 'approximate-age', value: 'approximate', searchByAgeMethod, label: approximateAgeLabel}

    return (
      <form className="client-age-form" name="client-age-form">
        {this.renderRadioWithLabel(dateOfBirthRadioProps)}
        {this.renderRadioWithLabel(approximateAgeRadioProps)}
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
