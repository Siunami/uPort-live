import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import EventCard from './EventCard'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    console.log('props', props)
    console.log('auth', authData)

    authData = this.props

    this.state = {
      events: authData.UPORT_LIVE_EVENT
    }
  }

  handleEvent(){
    browserHistory.push("/AttestGenerator");
  }

  render() {
    const myEvents = [this.state.events]

    // TODO: extract list of created events from authData
    // Something like this should be returned by the credentials requested in loginbutton/LoginButtonActions.js
    // const myEvents = [{
    //   identifier: 'test-id',
    //   name: 'Ethereal Summit 2018',
    //   startDate: '2018-05-11T14:45:18+00:00',
    //   location: 'Knockdown Center 52-19 Flushing Ave, Maspeth, NY',
    //   about: 'Ethereal Summit brings together adventurous thinkers from all walks of life',
    // }]

    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>{this.props.authData.name}'s Dashboard</h1>
            <button onClick={this.handleEvent}>New Event</button>
            <h4>My Events</h4>
            {myEvents.map((event) =>
              <EventCard key={event.identifier} {...event} />
            )}
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
