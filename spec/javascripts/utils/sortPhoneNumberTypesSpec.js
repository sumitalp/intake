import {sortPhoneNumberTypes} from 'utils/sortPhoneNumberTypes'

const phoneNumbers = [
  [
    {number: '(111) 111-1111', type: 'Home', extension: '1', errors: []},
    {number: '(222) 222-2222', type: 'Cell', extension: '2', errors: []},
    {number: '(333) 333-3333', type: 'Other', extension: '3', errors: []},
    {number: '(765) 823-6170', type: 'Work', extension: '100', errors: []},
  ],
  [
    {number: '(555) 555-5555', type: 'Cell', extension: '5', errors: []},
    {
      number: '(777) 777-7777',
      type: 'Other',
      extension: '2342342',
      errors: [],
    },
    {number: '(444) 444-4444', type: 'Home', extension: '4', errors: []},
  ],
  [
    {
      number: '(123) 456-7890',
      type: 'Other',
      extension: '10',
      errors: [],
    },
    {number: '(888) 888-8888', type: 'Home', extension: '8', errors: []},
    {number: '(999) 999-9999', type: 'Cell', extension: '9', errors: []},
  ],
  [
    {
      number: '(123) 555-5555',
      type: 'Other',
      extension: '12',
      errors: [],
    },
    {number: '(234) 444-4444', type: 'Cell', extension: '11', errors: []},
  ],
  [
    {
      number: '(345) 999-9999',
      type: 'Other',
      extension: '13',
      errors: [],
    },
  ],
]

describe('Sort Phone Numbers by Type', () => {
  let sortedPhoneNumbers
  beforeEach(() => {
    sortedPhoneNumbers = sortPhoneNumberTypes(phoneNumbers)
  })

  it('sorts the Home type first', () => {
    expect(sortedPhoneNumbers[0]).toEqual({
      number: '(111) 111-1111',
      type: 'Home',
      extension: '1',
      errors: [],
    })
  })

  it('sorts the Cell type second', () => {
    expect(sortedPhoneNumbers[1]).toEqual({
      number: '(222) 222-2222',
      type: 'Cell',
      extension: '2',
      errors: [],
    })
  })

  it('sorts the Other type third', () => {
    expect(sortedPhoneNumbers[2]).toEqual({
      number: '(333) 333-3333',
      type: 'Other',
      extension: '3',
      errors: [],
    })
  })

  it('sorts the Work type fourth', () => {
    expect(sortedPhoneNumbers[3]).toEqual({
      number: '(765) 823-6170',
      type: 'Work',
      extension: '100',
      errors: [],
    })
  })

  it('returns empty array when there are no phone numbers', () => {
    const noPhoneNumbers = [[]]
    const sortedPhoneNumbers = sortPhoneNumberTypes(noPhoneNumbers)
    expect(sortedPhoneNumbers).toEqual([])
  })

  describe('phone number type value is falsey', () => {
    describe('type value is empty string', () => {
      it('sorts the phone numbers in the correct order', () => {
        const phoneNumbers = [
          [
            {
              number: '(111) 111-1111',
              type: 'Home',
              extension: '1',
              errors: [],
            },
            {
              number: '(222) 222-2222',
              type: 'Cell',
              extension: '2',
              errors: [],
            },
            {number: '(333) 333-3333', type: '', extension: '3', errors: []},
            {
              number: '(765) 823-6170',
              type: 'Work',
              extension: '100',
              errors: [],
            },
          ],
        ]
        const sortedPhoneNumbers = sortPhoneNumberTypes(phoneNumbers)
        expect(sortedPhoneNumbers).toEqual([
          {
            number: '(111) 111-1111',
            type: 'Home',
            extension: '1',
            errors: [],
          },
          {
            number: '(222) 222-2222',
            type: 'Cell',
            extension: '2',
            errors: [],
          },
          {
            number: '(765) 823-6170',
            type: 'Work',
            extension: '100',
            errors: [],
          },
        ])
      })
    })

    describe('type value is null', () => {
      it('sorts the phone numbers in the correct order', () => {
        const phoneNumbers = [
          [
            {
              number: '(111) 111-1111',
              type: null,
              extension: '1',
              errors: [],
            },
            {
              number: '(222) 222-2222',
              type: 'Cell',
              extension: '2',
              errors: [],
            },
            {
              number: '(333) 333-3333',
              type: 'Other',
              extension: '3',
              errors: [],
            },
            {
              number: '(765) 823-6170',
              type: 'Work',
              extension: '100',
              errors: [],
            },
          ],
        ]
        const sortedPhoneNumbers = sortPhoneNumberTypes(phoneNumbers)
        expect(sortedPhoneNumbers).toEqual([
          {
            number: '(222) 222-2222',
            type: 'Cell',
            extension: '2',
            errors: [],
          },
          {
            number: '(333) 333-3333',
            type: 'Other',
            extension: '3',
            errors: [],
          },
          {
            number: '(765) 823-6170',
            type: 'Work',
            extension: '100',
            errors: [],
          },
        ])
      })
    })

    describe('type key is undefined', () => {
      it('sorts the phone numbers in the correct order', () => {
        const phoneNumbers = [
          [
            {
              number: '(111) 111-1111',
              type: 'Home',
              extension: '1',
              errors: [],
            },
            {
              number: '(222) 222-2222',
              extension: '2',
              errors: [],
            },
            {
              number: '(333) 333-3333',
              type: 'Other',
              extension: '3',
              errors: [],
            },
            {
              number: '(765) 823-6170',
              type: 'Work',
              extension: '100',
              errors: [],
            },
          ],
        ]
        const sortedPhoneNumbers = sortPhoneNumberTypes(phoneNumbers)
        expect(sortedPhoneNumbers).toEqual([
          {
            number: '(111) 111-1111',
            type: 'Home',
            extension: '1',
            errors: [],
          },
          {
            number: '(333) 333-3333',
            type: 'Other',
            extension: '3',
            errors: [],
          },
          {
            number: '(765) 823-6170',
            type: 'Work',
            extension: '100',
            errors: [],
          },
        ])
      })
    })
  })

  it('sorts all numbers in the correct order', () => {
    expect(sortedPhoneNumbers).toEqual([
      {number: '(111) 111-1111', type: 'Home', extension: '1', errors: []},
      {number: '(222) 222-2222', type: 'Cell', extension: '2', errors: []},
      {
        number: '(333) 333-3333',
        type: 'Other',
        extension: '3',
        errors: [],
      },
      {number: '(765) 823-6170', type: 'Work', extension: '100', errors: []},
      {number: '(444) 444-4444', type: 'Home', extension: '4', errors: []},
      {number: '(555) 555-5555', type: 'Cell', extension: '5', errors: []},
      {
        number: '(777) 777-7777',
        type: 'Other',
        extension: '2342342',
        errors: [],
      },
      {number: '(888) 888-8888', type: 'Home', extension: '8', errors: []},
      {number: '(999) 999-9999', type: 'Cell', extension: '9', errors: []},
      {
        number: '(123) 456-7890',
        type: 'Other',
        extension: '10',
        errors: [],
      },
      {number: '(234) 444-4444', type: 'Cell', extension: '11', errors: []},
      {
        number: '(123) 555-5555',
        type: 'Other',
        extension: '12',
        errors: [],
      },
      {
        number: '(345) 999-9999',
        type: 'Other',
        extension: '13',
        errors: [],
      },
    ])
  })
})
