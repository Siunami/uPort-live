import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import EventCard from './EventCard'

/**
 * @classdesc
 * This component will display all of a user's own events
 */
class Dashboard extends Component {
  constructor(props) {
    super(props)

    let {authData} = props;
    this.state = {
      // THIS JUST GETS A SINGLE ONE, NOT ALL OF THEM
      events: authData.UPORT_LIVE_EVENT
    }
  }

  handleEvent() {
    browserHistory.push("/AttestGenerator");
  }

  render() {
    // HACKING THIS INTO A LIST FOR NOW
    // Should ideally be a list of *all* attestations already
    const ownEvents = [this.state.events]

    console.log(ownEvents)

    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>{this.props.authData.name}'s Dashboard</h1>
            <button onClick={this.handleEvent}>New Event</button>
            <h4>Your Events</h4>
            {ownEvents.map((event) =>
              <EventCard key={event.identifier} {...event} />
            )}
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
