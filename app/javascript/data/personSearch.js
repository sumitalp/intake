import PropTypes from 'prop-types'

export const PersonSearchFieldsPropType = PropTypes.shape({
  searchAddress: PropTypes.string,
  searchApproximateAge: PropTypes.string,
  searchApproximateAgeUnits: PropTypes.string,
  searchCity: PropTypes.string,
  searchClientId: PropTypes.string,
  searchCountry: PropTypes.string,
  searchCounty: PropTypes.string,
  searchDateOfBirth: PropTypes.string,
  searchFirstName: PropTypes.string,
  searchSexAtBirth: PropTypes.string,
  searchLastName: PropTypes.string,
  searchMiddleName: PropTypes.string,
  searchSsn: PropTypes.string,
  searchState: PropTypes.string,
  searchSuffix: PropTypes.string,
  searchTerm: PropTypes.string,
  searchZipCode: PropTypes.string,
})
