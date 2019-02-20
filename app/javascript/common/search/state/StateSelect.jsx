import React from 'react'
import SelectField from 'common/SelectField'
import PropTypes from 'prop-types'

class StateSelect extends React.PureComponent {
  onChange({target: {value}}) {
    const {states, onChange} = this.props
    onChange(states.find(state => state.value === value) || null)
  }

  render() {
    const {states, gridClassName, id, value} = this.props

    return (
      <SelectField
        id={id}
        gridClassName={gridClassName}
        label="State"
        onChange={this.onChange.bind(this)}
        value={value}
        disabled={true}
      >
        <option key="" />
        {states.map(state => (
          <option key={state.code} value={state.value}>
            {state.value}
          </option>
        ))}
      </SelectField>
    )
  }
}

StateSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  states: PropTypes.array,
  value: PropTypes.string,
}

StateSelect.defaultProps = {
  value: '',
}

export default StateSelect
