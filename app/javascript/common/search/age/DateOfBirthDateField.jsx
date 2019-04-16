import React from 'react'
import PropTypes from 'prop-types'
import DateField from 'common/DateField'

class DateOfBirthDateField extends React.Component {
  render() {
    const {value, onBlur, onChange, searchByAgeMethod, errors, onKeyUp, onKeyPress} = this.props
    const disableDateField = !(searchByAgeMethod === '' || searchByAgeMethod === 'dob')
    const handleFocus = () => { this.props.onChange('searchByAgeMethod', 'dob') }
    return (
      <div onFocus={handleFocus} role="presentation">
        <DateField
          id="search-date-of-birth"
          gridClassName="date-field"
          label="Date"
          value={value}
          onBlur={onBlur}
          onChange={value => onChange('searchDateOfBirth', value)}
          hasTime={false}
          disabled={disableDateField}
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
  searchByAgeMethod: PropTypes.string,
  value: PropTypes.string,
}

export default DateOfBirthDateField
