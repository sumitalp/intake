import {connect} from 'react-redux'
import PersonSearchForm from 'views/people/PersonSearchForm'
import {selectParticipants} from 'selectors/participantSelectors'
import {
  selectPeopleResults,
  selectResultsTotalValue,
  selectStartTime,
  selectPersonSearchFields,
  selectClientIdError,
  selectSsnErrors,
  selectDobErrors,
  selectCanSearch,
} from 'selectors/peopleSearchSelectors'
import {
  search,
  setPersonSearchField,
  clear,
  loadMoreResults,
  resetPersonSearch,
  setClientIdError,
  setSsnErrorCheck,
  resetSsnErrorCheck,
  resetClientIdErrorCheck,
  setDobErrorCheck,
} from 'actions/peopleSearchActions'
import {canUserAddClient} from 'utils/authorization'
import {getStaffIdSelector} from 'selectors/userInfoSelectors'
import {selectStates} from 'selectors/systemCodeSelectors'
import {selectCountiesWithoutStateOfCalifornia} from 'selectors/systemCodeSelectors'

const mapStateToProps = state => {
  const userInfo = state.get('userInfo').toJS()
  const hasAddSensitivePerson = state.getIn(['staff', 'add_sensitive_people'])
  const hasOverride = state.getIn(['staff', 'has_state_override'])
  const isSelectable = person =>
    canUserAddClient(userInfo, hasAddSensitivePerson, person, hasOverride)

  return {
    states: selectStates(state).toJS(),
    counties: selectCountiesWithoutStateOfCalifornia(state).toJS(),
    results: selectPeopleResults(state).toJS(),
    total: selectResultsTotalValue(state),
    personSearchFields: selectPersonSearchFields(state),
    clientIdError: selectClientIdError(state),
    ssnErrors: selectSsnErrors(state),
    dobErrors: selectDobErrors(state),
    staffId: getStaffIdSelector(state),
    startTime: selectStartTime(state),
    participants: selectParticipants(state).toJS(),
    isSelectable,
    canSearch: selectCanSearch(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const onBlur = (id) => {
    if (id === 'search-client-id') {
      dispatch(setClientIdError())
    } else if (id === 'search-ssn') {
      dispatch(setSsnErrorCheck())
    } else if (id === 'search-date-of-birth') { dispatch(setDobErrorCheck()) }
  }
  const onFocus = (id) => {
    if (id === 'search-ssn') { dispatch(resetSsnErrorCheck()) }
    if (id === 'search-client-id') { dispatch(resetClientIdErrorCheck()) }
  }
  const onClear = (field) => dispatch(clear(field))
  const onChange = (field, value) => {
    dispatch(setPersonSearchField(field, value))
  }
  const onCancel = () => {
    dispatch(onClear('results'))
    dispatch(resetPersonSearch())
  }
  const onSearch = (isAvancedSearchOn, personSearchFields) =>
    dispatch(search(ownProps.isClientOnly, isAvancedSearchOn, personSearchFields))
  const onLoadMoreResults = (isAvancedSearchOn, personSearchFields) =>
    dispatch(loadMoreResults(ownProps.isClientOnly, isAvancedSearchOn, personSearchFields))
  return {
    onBlur,
    onSearch,
    onClear,
    onChange,
    onCancel,
    onFocus,
    onLoadMoreResults,
    dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonSearchForm)
