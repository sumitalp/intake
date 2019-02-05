import PHONE_NUMBER_TYPE from 'enums/PhoneNumberType'

const HOME = 2
const CELL = 0
const OTHER = 3
const phoneNumberOrder = [
  PHONE_NUMBER_TYPE[HOME],
  PHONE_NUMBER_TYPE[CELL],
  PHONE_NUMBER_TYPE[OTHER],
]
const flatten = array =>
  array.reduce(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []
  )

export const sortPhoneNumberTypes = personPhoneNumbers => {
  return flatten(
    personPhoneNumbers.map(phoneNumbers => {
      return phoneNumberOrder.map(type => {
        return phoneNumbers.filter(phoneNumber => phoneNumber.type === type)
      })
    })
  )
}
