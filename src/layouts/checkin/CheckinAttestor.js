import React, { Component } from 'react'
// Watch out, we got two different things called connect
import { Connect, SimpleSigner } from 'uport-connect'
import { connect } from 'react-redux'

import { endCheckin } from './checkinActions'
import { selectCheckin } from './checkinReducer'
import { uport, web3 } from '../../util/connectors'

import uPortLogo from '../../img/uport-logo.svg'

/**
 * @classdesc
 * This component presents an infinite checkin flow for a particular
 * event, with it's own ethr-did keypair based identity
 */
class CheckinAttestor extends Component {
  constructor(props) {
    super(props)

    // TODO: Maybe move this into the redux store or something so that
    // it can persist accross checkin sessions? unsure if this is possible
    this.state = {
      checkinCount: 0
    }

    // Extract relevant data from the owner's event credential
    const {keypair, ...details} = props.eventData

    // Build the credential to be issued to people
    this.claim = {
      uportLiveAttendance: details
    }

    // Create a connect instance for the Event's keypair
    const {address, privateKey} = keypair
    this.eventIdentity = new Connect(details.name, {
      clientId: address, 
      network: 'rinkeby',
      signer: new SimpleSigner(privateKey)
    })

    this.doCheckin = this.doCheckin.bind(this)
  }

  /**
   * Pop up a new uport login flow, initiated by the Connect object
   * with the identity of the event
   */
  doCheckin() {
    const {checkinCount} = this.state

    // Check in the next user, making the request from the
    // EVENT's identity
    this.eventIdentity.requestCredentials({
      requested: ['address', 'name'],
      notifications: true
    }).then(({address}) => {
      // Push the attendance credential
      this.eventIdentity.attestCredentials({
        sub: address,
        claim: this.claim
      })
      // Update the checkin count
      this.setState({checkinCount})
    })
  }

  render() {
    const {returnToDashboard, eventData} = this.props
    const {checkinCount} = this.state

    return (
      <main className="container">
        <div className="fullpage">
          <button className="back" onClick={returnToDashboard}>&larr; dashboard</button>
          <h2>Welcome to {name}!</h2>
          <p>Use your uPort mobile application to receive a Proof of Attendance credential</p>
          <button id="checkin" onClick={this.doCheckin}>
            <img className="uport-logo-icon" src={uPortLogo} alt="UPort Logo" />Check in with uPort
          </button>
          <h5>{checkinCount} attendees checked in so far</h5>
        </div>
      </main>
    )
  }
}

// Connect with redux 
const mapStateToProps = (state, ownProps) => ({
  eventData: state.checkin.eventData
})

const mapDispatchToProps = (dispatch) => ({
  returnToDashboard: (event) => {
    event.preventDefault()
    dispatch(endCheckin())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckinAttestor)