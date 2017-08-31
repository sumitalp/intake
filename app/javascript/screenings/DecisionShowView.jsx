import * as IntakeConfig from 'common/config'
import EditLink from 'common/EditLink'
import PropTypes from 'prop-types'
import React from 'react'
import SCREENING_DECISION from 'enums/ScreeningDecision'
import SCREENING_DECISION_OPTIONS from 'enums/ScreeningDecisionOptions'
import ShowField from 'common/ShowField'
import _ from 'lodash'

const DecisionShowView = ({screening, onEdit, errors}) => {
  const isRestricted = Boolean(screening.get('access_restrictions'))
  const decisionDetailLabel = (() => {
    const decisionOptions = SCREENING_DECISION_OPTIONS[screening.get('screening_decision')] || false
    return (decisionOptions && decisionOptions.label) || ''
  })()

  const decisionDetailText = (() => {
    const decisionOptions = SCREENING_DECISION_OPTIONS[screening.get('screening_decision')] || false
    if (decisionOptions.type === 'text') {
      return screening.get('screening_decision_detail')
    } else {
      const machineValue = screening.get('screening_decision_detail')
      return (decisionOptions.values && decisionOptions.values[machineValue]) || ''
    }
  })()

  return (
    <div className='card show double-gap-top' id='decision-card'>
      <div className='card-header'>
        <span>Decision</span>
        <EditLink ariaLabel='Edit decision card' onClick={onEdit} />
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col-md-6'>
            <ShowField label='Screening Decision' errors={errors.get('screening_decision')} required>
              {screening.get('screening_decision') && SCREENING_DECISION[screening.get('screening_decision')] || ''}
            </ShowField>
            <ShowField
              label={decisionDetailLabel}
              required={decisionDetailLabel === 'Response time'}
              errors={errors.get('screening_decision_detail')}
            >
              {decisionDetailText}
            </ShowField>
            <ShowField label='Additional information'>
              {screening.get('additional_information')}
            </ShowField>
            <ShowField label='Access Restrictions'>
              {_.capitalize(screening.get('access_restrictions'))}
            </ShowField>
            { isRestricted &&
              <ShowField label='Restrictions Rationale' required>
                {screening.get('restrictions_rationale')}
              </ShowField>
            }
          </div>
          <div className='col-md-6'>
            <p className='double-gap-top'><strong>SDM Hotline Tool</strong></p>
            <div>Determine Decision and Response Time by using Structured Decision Making.</div>
            <a href={IntakeConfig.sdmPath()} target='_blank' id='complete_sdm'>Complete SDM</a>
          </div>
        </div>
      </div>
    </div>
  )
}

DecisionShowView.propTypes = {
  errors: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  screening: PropTypes.object.isRequired,
}
export default DecisionShowView
