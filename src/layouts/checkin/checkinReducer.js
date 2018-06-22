import {BEGIN_CHECKIN_FLOW, END_CHECKIN_FLOW} from './checkinActions'

// The current event is null by default
const initialState = {eventData: null}

/**
 * Handle the beginning and end of the event checkin flow
 * BEGIN_CHECKIN_FLOW saves the current event to the event branch
 * of the state tree, and END_CHECKIN_FLOW clears it.
 */
const checkinReducer = (state = initialState, action) => {
	switch (action.type) {
		case BEGIN_CHECKIN_FLOW:
			return Object.assign({}, state, {
				eventData: action.payload
			})
		case END_CHECKIN_FLOW:
			return initialState
		default:
			return state 
	}
}

export default checkinReducer


/**
 * Selector for the event data
 */
export const selectCheckinEvent = state => state.checkin.eventData