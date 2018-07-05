import React, { Component } from 'react'
import { browserHistory } from  'react-router'
import { connect } from 'react-redux'
import { QRUtil } from 'uport-connect'

import { loginUser } from './actions'
import { Spinner } from '../../misc'
import { uport } from '../util/connector'

import './LoginModal.css'

/**
 * This module is a recreation of the login modal built by uport-connect/util
 * We are rebuilding this from scratch to allow for better handling of the QR
 * codes and spinner behavior after/during login
 */

// Links to the uport app in the itunes and google play stores
const apppleStoreLink = `https://itunes.apple.com/us/app/uport-id/id1123434510?mt=8`
const googleStoreLink = `https://play.google.com/store/apps/details?id=com.uportMobile`

class LoginModal extends Component {
	constructor(props) {
    super(props)

    this.state = {
      showSpinner: false,
      QR: null,
      appName: '',
    }

    this.uriHandler = this.uriHandler.bind(this)
    this.cancelLogin = this.cancelLogin.bind(this)
  }

  componentDidMount() {
    const { doLogin } = this.props

    // SUPER HACK ALERT
    // Monkey-patching the uri-handlers because if you specify a specific
    // Uri-handler, the closeUriHandler never fires.  
    // Fuck, this took me so long to figure out
    uport.uriHandler = this.uriHandler
    uport.closeUriHandler = () => {
      this.setState({showSpinner: true})
    }

    // UPort and its web3 instance are defined in ../../../util/wrappers.
    // Request uPort persona of account passed via QR
    uport.requestCredentials({
      requested: ['name', 'avatar', 'phone', 'country'],
      // This is where we request the uPort Live Events
      verified: ['uportLiveEvent'],
      // notifications: true
    }).then((credentials) => {
      doLogin(credentials)
    })
  }

  /**
   * Set the QR code and app details after the login component mounts
   * and the login has been requested
   */
  uriHandler(uri, cancel, appName) {
    const QR = QRUtil.getQRDataURI(uri)
    this.setState({QR, appName, cancel})
  }

  /**
   * Cancel handler if the login is aborted.
   * Redirects back to the original page (kills the modal)
   * and cancels the listener on the messaging server
   */
  cancelLogin() {
    const currentLocation = browserHistory.getCurrentLocation()
    this.state.cancel()
    browserHistory.push(currentLocation.pathname)
  }

  render() {
    const { showSpinner, QR, appName} = this.state

    return (
      <div className="modal fade-in" onClick={this.cancelLogin}>
        <div className="modal-content">
        {showSpinner ? (
          <Spinner />
        ) : (
          <div>
            <button className="cancel"
              onClick={this.cancelLogin}>x</button>
            <h2> Login to <strong>{appName}</strong></h2>
            <img src={QR} alt="Login QR Code - Scan with uPort Mobile App" />

            <div className="buttons">
              <a href={apppleStoreLink}>App Store</a>
              <a href={googleStoreLink}>Google Play Store</a>
            </div>
          </div>
        )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin: (credentials) => {
      dispatch(loginUser(credentials))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal)
