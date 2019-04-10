import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

class AgeForm extends React.Component {
  handleClick({target: {value}}) {
    const {onChange} = this.props
    const isValidValue = value === 'dob' || value === 'approximate'
    onChange('searchByAgeMethod', isValidValue ? value : '')
  }

  renderRadioWithLabel({id, value, searchByAgeMethod, label, onKeyPress}) {
    return (
      <Fragment>
        <div onKeyPress={onKeyPress} role='presentation' className={`col-md-6 client-age-selector ${id}`}>
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
    const {dateOfBirthLabel, approximateAgeLabel, searchByAgeMethod, onKeyPress} = this.props
    const dateOfBirthRadioProps = {
      id: 'date-of-birth',
      value: 'dob',
      searchByAgeMethod,
      label: dateOfBirthLabel,
      onKeyPress: onKeyPress,
    }
    const approximateAgeRadioProps = {
      id: 'approximate-age',
      value: 'approximate',
      searchByAgeMethod,
      label: approximateAgeLabel,
      onKeyPress: onKeyPress,
    }

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
  onKeyPress: PropTypes.func,
  searchByAgeMethod: PropTypes.string,
}

export default AgeForm
