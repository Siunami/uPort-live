import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import checkinReducer from './layouts/checkin/checkinReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  checkin: checkinReducer
})

export default reducer
