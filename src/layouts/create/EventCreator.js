import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux'
import { Credentials } from 'uport'
import moment from 'moment'

import { createEvent } from './createActions'
import { uport, web3 } from '../../util/connectors'

import 'react-datepicker/dist/react-datepicker.css';


/**
 * @classdesc
 * The event ownership attestation generator component 
 *
 * TODO: Inject this into a modal of some sort instead of taking up
 *       its own page ? maybe ?
 */
class EventCreator extends Component {
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

  checkFields(){
    return true
  }

  /**
   * Issue an event ownership credential, indicating the creation of an event.
   * The fields of the event ownership credential are populated by the controlled fields
   * of the input form
   * @param {Event} event -- the form submission event, only captured to prevent default
   */
  handleSubmit(event) {
    event.preventDefault();
    const {authData, createEvent} = this.props
    const {name, location, startDate, endDate, about} = this.state

    // Create a did keypair for the event
    // identifier = {did, privateKey}
    const identifier = Credentials.createIdentity()

    // Individual fields are taken from http://schema.org/Event 
    // and described further in schemas.md
    const eventDetails = {
      identifier,
      organizer: authData.address,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      name, location, about
    }

    // TODO: Confirm all fields have been filled out
    uport.attestCredentials({
      sub: authData.address,
      claim: {
        UPORT_LIVE_EVENT: eventDetails
      }
    }).then(() => {
      createEvent(eventDetails)
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

    const currDate = moment()

    const updateStartDate = (startDate) => {
      if (startDate >= currDate)
        this.setState({startDate})
        if (startDate > this.state.endDate){
          this.setState({endDate:startDate})
        }
      else {
        document.getElementById("startDate").value = this.state.startDate
      }
    }
    const updateEndDate = (endDate) => {
      if (endDate >= this.state.startDate)
        this.setState({endDate})
      else {
        document.getElementById("endDate").value = this.state.endDate
      }
    }

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
                  <DatePicker id="startDate" selected={startDate} onChange={updateStartDate} />
                </div>
                <div className="field">
                  <DatePicker id="endDate" selected={endDate} onChange={updateEndDate} />
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

// Connect to redux store
const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = dispatch => ({
    createEvent: eventData => dispatch(createEvent(eventData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCreator)
