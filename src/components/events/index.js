import { combineReducers } from 'redux'

import { EventDashboard } from './dashboard'
import { EventCreator, createEvent, createReducer } from './create'
import { EventCheckinAttestor, beginCheckin, endCheckin, checkinReducer } from './checkin'

/** Exported components */
export { EventDashboard, EventCreator, EventCheckinAttestor }

/** Exported actions/reducers */
export { beginCheckin, endCheckin, createEvent } 
export const eventsReducer = combineReducers({
	checkin: checkinReducer,
	ownEvents: createReducer
})