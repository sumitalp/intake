import {connect} from 'react-redux'
import PersonSearchForm from 'views/people/PersonSearchForm'
import {selectParticipants} from 'selectors/participantSelectors'
import {
  selectPeopleResults,
  selectResultsTotalValue,
  selectSearchTermValue,
  selectStartTime,
  selectSearchLastName,
  selectSearchFirstName,
  selectSearchMiddleName,
  selectSearchClientId,
  selectSearchSuffix,
  selectSearchSsn,
  selectSearchDateOfBirth,
  selectSearchApproximateAge,
  selectSearchApproximateAgeUnits,
  selectSearchGenderAtBirth,
  selectSearchAddress,
  selectSearchCity,
  selectSearchCounty,
  selectSearchState,
  selectSearchCountry,
  selectSearchZipCode,
} from 'selectors/peopleSearchSelectors'
import {
  search,
  setSearchTerm,
  setSearchLastName,
  setSearchFirstName,
  setSearchMiddleName,
  setSearchClientId,
  setSearchSuffix,
  setSearchSsn,
  setSearchDateOfBirth,
  setSearchApproximateAge,
  setSearchApproximateAgeUnits,
  setSearchGenderAtBirth,
  setSearchAddress,
  setSearchCity,
  setSearchCounty,
  setSearchState,
  setSearchCountry,
  setSearchZipCode,
  clear,
  loadMoreResults,
  resetPersonSearch,
} from 'actions/peopleSearchActions'
import {canUserAddClient} from 'utils/authorization'
import {getStaffIdSelector} from 'selectors/userInfoSelectors'

const mapStateToProps = state => {
  const userInfo = state.get('userInfo').toJS()
  const hasAddSensitivePerson = state.getIn(['staff', 'add_sensitive_people'])
  const hasOverride = state.getIn(['staff', 'has_state_override'])
  const isSelectable = person =>
    canUserAddClient(userInfo, hasAddSensitivePerson, person, hasOverride)

  return {
    results: selectPeopleResults(state).toJS(),
    total: selectResultsTotalValue(state),
    searchTerm: selectSearchTermValue(state),
    searchLastName: selectSearchLastName(state),
    searchFirstName: selectSearchFirstName(state),
    searchMiddleName: selectSearchMiddleName(state),
    searchClientId: selectSearchClientId(state),
    searchSuffix: selectSearchSuffix(state),
    searchSsn: selectSearchSsn(state),
    searchDateOfBirth: selectSearchDateOfBirth(state),
    searchApproximateAge: selectSearchApproximateAge(state),
    searchApproximateAgeUnits: selectSearchApproximateAgeUnits(state),
    searchGenderAtBirth: selectSearchGenderAtBirth(state),
    searchAddress: selectSearchAddress(state),
    searchCity: selectSearchCity(state),
    searchCounty: selectSearchCounty(state),
    searchState: selectSearchState(state),
    searchCountry: selectSearchCountry(state),
    searchZipCode: selectSearchZipCode(state),
    staffId: getStaffIdSelector(state),
    startTime: selectStartTime(state),
    participants: selectParticipants(state).toJS(),
    isSelectable,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const onClear = () => dispatch(clear())
  const onChange = (value, field) => {
    switch (field) {
      case 'lastname':
        dispatch(setSearchLastName(value))
        break
      case 'firstname':
        dispatch(setSearchFirstName(value))
        break
      case 'middlename':
        dispatch(setSearchMiddleName(value))
        break
      case 'clientid':
        dispatch(setSearchClientId(value))
        break
      case 'suffix':
        dispatch(setSearchSuffix(value))
        break
      case 'ssn':
        dispatch(setSearchSsn(value))
        break
      case 'dateofbirth':
        dispatch(setSearchDateOfBirth(value))
        break
      case 'approximateage':
        dispatch(setSearchApproximateAge(value))
        break
      case 'approximateageunits':
        dispatch(setSearchApproximateAgeUnits(value))
        break
      case 'genderatbirth':
        dispatch(setSearchGenderAtBirth(value))
        break
      case 'address':
        dispatch(setSearchAddress(value))
        break
      case 'city':
        dispatch(setSearchCity(value))
        break
      case 'county':
        dispatch(setSearchCounty(value))
        break
      case 'state':
        dispatch(setSearchState(value))
        break
      case 'country':
        dispatch(setSearchCountry(value))
        break
      case 'zipcode':
        dispatch(setSearchZipCode(value))
        break
      default:
        break
    }

    dispatch(setSearchTerm())
  }
  const onCancel = () => {
    dispatch(clear())
    dispatch(resetPersonSearch())
  }
  const onSearch = (value, address) =>
    dispatch(search(value, ownProps.isClientOnly, address))
  const onLoadMoreResults = address =>
    dispatch(loadMoreResults(ownProps.isClientOnly, address))

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
