import React from 'react'
import PropTypes from 'prop-types'
import AgeNumberSelect from 'common/search/age/AgeNumberSelect'

class ApproximateAgeNumberSelect extends React.Component {
  render() {
    const {onChange, ...rest} = this.props
    return <AgeNumberSelect onChange={onChange} {...rest} />
  }
}

ApproximateAgeNumberSelect.propTypes = {
  id: PropTypes.string,
  gridClassName: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default ApproximateAgeNumberSelect
