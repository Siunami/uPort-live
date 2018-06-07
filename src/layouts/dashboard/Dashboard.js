import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Attest from '../../user/ui/attestbutton/AttestComponent'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  handleEvent(){
    browserHistory.push("/AttestGenerator");
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>{this.props.authData.name}'s Dashboard</h1>
            <button onClick={this.handleEvent}>New Event</button>
            <h4>My Events</h4>
            <div className="ui card">
                <div className="content">
                  <i className="right floated check icon"><p>128</p></i>
                  <div className="header">Ethereal Summit 2018</div>
                  <div className="meta">Knockdown Center | May 11-12</div>
                  <hr></hr>
                  <div className="description">
                    <p><b>About</b>: Ethereal Summit brings together adventurous thinkers from all walks of life.</p>
                    <p><b>Location</b>: 52-19 Flushing Ave, Maspeth, NY 11378</p>
                    <p><b>Start Date</b>: May 11, 2018</p>
                    <p><b>End Date</b>: May 11, 2018</p>
                    <p><b>Details</b>: Proof of Attendance</p>
                  </div>
                </div>
                <div className="extra content">
                  <span className="left floated like">
                    <i className="edit icon">
                    </i>
                  </span>
                  <span className="right floated star">
                    <i className="trash icon">
                    </i>

                  </span>
                </div>
              </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
