import React from 'react'
import {Link} from 'react-router'

const ParticipantShowView = ({participant}) => (
  <div className='card show double-gap-top' id={`participants-card-${participant.get('id')}`}>
    <div className='card-header'>
      <span>{`${participant.get('first_name')} ${participant.get('last_name')}`}</span>
      <Link aria-label='Delete participant' className='pull-right' href='#'>
        <i className='fa fa-times'></i>
      </Link>
      <Link aria-label='Edit participant' className='gap-right pull-right' href='#'>
        <i className='fa fa-pencil'></i>
      </Link>
    </div>
    <div className='card-body'>
    </div>
  </div>
)

ParticipantShowView.propTypes = {
  participant: React.PropTypes.object.isRequired,
}
export default ParticipantShowView