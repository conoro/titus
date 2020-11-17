import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'
import React from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from 'graphql-hooks'

import useAddUsersToGroupDialog from '../hooks/useAddUsersToGroupDialog'

import Loading from './Loading'
import Square from './Square'
import { DELETE_GROUP, LOAD_GROUP, REMOVE_USER_FROM_GROUP } from '../graphql'

export default function Group({ groupId }) {
  const history = useHistory()

  const { data, loading, refetch: loadGroup } = useQuery(LOAD_GROUP, {
    variables: { id: groupId }
  })

  const [addUsersToGroupDialog, openAddUsersToGroup] = useAddUsersToGroupDialog(
    groupId,
    loadGroup
  )

  const [removeUserFromGroup] = useMutation(REMOVE_USER_FROM_GROUP)

  const [deleteGroup] = useMutation(DELETE_GROUP)

  async function handleRemoveUserFromGroup(userId) {
    await removeUserFromGroup({
      variables: {
        input: {
          userId,
          groupId
        }
      }
    })

    loadGroup()
  }

  async function handleDeleteGroup() {
    await deleteGroup({
      variables: {
        input: {
          id: groupId
        }
      }
    })

    history.goBack()
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      {addUsersToGroupDialog}
      <Box mb={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <RouterLink color="inherit" to=".">
            Groups
          </RouterLink>
          <Typography color="textPrimary">{data.group.groupName}</Typography>
        </Breadcrumbs>
      </Box>
      <Box mb={2}>
        <Button variant="outlined" onClick={handleDeleteGroup}>
          Delete group
        </Button>
      </Box>
      <Square mb={2}>
        <Box mb={2}>
          <Button variant="outlined" onClick={openAddUsersToGroup}>
            Add users
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.group.users?.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <RouterLink to={`../users/${user.id}`}>
                    {user.username}
                  </RouterLink>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleRemoveUserFromGroup(user.id)}
                  >
                    <span role="img" aria-label="remove from group">
                      ❌
                    </span>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Square>
    </>
  )
}
