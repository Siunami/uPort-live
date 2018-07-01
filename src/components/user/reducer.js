import { USER_LOGGED_IN } from './login/actions'
import { USER_LOGGED_OUT } from './logout/actions'

const initialState = {
  data: null,
}

/**
 * Save the User data object as received on login, and set to null on logout
 */
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return Object.assign({}, state, {
        data: action.payload
      })
    case USER_LOGGED_OUT:
      return Object.assign({}, state, {
        data: null
      })
    default:
      return state
  }
}

export default userReducer
