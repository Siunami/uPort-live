import { browserHistory } from 'react-router'
import { uport } from './../../../util/connectors.js'

export function attestUser() {
  return function(dispatch) {
    uport.requestCredentials().then((credentials) => {
      // FUTURE TODO: Check credentials with event database before offering attestation.

      // Attest specific credentials
      uport.attestCredentials({
        sub: credentials.address,
        claim: {
          "test_event": "Test Event",
          "additional_data":"Hi"
        },
        exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
      })
    })

    // Redirect home.
    return browserHistory.push('/')
  }
}
