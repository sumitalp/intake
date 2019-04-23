import React from 'react'
import PropTypes from 'prop-types'
import AgeNumberSelect from 'common/search/age/AgeNumberSelect'
import {APPROXIMATE_AGE_UNIT_VALUES} from 'enums/ApproximateAgeUnits'

const ApproximateAgeNumberSelect = (props) => {
  const {ageUnit, onKeyPress} = props
  const isValidAgeUnit = ageUnit === 'months' || ageUnit === 'years'
  const ageUnitRange = isValidAgeUnit ? APPROXIMATE_AGE_UNIT_VALUES[ageUnit] : {}
  return (<AgeNumberSelect range={ageUnitRange} onKeyPress={onKeyPress} {...props} />)
}

ApproximateAgeNumberSelect.propTypes = {
  ageUnit: PropTypes.string.isRequired,
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  value: PropTypes.string,
}

export default ApproximateAgeNumberSelect
