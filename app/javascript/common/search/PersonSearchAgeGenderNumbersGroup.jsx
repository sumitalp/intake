import React from 'react'
import PropTypes from 'prop-types'
import MaskedInputField from 'common/MaskedInputField'
import SearchByAgeMethodSelect from 'common/search/age/SearchByAgeMethodSelect'
import AgeSearchFields from 'common/search/age/AgeSearchFields'
import SexAtBirthSelect from 'common/search/sexatbirth/SexAtBirthSelect'
import {PersonSearchFieldsPropType, PersonSearchFieldsDefaultProps} from 'data/personSearch'
import {moveCursor} from 'utils/moveCursor'

const PersonSearchAgeGenderNumbersGroup = ({onBlur, onChange, personSearchFields, onFocus, clientIdError, ssnErrors, dobErrors, onKeyPress, onKeyUp}) => (
  <div className="row">
    <div className="col-md-3 age-search-field-container">
      <SearchByAgeMethodSelect
        gridClassName="search-by-age-method-field"
        id="search-by-age-method"
        onChange={onChange}
        onKeyPress={onKeyPress}
        value={personSearchFields.searchByAgeMethod}
      />
      <AgeSearchFields
        dobErrors={dobErrors}
        onBlur={onBlur}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
        personSearchFields={personSearchFields}
      />
    </div>
    <SexAtBirthSelect
      id="search-sex-at-birth"
      gridClassName="col-md-3 sex-at-birth-field"
      onChange={onChange}
      value={personSearchFields.searchSexAtBirth}
      onKeyPress={onKeyPress}
    />
    <MaskedInputField
      id="search-client-id"
      label="Client ID Number"
      gridClassName="col-md-3 client-id-field"
      onBlur={() => onBlur('clientIdErrorCheck')}
      onChange={({target: {value}}) => onChange('searchClientId', value)}
      onFocus={onFocus}
      value={personSearchFields.searchClientId}
      mask='1111-1111-1111-1111111'
      placeholder='____-____-____-_______'
      maxLength='19'
      errors={clientIdError}
      moveCursor={moveCursor}
      onKeyPress={onKeyPress}
    />
    <MaskedInputField
      id="search-ssn"
      label="Social Security Number"
      gridClassName="col-md-3 ssn-field"
      onBlur={() => onBlur('ssnErrorCheck')}
      onChange={({target: {value}}) => onChange('searchSsn', value)}
      onFocus={onFocus}
      value={personSearchFields.searchSsn}
      mask='111-11-1111'
      placeholder='___-__-____'
      maxLength='9'
      errors={ssnErrors}
      moveCursor={moveCursor}
      onKeyPress={onKeyPress}
    />
  </div>
)

PersonSearchAgeGenderNumbersGroup.propTypes = {
  clientIdError: PropTypes.array,
  dobErrors: PropTypes.array,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  personSearchFields: PersonSearchFieldsPropType,
  ssnErrors: PropTypes.array,
}

PersonSearchAgeGenderNumbersGroup.defaultProps = PersonSearchFieldsDefaultProps

export default PersonSearchAgeGenderNumbersGroup
