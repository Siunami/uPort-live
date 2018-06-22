import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import DashboardContainer from './layouts/dashboard/Dashboard'
import AttestContainer from './layouts/AttestGenerator/AttestGenerator'
import Profile from './user/layouts/profile/Profile'

// Redux Store
import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          {/* <Route path="/" component={Home}/> */}
          <Route path="dashboard" component={UserIsAuthenticated(DashboardContainer)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="attestGenerator" component={UserIsAuthenticated(AttestContainer)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
