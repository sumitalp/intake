import React from 'react'
import PropTypes from 'prop-types'
import APPROXIMATE_AGE_UNITS from 'enums/ApproximateAgeUnits'
import AgeUnitsSelect from 'common/search/age/AgeUnitsSelect'

class ApproximateAgeUnitsSelect extends React.Component {
  onChange() {
    this.props.onChange()
  }

  filterUnits = units => {
    const {months, years} = units
    return {months, years}
  }

  render() {
    const units = this.filterUnits(APPROXIMATE_AGE_UNITS)
    return (
      <AgeUnitsSelect units={units} onChange={this.onChange} {...this.props} />
    )
  }
}

ApproximateAgeUnitsSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default ApproximateAgeUnitsSelect
