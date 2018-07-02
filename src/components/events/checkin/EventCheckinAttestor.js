import React, { Component } from 'react'
// Watch out, we got two different things called connect
import { Connect, SimpleSigner, Credentials } from 'uport-connect'
import { connect } from 'react-redux'

import { endCheckin } from './actions'

import uPortLogo from '../../../img/uport-logo.svg'

/**
 * @classdesc
 * This component presents an infinite checkin flow for a particular
 * event, with it's own ethr-did keypair based identity
 */
export class EventCheckinAttestor extends Component {
  constructor(props) {
    super(props)

    // TODO: Maybe move this into the redux store or something so that
    // it can persist accross checkin sessions? unsure if this is possible
    this.state = {
      checkinCount: 0
    }

    this.doCheckin = this.doCheckin.bind(this)
  }

  componentDidMount() {
    if (this.props.eventData) 
      this.createEventIdentity(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.eventData) 
      this.createEventIdentity(nextProps)
  }

  createEventIdentity(props) {
    // Extract relevant data from the owner's event credential
    const {identifier, ...details} = props.eventData

    // Build the credential to be issued to people
    this.claim = {
      uportLiveAttendance: details
    }

    // Create a connect instance for the Event's keypair
    const {did, privateKey} = identifier
    const signer = new SimpleSigner(privateKey)

    this.eventIdentity = new Connect(details.name, {
      credentials: new Credentials({did, signer})
    })
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
      // notifications: true
    }).then(({address}) => {
      // Push the attendance credential
      this.eventIdentity.attestCredentials({
        sub: address,
        exp: 2000000000,
        claim: this.claim
      })
      // Update the checkin count
      this.setState({checkinCount: checkinCount + 1})
    })
  }

  render() {
    const {returnToDashboard, eventData} = this.props
    const name = eventData && eventData.name
    const {checkinCount} = this.state

    return (
      <main className="container">
        <div className="fullpage">
        <div className="ui animated button" onClick={returnToDashboard} tabIndex="0">
            <div className="visible content">Back</div>
            <div className="hidden content">
              <i className="left arrow icon"></i>
            </div>
          </div>
          <h2>Welcome to {name}!</h2>
          <p>Use your uPort mobile application to receive a Proof of Attendance credential</p>
          <button className="ui button" id="checkin" onClick={this.doCheckin} disabled={!eventData}>
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
  eventData: state.events.checkin
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
)(EventCheckinAttestor)