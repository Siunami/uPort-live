import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'

const initialState = {
  data: []
}

const attestationReducer = (state = initialState, action) => {
  if (action.type === 'ADD_ATTESTATION')
  {
    return {
      ...state, data: state.data.concat(action.payload)
    }
  }

  return state
}

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  attestation: attestationReducer
})

export default reducer
