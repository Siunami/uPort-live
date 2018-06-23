import { uport } from './../../../util/connectors.js'
import { browserHistory } from 'react-router'

/**
 * @note: This little bit is kind of hacky, but I'm still trying to
 *        think of a better way to straddle the events branch and the
 *        user branch of the state tree.  Ideally this would live somewhere
 *        else and then combine in a more elegant way, but since there are
 *        multiple components that use the loginUser() function this is
 *        the only immediately evident way to sneak them both in one
 *        not the worst i guess?
 */
import { createEvent } from '../../../layouts/create/createActions.js'


export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {
  return function(dispatch) {
    // UPort and its web3 instance are defined in ./../../../util/wrappers.
    // Request uPort persona of account passed via QR
    uport.requestCredentials({
      requested: ['name', 'avatar', 'phone', 'country'],
      // This is where we request the uPort Live Events
      verified: ['UPORT_LIVE_EVENT'],
      notifications: true
    }).then((credentials) => {
      dispatch(userLoggedIn(credentials))

      // HERE WE HACK OUT MOVING ATTESTATIONS TO THE RIGHT BRANCH
      const attestations = credentials.verified.map(({claim}) => claim.UPORT_LIVE_EVENT)
      dispatch(createEvent(attestations));

      // Used a manual redirect here as opposed to a wrapper.
      // This way, once logged in a user can still access the home page.
      const currentLocation = browserHistory.getCurrentLocation()

      if ('redirect' in currentLocation.query)
      {
        return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
      }

      return browserHistory.push('/dashboard')
    })
  }
}