import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { browserHistory } from 'react-router'
import moment from 'moment'
import { connect } from 'react-redux'

import uuid from '../../util/uuid'
import { uport } from '../../util/connectors'

import 'react-datepicker/dist/react-datepicker.css';
// import { start } from 'repl';

const mapStateToProps = (state, ownProps) => {
  return {}
}

export const ADD_ATTESTATION = "ADD_ATTESTATION";
export const attestationAction = attestation => ({
  type: ADD_ATTESTATION,
  payload: attestation
});

const mapDispatchToProps = dispatch => {
  return {
    attestationAction: attestation =>
      dispatch(attestationAction(attestation))
  };
};

/**
 * @classdesc
 * The event ownership attestation generator component 
 *
 * TODO: Maybe rename this to something more specific, 
 *       as there are multiple attestations we will end up issuing
 * TODO: Inject this into a modal of some sort instead of taking up
 *       its own page ? 
 */
export class AttestGenerator extends Component {
  constructor(props, { authData }) {
    super(props)

    authData = this.props
    this.state = {
      startDate: moment(),
      endDate: moment()
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**
   * Generic method for updating a controlled field
   * @param {Event}  event              -- an onChange event fired by a field
   * @param {String} event.target.name  -- the name of the state variable and input 'name' field
   * @param {String} event.target.value -- the string value of the input field after the change
   */
  handleFieldChange(event) {
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
    const {name, location, startDate, endDate, about} = this.state

    const uuidNumber = uuid();

    // TODO: Confirm all fields have been filled out
    // TODO: Replace with a call to a lambda function which will do the signing
    //       there may also be some csrf protection we need to do on that as well (?)
    uport.attestCredentials({
      sub: address,
      claim: {
        // Single key in claim is required for standardizing event ownership credentials
        UPORT_LIVE_EVENT: {
          // Individual fields are taken from http://schema.org/Event 
          // and described further in schemas.md
          identifier: uuidNumber,
          organizer: address,
          // FAKE DATE FOR NOW
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          name, location, about
        }
      }
    }).then((data) => {
      this.props.attestationAction({
        identifier:uuidNumber,
        organizer: address,
        // FAKE DATE FOR NOW
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        name, location, about
      })
      browserHistory.push('/dashboard');
    })
  }

  /**
   * Display a form with fields to define a new event.  
   * Creation of the event will issue an attestation to the signed-in user
   * with the scanning of a QR code
   */
  render() {
    const {name, location, startDate, endDate, about} = this.state

    const updateStartDate = (startDate) => this.setState({startDate})
    const updateEndDate = (endDate) => this.setState({endDate})

    return (
      <main className="container">
        <div className="fullpage">
          <h1>Create an Event</h1>

          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="field">
              <label>Event Name</label>
              <input type="text" name="name" value={name} onChange={this.handleFieldChange} placeholder="Event Name"/>
            </div>

            <div className="field">
              <label>About</label>
              <input type="text" name="about" value={about} onChange={this.handleFieldChange} placeholder="Describe your event"/>
            </div>

            <div className="field">
              <label>Event Location</label>
              <div className="field">
                <input type="text" name="location" value={location} onChange={this.handleFieldChange} placeholder="Event location"/>
              </div>
            </div>
            <div className="field">
              <div className="fields">
                <label>Event Dates</label>
                <div className="field">
                  <DatePicker selected={startDate} onChange={updateStartDate}/>
                </div>
                <div className="field">
                  <DatePicker selected={endDate} onChange={updateEndDate}/>
                </div>
              </div>
            </div>
            <input type="submit" value="Create!" />
          </form>
        </div>
      </main>
    )
  }
}

const AttestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AttestGenerator)

export default AttestContainer
