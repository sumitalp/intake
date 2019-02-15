import React from 'react'
import PropTypes from 'prop-types'
import StatesInjector from 'common/search/state/StatesInjector'
import StateSelect from 'common/search/state/StateSelect'

class StateNameSelect extends React.PureComponent {
  onChange(systemCode) {
    this.props.onChange(systemCode ? systemCode.value : '', 'state')
  }

  render() {
    return (
      <StatesInjector>
        <StateSelect {...this.props} onChange={this.onChange.bind(this)} />
      </StatesInjector>
    )
  }
}

StateNameSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}
export default StateNameSelect
