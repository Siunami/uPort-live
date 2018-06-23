import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Profile from './user/layouts/profile/Profile'
import Dashboard from './layouts/dashboard/Dashboard'
import EventCreator from './layouts/create/EventCreator'
import CheckinAttestor from './layouts/checkin/CheckinAttestor'

// Redux Store
import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="create" component={UserIsAuthenticated(EventCreator)} />
          <Route path="checkin" component={UserIsAuthenticated(CheckinAttestor)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
