import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  loader: {
    animation: 'spin 1s infinite linear',
    border: `5px solid ${theme.palette.primary.main}`,
    borderRadius: '100%',
    borderRightColor: 'transparent',
    height: 50,
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
    position: 'fixed',
    top: '50%',
    width: 50
  },
  '@keyframes spin': {
    to: {
      transform: 'rotate(360deg)'
    }
  }
}))

const Loading = () => {
  const classes = useStyles()
  return <div className={classes.loader} />
}

export default Loading
