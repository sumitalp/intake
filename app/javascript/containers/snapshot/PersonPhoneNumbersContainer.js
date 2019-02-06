import {connect} from 'react-redux'
import PhoneNumbersShow from 'views/people/PhoneNumbersShow'
import {getParticipantFormattedPhoneNumbersSelector} from 'selectors/participantSelectors'
import {sortPhoneNumberTypes} from 'utils/sortPhoneNumberTypes'

const mapStateToProps = (state, {personId}) => {
  const result = sortPhoneNumberTypes(
    getParticipantFormattedPhoneNumbersSelector(state, personId).toJS()
  )

  return {phoneNumbers: result.length === 0 ? [{}] : result}
}

export default connect(mapStateToProps)(PhoneNumbersShow)
