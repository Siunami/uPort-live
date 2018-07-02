import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { App, store } from './app'
import { UserIsAuthenticated } from './util/wrappers.js'
import { Home, Profile, EventDashboard, EventCreator, EventCheckinAttestor } from './components'

const history = syncHistoryWithStore(browserHistory, store)

// TODO: Maybe this goes in app as well ? 
ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(EventDashboard)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="create" component={UserIsAuthenticated(EventCreator)} />
          <Route path="checkin" component={UserIsAuthenticated(EventCheckinAttestor)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
