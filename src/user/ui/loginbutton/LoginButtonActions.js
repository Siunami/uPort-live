import { uport } from './../../../util/connectors.js'
import { browserHistory } from 'react-router'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export const GET_ATTESTATIONS = 'GET_ATTESTATIONS'
function getAttestations(attestations) {
  return {
    type: GET_ATTESTATIONS,
    payload: attestations
  }
}

export function loginUser() {
  return function(dispatch) {
    // UPort and its web3 instance are defined in ./../../../util/wrappers.
    // Request uPort persona of account passed via QR
    uport.requestCredentials({
      requested: ['name', 'avatar', 'phone', 'country'],
      // This is where we request the uPort Live Events
      verified: ['UPORT_LIVE_EVENT']
    }).then((credentials) => {
      dispatch(userLoggedIn(credentials))
      var attestations = [];
      for (var i = 0; i < credentials.verified.length; i++) {
        attestations.push(credentials.verified[i].claim.UPORT_LIVE_EVENT);
      }
      dispatch(getAttestations(attestations));
      // Used a manual redirect here as opposed to a wrapper.
      // This way, once logged in a user can still access the home page.
      var currentLocation = browserHistory.getCurrentLocation()

      if ('redirect' in currentLocation.query)
      {
        return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
      }

      return browserHistory.push('/dashboard')
    })
  }
}
