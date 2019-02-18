import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'common/SelectField'

class AgeUnitsSelect extends React.PureComponent {
  onChange({target: {value}}) {
    const {units, onChange} = this.props
    const unitsList = Object.keys(units).map(key => units[key])

    onChange(
      'searchApproximateAgeUnits',
      unitsList.find(unit => unit === value) || ''
    )
  }

  render() {
    const {id, gridClassName, units, value} = this.props

    return (
      <SelectField
        id={id}
        gridClassName={`${gridClassName}${
          value ? '' : ' placeholder-option-selected'
        }`}
        label=""
        onChange={this.onChange.bind(this)}
        value={value}
        disabled={true}
      >
        <option key="age-unit-placeholder" value="" disabled>
          Unit
        </option>
        <option key="" />
        {Object.keys(units).map(key => (
          <option key={units[key]} value={units[key]}>
            {units[key]}
          </option>
        ))}
      </SelectField>
    )
  }
}

AgeUnitsSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  units: PropTypes.object,
  value: PropTypes.string,
}

export default AgeUnitsSelect
