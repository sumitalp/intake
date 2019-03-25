import React from 'react'
import PropTypes from 'prop-types'
import AgeNumberSelect from 'common/search/age/AgeNumberSelect'
import {APPROXIMATE_AGE_UNIT_VALUES} from 'enums/ApproximateAgeUnits'

const ApproximateAgeNumberSelect = (props) => {
  const ageUnit = props.ageUnit
  const ageUnitRange = APPROXIMATE_AGE_UNIT_VALUES[ageUnit]
  return (<AgeNumberSelect range={ageUnitRange} {...props} />)
}

ApproximateAgeNumberSelect.propTypes = {
  ageUnit: PropTypes.string.isRequired,
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default ApproximateAgeNumberSelect
