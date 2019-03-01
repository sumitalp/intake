import {connect} from 'react-redux'
import PersonSearchForm from 'views/people/PersonSearchForm'
import {selectParticipants} from 'selectors/participantSelectors'
import {
  selectPeopleResults,
  selectResultsTotalValue,
  selectStartTime,
  selectPersonSearchFields,
} from 'selectors/peopleSearchSelectors'
import {
  search,
  setPersonSearchField,
  clear,
  loadMoreResults,
  resetPersonSearch,
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
    staffId: getStaffIdSelector(state),
    startTime: selectStartTime(state),
    participants: selectParticipants(state).toJS(),
    isSelectable,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const onClear = () => dispatch(clear())
  const onChange = (field, value) => {
    dispatch(setPersonSearchField(field, value))
  }
  const onCancel = () => {
    dispatch(clear())
    dispatch(resetPersonSearch())
  }
  const onSearch = (isAvancedSearchOn, personSearchFields) =>
    dispatch(search(ownProps.isClientOnly, isAvancedSearchOn, personSearchFields))
  const onLoadMoreResults = (isAvancedSearchOn, personSearchFields) =>
    dispatch(loadMoreResults(ownProps.isClientOnly, isAvancedSearchOn, personSearchFields))

  return {
    onSearch,
    onClear,
    onChange,
    onCancel,
    onLoadMoreResults,
    dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonSearchForm)
