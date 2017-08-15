import * as IntakeConfig from 'common/config'
import PropTypes from 'prop-types'
import React from 'react'

const ScreeningSubmitButton = ({actions, params}) => (
  <div className='row'>
    <div className='centered'>
      <button
        className='btn btn-primary'
        onClick={() => actions.submitScreening(params.id)}
      >
        Submit
      </button>
    </div>
  </div>
)

ScreeningSubmitButton.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
}
export default ScreeningSubmitButton
