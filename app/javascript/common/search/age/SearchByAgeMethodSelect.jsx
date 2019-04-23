import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'common/SelectField'
import SEARCH_BY_AGE_METHODS from 'enums/SearchByAgeMethods'

class SearchByAgeMethodSelect extends React.Component {
  handleChange({target: {value}}) {
    const {onChange} = this.props
    const isValidValue = value === 'dob' || value === 'approximate'
    onChange('searchByAgeMethod', isValidValue ? value : '')
  }

  render() {
    const {id, gridClassName, value, onKeyPress} = this.props
    const options = Object.keys(SEARCH_BY_AGE_METHODS).map(key =>
      <option key={key} value={key}>{SEARCH_BY_AGE_METHODS[key]}</option>
    )
    return (
      <SelectField
        id={id}
        gridClassName={gridClassName}
        label="Age"
        onChange={this.handleChange.bind(this)}
        value={value}
        onKeyPress={onKeyPress}
      >
        <option key="" />
        {options}
      </SelectField>
    )
  }
}

SearchByAgeMethodSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  value: PropTypes.string,
}

export default SearchByAgeMethodSelect
