import React from 'react'
import PropTypes from 'prop-types'
import DateField from 'common/DateField'

class DateOfBirthDateField extends React.Component {
  render() {
    const {value, onBlur, onChange, errors, onKeyUp, onKeyPress} = this.props
    const handleFocus = () => { this.props.onChange('searchByAgeMethod', 'dob') }
    const handleBlur = () => onBlur('dobErrorCheck')
    const handleChange = value => onChange('searchDateOfBirth', value)

    return (
      <div onFocus={handleFocus} role="presentation">
        <DateField
          id="search-date-of-birth"
          gridClassName="date-field"
          label="Date"
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          hasTime={false}
          errors={errors}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
        />
      </div>
    )
  }
}

DateOfBirthDateField.propTypes = {
  errors: PropTypes.array,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  value: PropTypes.string,
}

export default DateOfBirthDateField
