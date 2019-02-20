import React from 'react'
import PropTypes from 'prop-types'
import GenderSelect from 'common/search/sexatbirth/GenderSelect'
import GENDERS from 'enums/Genders'

class SexAtBirthSelect extends React.PureComponent {
  render() {
    const {onChange} = this.props

    return (
      <GenderSelect genders={GENDERS} onChange={onChange} {...this.props} />
    )
  }
}

SexAtBirthSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default SexAtBirthSelect
