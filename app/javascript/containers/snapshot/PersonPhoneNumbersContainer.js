import {connect} from 'react-redux'
import PhoneNumbersShow from 'views/people/snapshot/PhoneNumbersShow'
import {getParticipantFormattedPhoneNumbersSelector} from 'selectors/participantSelectors'

const mapStateToProps = (state, {personId}) => {
  const result = getParticipantFormattedPhoneNumbersSelector(
    state,
    personId
  ).toJS()
  return {participantPhoneNumbers: result.length === 0 ? [{}] : result}
}

export default connect(mapStateToProps)(PhoneNumbersShow)
