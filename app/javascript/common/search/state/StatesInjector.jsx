import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {selectStates} from 'selectors/systemCodeSelectors'

const mapStateToProps = (state, ownProps) => {
  return {
    states: selectStates(state).toJS(),
    ...ownProps,
  }
}

class StatesInjector extends React.PureComponent {
  render() {
    return React.cloneElement(this.props.children, {
      states: this.props.states,
    })
  }
}

StatesInjector.propTypes = {
  children: PropTypes.element.isRequired,
  states: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      value: PropTypes.string,
    })
  ),
}

export default connect(mapStateToProps)(StatesInjector)
