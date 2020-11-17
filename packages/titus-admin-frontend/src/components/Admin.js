import React from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'

import Users from './Users'
import Groups from './Groups'
import User from './User'
import Group from './Group'
import Navigation from './Navigation'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
})

export default function Admin({ match }) {
  const { pathname } = useLocation()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Redirect from={match.path} exact to={`${match.path}/users`} />
        <Route path={`${match.path}/users`} exact>
          <>
            <Navigation />
            <Users />
          </>
        </Route>
        <Route path={`${match.path}/users/:userId`}>
          {({ match }) => <User userId={match.params.userId} />}
        </Route>
        <Route path={`${match.path}/groups`} exact>
          <>
            <Navigation />
            <Groups />
          </>
        </Route>
        <Route path={`${match.path}/groups/:groupId`}>
          {({ match }) => <Group groupId={match.params.groupId} />}
        </Route>
      </Switch>
    </div>
  )
}
