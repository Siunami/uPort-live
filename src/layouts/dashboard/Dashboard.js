import React, { Component } from 'react'
import { browserHistory } from 'react-router'
// import { connect } from "react-redux";
import store from '../../store'

import EventCard from './EventCard'

import './Dashboard.css'

// const mapStateToProps = (state, ownProps) => {
//   return {}
// }

// export const addAttestation = "addAttestation";
// const mapDispatchToProps = dispatch => {
//   return {
//     addAttestation: attestation => dispatch(addAttestation(attestation))
//   };
// };

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
      events: []
    }
  }

  componentDidMount(){

    var data = store.getState();
    console.log(data);
    var events = data.user.data.verified;
    var newEvents = data.attestation.data;
    var attestations = [];
    for (var i = 0; i < events.length; i++) {
      attestations.push(events[i].claim.UPORT_LIVE_EVENT);
    }
    for (var i = 0; i < newEvents.length; i++) {
      attestations.push(newEvents[i]);
    }
    this.setState({events: attestations});
  }

  handleEvent() {
    browserHistory.push("/AttestGenerator")
  }

  render() {
    // HACKING THIS INTO A LIST FOR NOW
    // Should ideally be a list of *all* attestations already
    const ownEvents = this.state.events
    const username = this.props.authData
      && this.props.authData.name

    return (
      <main className="container">
        <div className="fullpage">
          <h2>Welcome, {username}!</h2>
          <button onClick={this.handleEvent}>Create a new Event</button>
          <h4>Events You Organize</h4>
          {ownEvents.map((event) =>
            <EventCard key={event.identifier} {...event} />
          )}
        </div>
      </main>
    )
  }
}

// const DashboardContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Dashboard)

const DashboardContainer = Dashboard

export default DashboardContainer
