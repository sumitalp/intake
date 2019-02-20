import React from 'react'
import PropTypes from 'prop-types'
import StateSelect from 'common/search/state/StateSelect'

class StateNameSelect extends React.PureComponent {
  onChange(systemCode) {
    this.props.onChange('searchState', systemCode ? systemCode.value : '')
  }

  render() {
    return (
      <StateSelect {...this.props} onChange={this.onChange.bind(this)} />
    )
  }
}

StateNameSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  states: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  value: PropTypes.string.isRequired,
}

export default StateNameSelect
