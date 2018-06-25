/**
 * Actions for creating event ownership attestations
 * handled in ./createReducer.js
 * Note that the same action fires when a new event is created, and
 * when the user logs in for the first time.  The reducer handles both
 * equivalently
 */

export const CREATE_EVENT = 'CREATE_EVENT'

export const createEvent = eventAttestationOrList => ({
  type: CREATE_EVENT,
  payload: eventAttestationOrList
})
