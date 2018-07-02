import React, { Component } from 'react'
import { Router, Route, IndexRoute, IndexRedirect, Link, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import store from './store'
import { UserIsAuthenticated, UserIsNotAuthenticated, HiddenOnlyAuth, VisibleOnlyAuth } from '../util/wrappers.js'
import { 
  LoginButton, LogoutButton,
  Home, Profile, EventDashboard, EventCreator, EventCheckinAttestor,
  About, FAQ
} from '../components'

const history = syncHistoryWithStore(browserHistory, store)

// Styles
import './App.css'
import '../fonts/open-sans.css'
import '../../semantic/dist/semantic.min.css'

/**
 * This is the App's root component, which specifies the routing etc.
 * The Main component (previously called App) wrapping all of these
 * routes is the MenuWrapper (defined below)
 */
const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={MenuWrapper}>
        <IndexRoute component={Home} />
        <Route path="dashboard" component={UserIsAuthenticated(EventDashboard)} />
        <Route path="profile" component={UserIsAuthenticated(Profile)} />
        <Route path="create" component={UserIsAuthenticated(EventCreator)} />
        <Route path="checkin" component={UserIsAuthenticated(EventCheckinAttestor)} />
        <Route path="about" component={UserIsNotAuthenticated(About)} />
        <Route path="FAQ" component={UserIsNotAuthenticated(FAQ)} />
      </Route>
    </Router>
  </Provider>
)


export default App

/**
 * The MenuWrappre component wraps all individual pages with a navbar
 * with conditional display for different links depending on Auth state
 */
const MenuWrapper = ({children}) => {
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
      <li className="menu-item">
        <Link to="/about" className="menu-link">About</Link>
      </li>
      <li className="menu-item">
        <Link to="/FAQ" className="menu-link">FAQ</Link>
      </li>
      <li className="menu-item">
        <LoginButton>login</LoginButton>
      </li>
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

      {children}
    </div>
  );
}

