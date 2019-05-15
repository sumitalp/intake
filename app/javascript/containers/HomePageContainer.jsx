import {connect} from 'react-redux'
import {hotlineEnabledSelector} from 'selectors/homePageSelectors'
import {HomePage} from 'views/homePage'

function mapStateToProps(state, _ownProps) {
  return {
    hotline: hotlineEnabledSelector(state),
  }
}

export default connect(mapStateToProps, {})(HomePage)
