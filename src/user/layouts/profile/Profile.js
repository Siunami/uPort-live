import React, { Component } from 'react'

/**
 * @classdesc
 * At the mom, this component is garbo.  Could be something in the future.
 */
class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="fullpage">
          <h1>Profile</h1>
          <p>Change these details in UPort to see them reflected here.</p>
          <p>
            <strong>Name</strong><br />
            {this.props.authData.name}
          </p>
        </div>
      </main>
    )
  }
}

export default Profile
