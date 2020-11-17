import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  active: {
    color: theme.palette.primary.main,
    '&:visited': {
      color: theme.palette.primary.main
    }
  }
}))

export default function Navigation() {
  const classes = useStyles()

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Button
          component={NavLink}
          to={`./users`}
          activeClassName={classes.active}
        >
          Users
        </Button>
        <Button
          component={NavLink}
          to={`./groups`}
          activeClassName={classes.active}
        >
          Groups
        </Button>
      </Toolbar>
    </AppBar>
  )
}
