import PropTypes from 'prop-types'
import React from 'react'

const GrouperHeading = ({text}) => (
  <h4 className='grouper'>{text}</h4>
)

GrouperHeading.propTypes = {
  text: PropTypes.string.isRequired,
}

export default GrouperHeading
