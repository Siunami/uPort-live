import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import moment from 'moment'

import EventCard from './EventCard'
import { beginCheckin } from '../checkin'

import './EventDashboard.css'

/**
 * @classdesc
 * This component will display all of a user's own events
 */
class Dashboard extends Component {
  handleEvent() {
    browserHistory.push("/create")
  }

  sortByKey(array) {
    return array.sort(function(a, b) {
      var x = a["endDate"]; var y = b["endDate"];
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
  }

  sortEvents(events) {
    const currDate = moment().toISOString()
    let currEvents = []
    let pastEvents = []
    for (var i = 0; i < events.length; i++){
      // console.log([events[i].startDate, events[i].endDate])
      if (events[i].endDate >= currDate)
        currEvents.push(events[i])
      else
        pastEvents.push(events[i])
    }
    return [this.sortByKey(currEvents), this.sortByKey(pastEvents)]
  }

  render() {
    const { ownEvents, beginCheckin, authData } = this.props
    const [ activeEvents, oldEvents ] = this.sortEvents(ownEvents)
    
    return (
      <main className="container">
        <div className="fullpage">
          <h2>Welcome, {authData.name}!</h2>
          <button className="ui button" onClick={this.handleEvent}>Create New Event</button>
          <br></br>
          <h3> Active Events </h3>
          <em>Click an event card to check in attendees!</em>
          <div className="ui four column grid">
          {activeEvents.map((eventDetails) =>
            <EventCard beginCheckin={beginCheckin} currentEvent={true} key={eventDetails.name} {...eventDetails} />
          )}
          </div>

          <h3> Past Events</h3>
          <div className="ui four column grid">
          {oldEvents.map((eventDetails) =>
            <EventCard beginCheckin={beginCheckin} currentEvent={false} key={eventDetails.name} {...eventDetails} />
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
