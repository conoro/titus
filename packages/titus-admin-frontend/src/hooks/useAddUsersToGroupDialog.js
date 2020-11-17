import React from 'react'
import { useQuery, useMutation } from 'graphql-hooks'

import Loading from '../components/Loading'
import useDialog from './useDialog'
import { ADD_USER_TO_GROUP, LOAD_USERS } from '../graphql'

export default function useAddUsersToGroupDialog(groupId, onConfirm) {
  const { data, loading } = useQuery(LOAD_USERS)
  const [addUserToGroup] = useMutation(ADD_USER_TO_GROUP)

  const handleConfirm = async input => {
    const { error } = await addUserToGroup({
      variables: { input: { ...input, groupId } }
    })

    if (error) {
      throw error?.graphQLErrors?.[0]
    }

    onConfirm()
  }

  return useDialog({
    onConfirm: handleConfirm,
    title: `Add users to group ${groupId}`,
    text: 'Use this form to add users to a group',
    action: 'Add to group',
    fields: [
      {
        name: 'userId',
        label: 'Username *',
        select: true,
        children: loading ? (
          <Loading />
        ) : (
          data.users.map(user => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))
        )
      }
    ]
  })
}
