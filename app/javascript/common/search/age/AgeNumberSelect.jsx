import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'common/SelectField'

class AgeNumberSelect extends React.Component {
  onChange({target: {value}}) {
    const {range, onChange} = this.props
    const intValue = parseInt(value)
    onChange(
      'searchApproximateAge',
      intValue >= range.min && intValue <= range.max ? value : ''
    )
  }

  render() {
    const {id, gridClassName, value, range} = this.props
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
      >
        <option key="" />
        {options}
      </SelectField>
    )
  }
}

AgeNumberSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  range: PropTypes.object.isRequired,
  value: PropTypes.string,
}

export default AgeNumberSelect
