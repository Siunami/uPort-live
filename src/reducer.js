import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
// import attestationReducer from './layouts/attestationReducer'


const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  // attestation: attestationReducer
})

export default reducer
