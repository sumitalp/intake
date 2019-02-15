import React from 'react'
import PropTypes from 'prop-types'
import GENDERS from 'enums/Genders'
import GenderSelect from 'common/search/gender/GenderSelect'

class GenderAtBirthSelect extends React.PureComponent {
  onChange() {
    this.props.onChange()
  }

  render() {
    return (
      <GenderSelect
        genders={GENDERS}
        onChange={this.onChange.bind(this)}
        {...this.props}
      />
    )
  }
}

GenderAtBirthSelect.propTypes = {
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default GenderAtBirthSelect
