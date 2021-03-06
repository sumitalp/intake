import {
  CREATE_SCREENING_COMPLETE,
  FETCH_SCREENING_COMPLETE,
} from 'actions/actionTypes'
import {
  CREATE_PERSON_COMPLETE,
  DELETE_PERSON_COMPLETE,
  UPDATE_PERSON_COMPLETE,
  CLEAR_PEOPLE,
} from 'actions/personCardActions'
import {SAVE_SCREENING_COMPLETE} from 'actions/screeningActions'
import {fromFerbAddress} from 'data/address'
import {createReducer} from 'utils/createReducer'
import {List, fromJS} from 'immutable'

const transformPerson = (person) =>
  person
    .update('addresses', (addresses) => (addresses || List()).map(fromFerbAddress))

const getParticipantsOnScreening = (state, {payload, error}) => {
  if (error) {
    return state
  } else {
    return fromJS(payload.screening.participants.map((participant) => transformPerson(fromJS(participant))))
  }
}

export default createReducer(List(), {
  [CREATE_SCREENING_COMPLETE]: getParticipantsOnScreening,
  [FETCH_SCREENING_COMPLETE]: getParticipantsOnScreening,
  [SAVE_SCREENING_COMPLETE]: getParticipantsOnScreening,
  [CREATE_PERSON_COMPLETE](state, {payload: {person}, error}) {
    if (error) {
      return state
    } else {
      const newPerson = transformPerson(fromJS(person))
      return state.unshift(newPerson)
    }
  },
  [DELETE_PERSON_COMPLETE](state, {payload: {id}, error}) {
    if (error) {
      return state
    } else {
      return state.filterNot((x) => x.get('id') === id)
    }
  },
  [UPDATE_PERSON_COMPLETE](state, {payload: {person}, error}) {
    if (error) {
      return state
    } else {
      const updatedPerson = transformPerson(fromJS(person))
      const personIndex = state.findIndex((x) => x.get('id') === updatedPerson.get('id'))
      return state.setIn([personIndex], updatedPerson)
    }
  },
  [CLEAR_PEOPLE]() {
    return List()
  },
})
