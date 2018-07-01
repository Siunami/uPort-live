import Profile from './Profile'
import LoginButton from './login/LoginButton'
import LogoutButton from './logout/LogoutButton'

import { loginUser } from './login/actions'
import { logoutUser } from './logout/actions'

import userReducer from './reducer'

console.log('user/index:')
console.log(LoginButton)

/** Export Comopnents */
export { Profile, LoginButton, LogoutButton, loginUser, logoutUser, userReducer}

/** Export actions and reducer */
