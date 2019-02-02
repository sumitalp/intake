import React from 'react'
import PropTypes from 'prop-types'
import ShowField from 'common/ShowField'
import {AddressPropType} from 'data/address'

const AddressesWithPhoneNumbersShow = ({addresses, phoneNumbers}) => {
  console.log(`addresses`, addresses)
  console.log(`phoneNumbers`, phoneNumbers)

  return (
    <div>
      {phoneNumbers.map((personPhoneNumbers, index) => {
        const addressPhoneNumberIndex = index
        return personPhoneNumbers.map(
          ({number, type, extension, errors}, index) => (
            <div key={`phoneNumber-${addressPhoneNumberIndex}-${index}`}>
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
          )
        )
      })}
      {addresses.map(({city, state, street, type, zip, zipError}, index) => (
        <div key={`address-${index}`}>
          <div className="row gap-top">
            <ShowField gridClassName="col-md-6" label="Address">
              {street}
            </ShowField>
            <ShowField gridClassName="col-md-6" label="City">
              {city}
            </ShowField>
          </div>
          <div className="row gap-top">
            <ShowField gridClassName="col-md-4" label="State">
              {state}
            </ShowField>
            <ShowField gridClassName="col-md-2" label="Zip" errors={zipError}>
              {zip}
            </ShowField>
            <ShowField gridClassName="col-md-6" label="Address Type">
              {type}
            </ShowField>
          </div>
        </div>
      ))}
    </div>
  )
}

AddressesWithPhoneNumbersShow.propTypes = {
  addresses: PropTypes.arrayOf(AddressPropType),
  phoneNumbers: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.string,
        type: PropTypes.string,
        errors: PropTypes.array,
      })
    )
  ),
}

export default AddressesWithPhoneNumbersShow
