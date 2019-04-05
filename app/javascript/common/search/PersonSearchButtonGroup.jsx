import React from 'react'
import PropTypes from 'prop-types'
import {PersonSearchFieldsDefaultProps} from 'data/personSearch'

const PersonSearchButtonGroup = ({
  onSubmit,
  onCancel,
  canSearch,
}) => (
  <div className="row person-search-field-group">
    <div className="col-md-12">
      <button
        className="btn person-search-button search"
        onClick={onSubmit}
        disabled={!canSearch}
      >
        Search
      </button>
      <button
        className="btn person-search-button clear"
        onClick={onCancel}
      >
        Clear All
      </button>
    </div>
  </div>
)

PersonSearchButtonGroup.propTypes = {
  canSearch: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

PersonSearchButtonGroup.defaultProps = PersonSearchFieldsDefaultProps

export default PersonSearchButtonGroup
