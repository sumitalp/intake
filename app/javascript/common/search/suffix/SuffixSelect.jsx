import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'common/SelectField'

class SuffixSelect extends React.PureComponent {
  onChange({target: {value}}) {
    const {suffixes, onChange} = this.props
    const suffixList = Object.keys(suffixes).map(key => suffixes[key])
    onChange(suffixList.find(suffix => suffix === value) || null, 'suffix')
    onChange(value, 'suffix')
  }

  render() {
    const {id, gridClassName, suffixes, value} = this.props

    return (
      <SelectField
        id={id}
        gridClassName={gridClassName}
        label="Suffix"
        onChange={this.onChange.bind(this)}
        value={value}
      >
        <option key="" />
        {Object.keys(suffixes).map(key => (
          <option key={suffixes[key]} value={suffixes[key]}>
            {suffixes[key]}
          </option>
        ))}
      </SelectField>
    )
  }
}

SuffixSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  suffixes: PropTypes.object,
  value: PropTypes.string,
}

export default SuffixSelect
