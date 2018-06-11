import React, { Component } from 'react'

import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <div className="banner">
              <h1 className="banner-head">Create badges for attendees with uPort</h1>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
