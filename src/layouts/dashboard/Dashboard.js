import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import EventCard from './EventCard'
import { beginCheckin } from '../checkin/checkinActions'

import './Dashboard.css'

/**
 * @classdesc
 * This component will display all of a user's own events
 */
class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  handleEvent() {
    browserHistory.push("/create")
  }

  render() {
    const { ownEvents, beginCheckin, authData } = this.props

    console.log(ownEvents)

    return (
      <main className="container">
        <div className="fullpage">
          <h2>Welcome, {authData.name}!</h2>
          <button onClick={this.handleEvent}>Create a new Event</button>
          <h4>Events You Organize:</h4>
          <em>Click an event card to check in attendees!</em>
          <div className="ui four column grid">
          {ownEvents.map((eventDetails) =>
            <EventCard beginCheckin={beginCheckin} key={eventDetails.name} {...eventDetails} />
          )}
          </div>
        </div>
      </main>
    )
  }
}

// Connect dashboard to checkin flow
const mapStateToProps = (state, ownProps) => ({
  ownEvents: state.events.ownEvents
})

const mapDispatchToProps = (dispatch) => ({
  beginCheckin: (eventData) => {
    dispatch(beginCheckin(eventData))
  } 
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Dashboard)
