import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'common/SelectField'

class GenderSelect extends React.PureComponent {
  onChange({target: {value}}) {
    const {genders, onChange} = this.props
    const genderList = Object.keys(genders).map(key => genders[key])
    onChange(
      'searchSexAtBirth',
      genderList.find(gender => gender === value) || ''
    )
  }

  render() {
    const {id, gridClassName, genders, value} = this.props

    return (
      <SelectField
        id={id}
        gridClassName={gridClassName}
        label="Sex at Birth"
        onChange={this.onChange.bind(this)}
        value={value}
        disabled={true}
      >
        <option key="" />
        {Object.keys(genders).map(key => (
          <option key={genders[key]} value={genders[key]}>
            {genders[key]}
          </option>
        ))}
      </SelectField>
    )
  }
}

GenderSelect.propTypes = {
  genders: PropTypes.object,
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default GenderSelect
