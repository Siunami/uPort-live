import { combineReducers } from 'redux'

/**
 * Combine the current (i.e. checkin) event subtree with the ownEvents subtree
 * together this makes up the events subtree, and reduces together to form a separate
 * branch from `user` and `router`
 * @see ../reducer.js
 */

import checkinReducer from './checkin/checkinReducer'
import createReducer from './create/createReducer'

export default combineReducers({
	checkin: checkinReducer,
	ownEvents: createReducer
})