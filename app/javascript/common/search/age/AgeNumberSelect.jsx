import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'common/SelectField'

class AgeNumberSelect extends React.Component {
  handleClick() {
    const {onChange} = this.props
    onChange('searchByAgeMethod', 'approximate')
  }

  handleChange({target: {value}}) {
    const {range, onChange} = this.props
    const number = Number(value)
    onChange(
      'searchApproximateAge',
      number >= range.min && number <= range.max ? value : ''
    )
  }

  render() {
    const {id, gridClassName, value, range, disabled, onKeyPress} = this.props
    const options = []
    if (disabled) this.props.onChange('searchApproximateAge', '')
    for (let x = range.min; x <= range.max; x++) {
      const option = (<option key={x} value={x}>{x}</option>)
      options.push(option)
    }

    return (
      <div onClick={this.handleClick.bind(this)} role="presentation">
        <SelectField
          id={id}
          gridClassName={gridClassName}
          label="Number"
          onChange={this.handleChange.bind(this)}
          value={value}
          disabled={disabled}
          onKeyPress={onKeyPress}
        >
          <option key="" />
          {options}
        </SelectField>
      </div>
    )
  }
}

AgeNumberSelect.propTypes = {
  disabled: PropTypes.bool,
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  range: PropTypes.object.isRequired,
  value: PropTypes.string,
}

export default AgeNumberSelect
