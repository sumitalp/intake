import React from 'react'
import PropTypes from 'prop-types'
import DateField from 'common/DateField'

const DateOfBirthDateField = ({value, onChange, searchByAgeMethod}) => {
  const disableDateField = !(searchByAgeMethod === '' || searchByAgeMethod === 'dateOfBirth')

  return (
    <DateField
      id="search-date-of-birth"
      gridClassName="date-field"
      label="Date"
      value={value}
      onChange={value => onChange('searchDateOfBirth', value)}
      hasTime={false}
      disabled={disableDateField}
    />
  )
}

DateOfBirthDateField.propTypes = {
  onChange: PropTypes.func,
  searchByAgeMethod: PropTypes.string,
  value: PropTypes.string,
}

export default DateOfBirthDateField
