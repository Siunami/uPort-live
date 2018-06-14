import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './fonts/open-sans.css'
import '../semantic/dist/semantic.min.css'
import './App.css'

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <ul className="navbar-right">
        <li className="menu-item">
          <Link to="/dashboard" className="menu-link">Dashboard</Link>
        </li>
        <li className="menu-item">
          <Link to="/profile" className="menu-link">Profile</Link>
        </li>
        <LogoutButtonContainer />
      </ul>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <ul className="navbar-right">
        <LoginButtonContainer>login</LoginButtonContainer>
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
