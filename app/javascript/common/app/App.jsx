import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getUserNameSelector} from 'selectors/userInfoSelectors'
import {fetch as fetchUserInfoAction} from 'actions/userInfoActions'
import {fetch as fetchSystemCodesAction} from 'actions/systemCodesActions'
import {checkStaffPermission} from 'actions/staffActions'
import {bindActionCreators} from 'redux'
import Footer from 'views/Footer'
import userNameFormatter from 'utils/userNameFormatter'
import {config, isSnapshot, isHotline} from 'common/config'
import {ScrollToTop} from 'common/app/ScrollToTop'
import {createScreening} from 'actions/screeningActions'
import {createSnapshot} from 'actions/snapshotActions'
import {snapshotEnabledSelector, hotlineEnabledSelector} from 'selectors/homePageSelectors'
import {Page, CaresProvider, MenuItem, UncontrolledUserMenu} from '@cwds/components'

const RouterScrollToTop = withRouter(ScrollToTop)

export class App extends React.Component {
  componentDidMount() {
    const {fetchSystemCodesAction, checkStaffPermission, fetchUserInfoAction} = this.props.actions
    fetchUserInfoAction()
    fetchSystemCodesAction()
    checkStaffPermission('add_sensitive_people')
    checkStaffPermission('has_state_override')
  }

  render() {
    console.log('props', this.props)
    const logoutUrl = `${config().base_path.replace(/\/$/, '')}/logout`

    const UserMenu = (state) => {
      const name = this.props.fullName
      return (
        <UncontrolledUserMenu label={name}>
          <MenuItem className={'no-uppercase'} tag={'a'} href={logoutUrl}>
            Logout
          </MenuItem>
        </UncontrolledUserMenu>
      )
    }

    const DashboardButtons = () => (
      <div className='pull-right'>
        {
          this.props.snapshot &&
        <button type='button'
          className='btn primary-btn'
          disabled={false}
          onClick={this.props.actions.createSnapshot}
        >
        Start Snapshot
        </button>
        }
        {
          this.props.hotline &&
        <button type='button'
          className='btn primary-btn'
          disabled={false}
          onClick={this.props.actions.createScreening}
        >
        Start Screening
        </button>
        }
      </div>
    )

    const SnapshotButton = ({}) => (
      <button
        type="button"
        className="btn primary-btn pull-right"
        disabled={false}
        // onClick={startOver}
      >
      Start Over
      </button>
    )

    const ScreeningButton = ({}) => (
      <button type='button'
        className='btn primary-btn pull-right'
        // disabled={disableSubmitButton}
        // onClick={() => submitScreening(id)}
      >
      Submit
      </button>
    )
    // eslint-disable-next-line no-nested-ternary
    const buttons = isSnapshot(location) ? <SnapshotButton /> : isHotline(location) ? <ScreeningButton /> : <DashboardButtons />

    // eslint-disable-next-line no-nested-ternary
    const pageTitle = isSnapshot(location) ? 'Snapshort' :
      isHotline(location) ? 'Hotline' :
        'Dashboard'
    return (
      <RouterScrollToTop>
        <CaresProvider UserMenu={UserMenu} Brand= 'CWS-CARES'>
          <Page layout= 'dashboard' title= {pageTitle} PageActions={() => buttons}>
            {this.props.children}
            <Footer />
          </Page>
        </CaresProvider>
      </RouterScrollToTop>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  createScreening: PropTypes.func,
  createSnapshot: PropTypes.func,
  fullName: PropTypes.string,
  hotline: PropTypes.bool,
  snapshot: PropTypes.bool,
}
const mapStateToProps = (state, _ownProps) => ({
  fullName: userNameFormatter(getUserNameSelector(state)),
  snapshot: snapshotEnabledSelector(state),
  hotline: hotlineEnabledSelector(state),
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
  actions: bindActionCreators({fetchUserInfoAction, fetchSystemCodesAction, checkStaffPermission, createScreening, createSnapshot}, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
