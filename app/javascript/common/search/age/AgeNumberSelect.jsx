import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'common/SelectField'

const AgeNumberSelect = (props) => {
  const {id, gridClassName, value} = props
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

AgeNumberSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default AgeNumberSelect
