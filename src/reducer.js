import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'

import eventsReducer from './layouts/eventsReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  events: eventsReducer
})

export default reducer
