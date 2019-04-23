import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import MaskedInputField from 'common/MaskedInputField'
import SearchByAgeMethodSelect from 'common/search/age/SearchByAgeMethodSelect'
import AgeSearchFields from 'common/search/age/AgeSearchFields'
import SexAtBirthSelect from 'common/search/sexatbirth/SexAtBirthSelect'
import {PersonSearchFieldsPropType, PersonSearchFieldsDefaultProps} from 'data/personSearch'
import {moveCursor} from 'utils/moveCursor'

const PersonSearchAgeGenderNumbersGroup = ({onBlur, onChange, personSearchFields, clientIdError, ssnErrors, dobErrors, onKeyPress, onKeyUp}) => (
  <Fragment>
    <div className="row">
      <SearchByAgeMethodSelect
        id="search-by-age-method"
        gridClassName="col-md-3 search-by-age-method-field"
        onChange={onChange}
        value={personSearchFields.searchByAgeMethod}
        onKeyPress={onKeyPress}
      />
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
        onBlur={onBlur}
        onChange={({target: {value}}) => onChange('searchClientId', value)}
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
        onBlur={onBlur}
        onChange={({target: {value}}) => onChange('searchSsn', value)}
        value={personSearchFields.searchSsn}
        mask='111-11-1111'
        placeholder='___-__-____'
        maxLength='9'
        errors={ssnErrors}
        moveCursor={moveCursor}
        onKeyPress={onKeyPress}
      />
    </div>
    <div className="row">
      <div className="col-md-3">
        <AgeSearchFields
          dobErrors={dobErrors}
          onBlur={onBlur}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          personSearchFields={personSearchFields}
        />
      </div>
    </div>
  </Fragment>
)

PersonSearchAgeGenderNumbersGroup.propTypes = {
  clientIdError: PropTypes.array,
  dobErrors: PropTypes.array,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  personSearchFields: PersonSearchFieldsPropType,
  ssnErrors: PropTypes.array,
}

PersonSearchAgeGenderNumbersGroup.defaultProps = PersonSearchFieldsDefaultProps

export default PersonSearchAgeGenderNumbersGroup
