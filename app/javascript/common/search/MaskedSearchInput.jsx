import React from 'react'
import PropTypes from 'prop-types'
import HyphenatedMaskedInput from 'common/HyphenatedMaskedInput'

const MaskedSearchInput = ({name, onBlur, onChange, onFocus, ...props}) => {
  const handleBlur = () => onBlur(name)
  const handleChange = ({target: {value}}) => onChange(name, value)
  const handleFocus = () => onFocus(name)

  return (
    <HyphenatedMaskedInput
      id={`masked-input-${name}`}
      gridClassName={`col-md-3 ${name}-field`}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      {...props}
    />
  )
}

MaskedSearchInput.propTypes = {
  errors: PropTypes.array,
  label: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default MaskedSearchInput
