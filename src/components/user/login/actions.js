import { browserHistory } from 'react-router'

import { uport } from '../../../util/connectors.js'
import { createEvent } from '../../events'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {
  return function(dispatch) {    
    // UPort and its web3 instance are defined in ../../../util/wrappers.
    // Request uPort persona of account passed via QR
    uport.requestCredentials({
      requested: ['name', 'avatar', 'phone', 'country'],
      // This is where we request the uPort Live Events
      verified: ['uportLiveEvent'],
      // notifications: true
    }).then((credentials) => {
      dispatch(userLoggedIn(credentials))

      // HERE WE HACK OUT MOVING ATTESTATIONS TO THE RIGHT BRANCH
      const attestations = credentials.verified.map(({claim}) => claim.uportLiveEvent)
      dispatch(createEvent(attestations));

      // Used a manual redirect here as opposed to a wrapper.
      // This way, once logged in a user can still access the home page.
      const currentLocation = browserHistory.getCurrentLocation()

      if ('redirect' in currentLocation.query) {
        return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
      }

      return browserHistory.push('/dashboard')
    })
  }
}