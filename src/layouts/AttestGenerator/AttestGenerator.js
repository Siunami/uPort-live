import React, { Component } from 'react'

import uuid from '../../util/uuid'
import { uport } from '../../util/connectors'

/**
 * @classdesc
 * The event ownership attestation generator component 
 *
 * TODO: Maybe rename this to something more specific, 
 *       as there are multiple attestations we will end up issuing
 * TODO: Inject this into a modal of some sort instead of taking up
 *       its own page ? 
 */
class AttestGenerator extends Component {
  constructor(props, { authData }) {
    super(props)

    authData = this.props
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**
   * Generic method for updating a controlled field
   * @param {Event}  event              -- an onChange event fired by a field
   * @param {String} event.target.name  -- the name of the state variable and input 'name' field
   * @param {String} event.target.value -- the string value of the input field after the change
   */
  handleChange(event) {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  /**
   * Issue an event ownership credential, indicating the creation of an event.
   * The fields of the event ownership credential are populated by the controlled fields
   * of the input form
   * @param {Event} event -- the form submission event, only captured to prevent default
   */
  handleSubmit(event) {
    event.preventDefault();

    const {address} = this.props.authData
    const {name, location, date, about} = this.state

    // TODO: Replace with a call to a lambda function which will do the signing
    //       there may also be some csrf protection we need to do on that as well (?)
    uport.attestCredentials({
      sub: address,
      claim: {
        // Single key in claim is required for standardizing event ownership credentials
        UPORT_LIVE_EVENT: {
          // Individual fields are taken from http://schema.org/Event 
          // and described further in schemas.md
          identifier: uuid(),
          organizer: address,
          // FAKE DATE FOR NOW
          startDate: (new Date()).toISOString(),
          name, location, about
        }
      }
    })
  }

  /**
   * Display a form with fields to define a new event.  
   * Creation of the event will issue an attestation to the signed-in user
   * with the scanning of a QR code
   */
  render() {
    const {name, location, date, about} = this.state

    return (
      <main className="container">
        <div className="fullpage">
          <h1>Create an Event</h1>

          <form className="ui form" onSubmit={this.handleSubmit}>
            <h4 className="ui dividing header">Create an Event</h4>

            <div className="field">
              <label>Event Name</label>
              <input type="text" name="name" value={name} onChange={this.handleChange} placeholder="Event Name"/>
            </div>

            <div className="field">
              <label>About</label>
              <input type="text" name="about" value={about} onChange={this.handleChange} placeholder="Describe your event"/>
            </div>

            <div className="field">
              <label>Event Location</label>
              <div className="field">
                <input type="text" name="location" value={location} onChange={this.handleChange} placeholder="Event location"/>
              </div>
            </div>
            <div className="fields">
              <label>Event Dates</label>
              <div className="field">
                <input type="date" name="startDate" value={date} onChange={this.handleChange} placeholder={new Date()}/>
              </div>
              {/*<div className="field">
                <input type="date" name="endDate" value={} onChange={this.handleChange} placeholder="Event End Date"/>
              </div>*/}
            </div>
            <input type="submit" value="Create!" />
          </form>
        </div>
      </main>
    )
  }
}

export default AttestGenerator
