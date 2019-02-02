import {connect} from 'react-redux'
import AddressesWithPhoneNumbersShow from 'views/people/AddressesWithPhoneNumbersShow'
import {
  selectFormattedAddresses,
  getParticipantFormattedPhoneNumbersSelector,
} from 'selectors/participantSelectors'
import {sortAddressType} from 'utils/SortAddressTypes'

const mapStateToProps = (state, {personId}) => {
  const personAddresses = sortAddressType(
    selectFormattedAddresses(state, personId).toJS()
  )
  const personPhoneNumbers = getParticipantFormattedPhoneNumbersSelector(
    state,
    personId
  ).toJS()

  return {
    addresses: personAddresses.length === 0 ? [{}] : personAddresses,
    phoneNumbers: personPhoneNumbers.length === 0 ? [{}] : personPhoneNumbers,
  } // displays the label when the personAddresses array is empty
}

export default connect(mapStateToProps)(AddressesWithPhoneNumbersShow)
