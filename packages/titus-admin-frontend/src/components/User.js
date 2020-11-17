import React from 'react'
import { Box, Breadcrumbs, Button, Chip, Typography } from '@material-ui/core'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from 'graphql-hooks'

import useAddUserToGroupDialog from '../hooks/useAddUserToGroupDialog'

import Loading from './Loading'
import Square from './Square'
import { DELETE_USER, LOAD_USER, REMOVE_USER_FROM_GROUP } from '../graphql'

export default function User({ userId }) {
  const history = useHistory()

  const { data, loading, refetch: loadUser } = useQuery(LOAD_USER, {
    variables: { id: userId }
  })

  const [addUserToGroupDialog, openAddUserToGroup] = useAddUserToGroupDialog(
    userId,
    loadUser
  )

  const [removeUserFromGroup] = useMutation(REMOVE_USER_FROM_GROUP)

  const [deleteUser] = useMutation(DELETE_USER)

  async function handleRemoveUserFromGroup(groupId) {
    await removeUserFromGroup({
      variables: {
        input: {
          userId,
          groupId
        }
      }
    })

    loadUser()
  }

  async function handleDeleteUser() {
    await deleteUser({
      variables: {
        input: {
          id: userId
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
      {addUserToGroupDialog}
      <Box mb={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <RouterLink color="inherit" to=".">
            Users
          </RouterLink>
          <Typography color="textPrimary">{data.user.username}</Typography>
        </Breadcrumbs>
      </Box>
      <Box mb={2}>
        <Button variant="outlined" onClick={handleDeleteUser}>
          Delete user
        </Button>
        <Button variant="outlined" onClick={openAddUserToGroup}>
          Add to group
        </Button>
      </Box>
      <Square mb={2}>
        <Typography variant="h6">Groups</Typography>
        {data.user.groups?.map(group => (
          <Chip
            key={group.id}
            label={group.groupName}
            onDelete={() => handleRemoveUserFromGroup(group.id)}
            color="primary"
          ></Chip>
        ))}
      </Square>
    </>
  )
}
