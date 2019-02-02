import PropTypes from 'prop-types'
import React from 'react'
import PersonCardContainer from 'containers/snapshot/PersonCardContainer'
import PersonShowContainer from 'containers/snapshot/PersonInformationContainer'
import PersonAddressesWithPhoneNumbersContainer from '../containers/snapshot/PersonAddressesWithPhoneNumbersContainer'

const PersonCardView = ({personId}) => (
  <PersonCardContainer
    personId={personId}
    show={
      <div>
        <PersonShowContainer personId={personId} />
        <PersonAddressesWithPhoneNumbersContainer personId={personId} />
      </div>
    }
  />
)

PersonCardView.propTypes = {
  personId: PropTypes.string.isRequired,
}

export default PersonCardView
