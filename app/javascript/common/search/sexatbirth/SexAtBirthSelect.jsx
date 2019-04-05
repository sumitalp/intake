import React from 'react'
import PropTypes from 'prop-types'
import GenderSelect from 'common/search/sexatbirth/GenderSelect'
import GENDERS from 'enums/Genders'

class SexAtBirthSelect extends React.PureComponent {
  render() {
    const {onChange, onKeyPress} = this.props

    return (
      <GenderSelect genders={GENDERS} onChange={onChange} {...this.props} onKeyPress={onKeyPress} />
    )
  }
}

SexAtBirthSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  value: PropTypes.string,
}

export default SexAtBirthSelect
