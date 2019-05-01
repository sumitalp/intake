import React from 'react'
import PropTypes from 'prop-types'
import HyphenatedMaskedInput from 'common/HyphenatedMaskedInput'

const capitalizedStr = str =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`

const toCamelCase = name => {
  const subStrArray = name.split(/-/g)
  const firstSubStr = subStrArray[0].toLowerCase()
  const subStringsAfterFirst = subStrArray.slice(1)
  const capitalizedSubStrings = subStringsAfterFirst.map(substr => capitalizedStr(substr))
  return `${firstSubStr}${capitalizedSubStrings.join('')}`
}

const toCapitalCase = name => name
  .split(/-/g)
  .map(substr => capitalizedStr(substr))
  .join('')

const MaskedSearchInput = ({name, onBlur, onChange, onFocus, ...props}) => {
  const camelName = toCamelCase(name)
  const capitalName = toCapitalCase(name)
  return (
    <HyphenatedMaskedInput
      id={`search-${name}`}
      gridClassName={`col-md-3 ${name}-field`}
      onBlur={() => onBlur(`${camelName}ErrorCheck`)}
      onChange={({target: {value}}) => onChange(`search${capitalName}`, value)}
      onFocus={() => onFocus(`${camelName}ErrorCheck`)}
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
