import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { eventsReducer } from '../components/events'
import { userReducer } from '../components/user'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  events: eventsReducer
})

export default reducer
