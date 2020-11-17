import React from 'react'
import { Box, Paper } from '@material-ui/core'

export default function Square({ children, ...props }) {
  return (
    <Box component={Paper} padding={2} square elevation={4} {...props}>
      {children}
    </Box>
  )
}
