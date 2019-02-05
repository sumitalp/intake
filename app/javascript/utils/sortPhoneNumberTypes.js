import PHONE_NUMBER_TYPE from 'enums/PhoneNumberType'

const HOME = 2
const CELL = 0
const OTHER = 3
const phoneNumberOrder = [
  PHONE_NUMBER_TYPE[HOME],
  PHONE_NUMBER_TYPE[CELL],
  PHONE_NUMBER_TYPE[OTHER],
]

export const sortPhoneNumberTypes = personPhoneNumbers => {
  return personPhoneNumbers
    .map(phoneNumbers => {
      return phoneNumberOrder.map(type => {
        return phoneNumbers.filter(phoneNumber => phoneNumber.type === type)
      })
    })
    .flat(2)
}
