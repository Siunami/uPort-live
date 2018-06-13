import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import EventCard from './EventCard'

import './Dashboard.css'

/**
 * @classdesc
 * This component will display all of a user's own events
 */
class Dashboard extends Component {
  constructor(props) {
    super(props)

    let {authData} = props

    this.state = {
      // THIS JUST GETS A SINGLE ONE, NOT ALL OF THEM
      events: authData && authData.UPORT_LIVE_EVENT
    }
  }

  handleEvent() {
    browserHistory.push("/AttestGenerator")
  }

  render() {
    // HACKING THIS INTO A LIST FOR NOW
    // Should ideally be a list of *all* attestations already
    const ownEvents = [this.state.events || {}]
    const username = this.props.authData
      && this.props.authData.name

    return (
      <main className="container">
        <div className="fullpage">
          <h2>Welcome, {username}!</h2>
          <button onClick={this.handleEvent}>Create a new Event</button>
          <h4>Events You Organize</h4>
          {ownEvents.map(({identifier, ...details}) =>
            <EventCard key={identifier} {...details} />
          )}
        </div>
      </main>
    )
  }
}

export default Dashboard
