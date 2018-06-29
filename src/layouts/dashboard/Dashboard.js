import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import EventCard from './EventCard'
import EventCardOld from './EventCardOld'
import { beginCheckin } from '../checkin/checkinActions'

import moment from 'moment'

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

  sortByKey(array) {
    return array.sort(function(a, b) {
      var x = a["endDate"]; var y = b["endDate"];
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
  }

  sortEvents(events){
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
    return [this.sortByKey(currEvents),this.sortByKey(pastEvents)]
  }

  render() {
    const { ownEvents, beginCheckin, authData } = this.props

    console.log(ownEvents)

    const sortedEvents = this.sortEvents(ownEvents)
    
    return (
      <main className="container">
        <div className="fullpage">
          <h2>Welcome, {authData.name}!</h2>
          <button className="ui button" onClick={this.handleEvent}>Create New Event</button>
          <h4>Events You Organize:</h4>
          <em>Click an event card to check in attendees!</em>
          <br></br>
          <h3> Events </h3>
          <div className="ui four column grid">
          {sortedEvents[0].map((eventDetails) =>
            <EventCard beginCheckin={beginCheckin} key={eventDetails.name} {...eventDetails} />
          )}
          </div>
          <h3> Past Events</h3>
          <div className="ui four column grid">
          {sortedEvents[1].map((eventDetails) =>
            <EventCardOld beginCheckin={beginCheckin} key={eventDetails.name} {...eventDetails} />
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
