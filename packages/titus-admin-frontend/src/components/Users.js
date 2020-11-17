import React from 'react'
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import { Link, useRouteMatch } from 'react-router-dom'
import { useQuery } from 'graphql-hooks'

import useCreateUserDialog from '../hooks/useCreateUserDialog'

import Square from './Square'
import Loading from './Loading'
import { LOAD_USERS } from '../graphql'

export default function Users() {
  const match = useRouteMatch()

  const { data, loading, refetch: loadUsers } = useQuery(LOAD_USERS)
  const [dialog, openDialog] = useCreateUserDialog(loadUsers)

  if (loading) {
    return <Loading />
  }

  return (
    <>
      {dialog}
      <Square mb={2}>
        <Box>
          <Button variant="outlined" color="primary" onClick={openDialog}>
            Create User
          </Button>
          <IconButton onClick={loadUsers}>
            <span role="img" aria-label="reload users">
              🔄
            </span>
          </IconButton>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`${match.url}/${user.id}`}>{user.username}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Square>
    </>
  )
}
