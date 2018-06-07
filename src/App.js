import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import '../semantic/dist/semantic.min.css'
import './App.css'

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/profile" className="pure-menu-link">Profile</Link>
        </li>
        <LogoutButtonContainer />
      </span>
      // <div className='ui large secondary inverted pointing menu'>
      //   <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
      //   <Link to="/profile" className="pure-menu-link">Profile</Link>
      //   <LogoutButtonContainer />
      // </div>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <LoginButtonContainer />
      </span>
    )

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <Link to="/" className="pure-menu-heading pure-menu-link">uPort Live</Link>
          <ul className="pure-menu-list navbar-right">
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
        </nav>
        {/* <div className='pusher'>
          <div className='ui inverted secondary inverted pointing menu'>
            <div className='ui container'>
                <OnlyGuestLinks />
                <OnlyAuthLinks />
            </div>
            <div className='ui text container'>
              <h1 className='ui inverted header'>
                uPort Live
              </h1>
              <h2>Create badges for your event</h2>
              <div className="ui huge primary button">Get Started <i className="right arrow icon"></i></div>
            </div>
          </div>
        </div> */}


        {this.props.children}
      </div>
    );
  }
}

export default App
