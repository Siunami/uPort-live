import React, {Component} from 'react'
import moment from 'moment'

/**
 * @classdesc
 * A component for displaying a single event on the user's dashboard
 * Each event will be pulled from the user's attestations that are requested at login
 *
 * TODO: Clicking on an event card will launch the attendance attestation flow for the
 *       clicked event
 */
export default class EventCard extends Component {

  handleEvent(){
    alert("hi");
  }

	render() {
    const {name, startDate, location, about} = this.props
    
    const date = moment(startDate).format('MMM D, YYYY')

		return (
      <div className="column">
        <div className="ui card">
          <div className="content">
            <i className="right floated check icon"></i>
            <div className="header">{name}</div>
            <div className="meta">{location} | {date}</div>
            <hr/>
            <div className="description">
              <p><b>About</b>: {about}</p>
            </div>
          </div>
          <div className="ui bottom attached button" onClick={this.handleEvent}>
            <i className="add icon"></i>
            Add Friend
          </div>

          {/* <div className="extra content">
            <span className="right floated star">
              <i className="trash icon">
              </i>
            </span>
          </div> */}
        </div>
      </div>
		)
	}
}