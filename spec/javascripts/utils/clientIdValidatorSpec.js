import {getClientIdErrors} from 'utils/clientIdValidator'

describe('clientIdValidator', () => {
  describe('getClientIdErrors', () => {
    it('does not return error message if client id is 19 digits.', () => {
      expect(getClientIdErrors('1111111111111111111'))
        .toEqual([])
    })

    it('returns error message if client id is less than 19 digits.', () => {
      expect(getClientIdErrors('11111111'))
        .toEqual(['Client Id number must be 19 digits long.'])
    })
  })
})
