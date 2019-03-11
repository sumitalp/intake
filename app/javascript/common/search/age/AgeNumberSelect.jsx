import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'common/SelectField'

class AgeNumberSelect extends React.PureComponent {
  render() {
    const {id, gridClassName, value} = this.props
    return (
      <SelectField
        id={id}
        gridClassName={gridClassName}
        label="Number"
        onChange={() => {}}
        value={value}
        disabled={true}
      >
        <option key="" value="" />
      </SelectField>
    )
  }
}

AgeNumberSelect.propTypes = {
  id: PropTypes.string,
  gridClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default AgeNumberSelect
