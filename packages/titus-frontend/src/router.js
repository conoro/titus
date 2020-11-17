import T from 'prop-types'
import React, { useContext, lazy } from 'react'
import { Route, Router, Redirect, Switch } from 'react-router-dom'
import Admin from 'titus-admin-frontend'

import history from './history'
import { AuthContext } from './components/authentication/authentication-context'
import { ROUTES } from './constants'
import config from './config'

const AsyncLogin = lazy(() => import('./pages/login'))
const AsyncDashboard = lazy(() => import('./pages/dashboard'))

const PrivateRoute = ({ component: Component, componentProps, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          <Route {...props}>
            {props => <Component {...props} {...componentProps} />}
          </Route>
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: props.location }
            }}
          />
        )
      }}
    />
  )
}
PrivateRoute.propTypes = {
  component: T.oneOfType([T.object, T.func])
}

const AppRouter = () => {
  const { user } = useContext(AuthContext)

  return (
    <Router history={history}>
      <Switch>
        <Route path={ROUTES.LOGIN}>
          <AsyncLogin />
        </Route>
        <PrivateRoute
          path={ROUTES.DASHBOARD}
          exact={true}
          component={AsyncDashboard}
        />
        <PrivateRoute
          path={ROUTES.ADMIN}
          component={Admin}
          componentProps={{
            serverUrl: config.adminServerUrl,
            token: user?.idToken
          }}
        />
      </Switch>
    </Router>
  )
}

export default AppRouter
