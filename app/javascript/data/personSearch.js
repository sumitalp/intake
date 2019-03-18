import PropTypes from 'prop-types'

const mapObject = (obj, f) => {
  const newObj = {}
  Object.entries(obj).forEach(([key, value]) => {
    newObj[key] = f(value)
  })
  return newObj
}

const SEARCH_PARAMS = Object.freeze({
  searchApproximateAge: 'approximate_age',
  searchApproximateAgeUnits: 'approximate_age_units',
  searchClientId: 'client_id',
  searchDateOfBirth: 'date_of_birth',
  searchFirstName: 'first_name',
  searchSexAtBirth: 'sex_at_birth',
  searchLastName: 'last_name',
  searchMiddleName: 'middle_name',
  searchSsn: 'ssn',
  searchSuffix: 'suffix',
  searchTerm: 'search_term',
})

export const toAPIParams = fields => {
  const params = {}
  Object.entries(SEARCH_PARAMS).forEach(([fieldName, paramName]) => {
    params[paramName] = fields[fieldName]
  })
  return params
}

export const PersonSearchFieldsPropType = PropTypes.shape(mapObject(SEARCH_PARAMS, () => PropTypes.string))
export const PersonSearchFieldsDefaultProps = {personSearchFields: mapObject(SEARCH_PARAMS, () => '')}
