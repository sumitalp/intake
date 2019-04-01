import React from 'react'
import PropTypes from 'prop-types'
import DateField from 'common/DateField'

class DateOfBirthDateField extends React.Component {
  handleClick() {
    const {onChange} = this.props
    onChange('searchByAgeMethod', 'dob')
  }

  render() {
    const {value, onChange, searchByAgeMethod} = this.props
    const disableDateField = !(searchByAgeMethod === '' || searchByAgeMethod === 'dob')

    return (
      <div onClick={this.handleClick.bind(this)} role="presentation">
        <DateField
          id="search-date-of-birth"
          gridClassName="date-field"
          label="Date"
          value={value}
          onChange={value => onChange('searchDateOfBirth', value)}
          hasTime={false}
          disabled={disableDateField}
        />
      </div>
    )
  }
}

DateOfBirthDateField.propTypes = {
  onChange: PropTypes.func,
  searchByAgeMethod: PropTypes.string,
  value: PropTypes.string,
}

export default DateOfBirthDateField
