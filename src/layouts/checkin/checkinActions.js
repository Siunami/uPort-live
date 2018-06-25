import { browserHistory } from 'react-router'

/**
 * The checkin slice of the Redux state tree defines the current
 * event for which checkin is being offered.  The checkin action
 * is dispatched along with an event credential
 */
export const BEGIN_CHECKIN_FLOW = 'BEGIN_CHECKIN_FLOW'
export function checkinFlowBegan(eventData) {
	return {
		type: BEGIN_CHECKIN_FLOW,
		payload: eventData
	}
}

/**
 * Begin the checkin process by emitting a checkin action
 * and redirecting to the checkin page
 * @param {object} eventData -- The contents of an event ownership credential
 *								retrieved from the logged-in user.  
 * @see ../create/EventCreator.js
 */
export function beginCheckin(eventData) {
	return function (dispatch) {
		dispatch(checkinFlowBegan(eventData))
		browserHistory.push('/checkin')
	}
}

// No data is necessary to end the checkin flow
export const END_CHECKIN_FLOW = 'END_CHECKIN_FLOW'
export function checkinFlowEnded() {
	return {
		type: END_CHECKIN_FLOW
	}
}

/**
 * End the checkin flow by returning to the dashboard
 * and nulling out the currently checking in event
 */
export function endCheckin() {
	return function (dispatch) {
		// TODO: add a confirm dialog or something?
		dispatch(checkinFlowEnded())
		browserHistory.push('/dashboard')
	}
}