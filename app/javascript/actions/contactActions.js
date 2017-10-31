export const SAVE_CONTACT = 'SAVE_CONTACT'
export const SAVE_CONTACT_SUCCESS = 'SAVE_CONTACT_SUCCESS'
export const SAVE_CONTACT_FAILURE = 'SAVE_CONTACT_FAILURE'
export const FETCH_CONTACT = 'FETCH_CONTACT'
export const FETCH_CONTACT_SUCCESS = 'FETCH_CONTACT_SUCCESS'
export const FETCH_CONTACT_FAILURE = 'FETCH_CONTACT_FAILURE'
export function save({id, investigation_id, started_at, status, note, purpose, communication_method, location, people}) {
  return {type: SAVE_CONTACT, id, investigation_id, started_at, status, note, purpose, communication_method, location, people}
}
export function saveSuccess({id, started_at, status, note, purpose, communication_method, location}) {
  return {type: SAVE_CONTACT_SUCCESS, id, started_at, status, note, purpose, communication_method, location}
}
export function saveFailure(error) {
  return {type: SAVE_CONTACT_FAILURE, error}
}
export function fetch(investigationId, id) {
  return {type: FETCH_CONTACT, investigation_id: investigationId, id}
}
export function fetchSuccess(investigationId, {id, started_at, status, note, purpose, communication_method, location, people}) {
  return {type: FETCH_CONTACT_SUCCESS, investigation_id: investigationId, id, started_at, status, note, purpose, communication_method, location, people}
}
export function fetchFailure(error) {
  return {type: FETCH_CONTACT_FAILURE, error}
}