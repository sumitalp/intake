import React from 'react'
import PropTypes from 'prop-types'
import ShowField from 'common/ShowField'
import {PhoneNumberPropType} from 'data/address'

const renderPhoneNumbers = (addressIndex, phoneNumbers) => {
  const phoneNumberOrder = ['Home', 'Cell', 'Other']

  return phoneNumberOrder
    .map(type => {
      const filteredPhoneNumbers = phoneNumbers.filter(
        phoneNumber => phoneNumber.type === type
      )

      return filteredPhoneNumbers.length ?
        filteredPhoneNumbers.map(({number, type, extension, errors}) => (
          <div key={`${addressIndex}-${type}`}>
            <div className="row gap-top">
              <ShowField
                gridClassName="col-md-4"
                label="Phone Number"
                errors={errors}
              >
                {number}
              </ShowField>
              <ShowField gridClassName="col-md-4" label="Extension">
                {extension}
              </ShowField>
              <ShowField gridClassName="col-md-4" label="Phone Number Type">
                {type}
              </ShowField>
            </div>
          </div>
        )) :
        null
    })
    .flat()
}

const PhoneNumbersShow = ({participantPhoneNumbers}) => (
  <div>
    {participantPhoneNumbers.map((phoneNumbers, addressIndex) =>
      renderPhoneNumbers(addressIndex, phoneNumbers)
    )}
  </div>
)

PhoneNumbersShow.propTypes = {
  participantPhoneNumbers: PropTypes.arrayOf(
    PropTypes.arrayOf(PhoneNumberPropType)
  ),
}

export default PhoneNumbersShow
