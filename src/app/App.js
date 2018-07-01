import React, { Component } from 'react'
import { Link } from 'react-router'

import { HiddenOnlyAuth, VisibleOnlyAuth } from '../util/wrappers.js'
import { LoginButton, LogoutButton } from '../components'

// Styles
import './App.css'
import '../fonts/open-sans.css'
import '../../semantic/dist/semantic.min.css'

/**
 * @classdesc
 * The 'app' component wraps all individual pages with a navbar
 */
class App extends Component {
  render() {
    // Links to be displayed to logged in users
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <ul className="navbar-right">
        <li className="menu-item">
          <Link to="/dashboard" className="menu-link">Dashboard</Link>
        </li>
        <li className="menu-item">
          <Link to="/profile" className="menu-link">Profile</Link>
        </li>
        <LogoutButton />
      </ul>
    )

    // Links to be displayed to logged out users
    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <ul className="navbar-right">
        <LoginButton>login</LoginButton>
      </ul>
    )

    return (
      <div className="App">
        <nav className="navbar">
          <div className="nav-heading">
            <Link to="/">uPort Live</Link>
          </div>
          <OnlyGuestLinks />
          <OnlyAuthLinks />
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
