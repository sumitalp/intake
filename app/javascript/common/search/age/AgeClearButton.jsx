import React from 'react'
import PropTypes from 'prop-types'

const AgeClearButton = ({onClear}) => {
  const enterKeyCode = 13
  const clearAgeButton = (
    <span
      className="clear-search-ui-age-fields-action clear-age-button"
      role="button"
      tabIndex="0"
      onKeyPress={(e) => { if (e.charCode === enterKeyCode) { onClear('age') } }}
      onClick={() => { onClear('age') }}
    >
      clear
    </span>
  )
  return (
    <div className="col-md-12 clear-search-ui-age-fields clear-age-wrapper">
      Choose one: ({clearAgeButton})
    </div>
  )
}

AgeClearButton.propTypes = {
  onClear: PropTypes.func,
}

export default AgeClearButton
