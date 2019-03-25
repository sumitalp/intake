const APPROXIMATE_AGE_UNITS = Object.freeze({
  days: 'Days',
  weeks: 'Weeks',
  months: 'Months',
  years: 'Years',
})

export const APPROXIMATE_AGE_UNIT_VALUES = Object.freeze({
  months: {
    min: 0, 
    max: 24,
  },
  years: {
    min: 0,
    max: 120,
  },
})

export default APPROXIMATE_AGE_UNITS
