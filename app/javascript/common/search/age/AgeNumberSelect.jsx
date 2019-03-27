import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'common/SelectField'

class AgeNumberSelect extends React.Component {
  onChange({target: {value}}) {
    const {range, onChange} = this.props
    const number = Number(value)
    onChange(
      'searchApproximateAge',
      number >= range.min && number <= range.max ? value : ''
    )
  }

  render() {
    const {id, gridClassName, value, range, disabled} = this.props
    const options = []

    for (let x = range.min; x <= range.max; x++) {
      const option = (<option key={x} value={x}>{x}</option>)
      options.push(option)
    }

    return (
      <SelectField
        id={id}
        gridClassName={gridClassName}
        label="Number"
        onChange={this.onChange.bind(this)}
        value={value}
        disabled={disabled}
      >
        <option key="" />
        {options}
      </SelectField>
    )
  }
}

AgeNumberSelect.propTypes = {
  disabled: PropTypes.bool,
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  range: PropTypes.object.isRequired,
  value: PropTypes.string,
}

export default AgeNumberSelect
