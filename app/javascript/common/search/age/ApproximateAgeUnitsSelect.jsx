import React from 'react'
import PropTypes from 'prop-types'
import APPROXIMATE_AGE_UNITS from 'enums/ApproximateAgeUnits'
import AgeUnitsSelect from 'common/search/age/AgeUnitsSelect'

class ApproximateAgeUnitsSelect extends React.Component {
  render() {
    const {onChange, ...rest} = this.props
    const {months, years} = APPROXIMATE_AGE_UNITS
    const units = {months, years}

    return <AgeUnitsSelect units={units} onChange={onChange} {...rest} />
  }
}

ApproximateAgeUnitsSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default ApproximateAgeUnitsSelect
