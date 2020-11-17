import React from 'react'
import { useQuery, useMutation } from 'graphql-hooks'

import Loading from '../components/Loading'
import useDialog from './useDialog'
import { ADD_USER_TO_GROUP, LOAD_GROUPS } from '../graphql'

export default function useAddUserToGroupDialog(userId, onConfirm) {
  const { data, loading } = useQuery(LOAD_GROUPS)
  const [addUserToGroup] = useMutation(ADD_USER_TO_GROUP)

  const handleConfirm = async input => {
    const { error } = await addUserToGroup({
      variables: { input: { ...input, userId } }
    })

    if (error) {
      throw error?.graphQLErrors?.[0]
    }

    onConfirm()
  }

  return useDialog({
    onConfirm: handleConfirm,
    title: `Add user ${userId} to group`,
    text: 'Use this form to add user to a group',
    action: 'Add to group',
    fields: [
      {
        name: 'groupId',
        label: 'Group *',
        select: true,
        children: loading ? (
          <Loading />
        ) : (
          data.groups.map(group => (
            <option key={group.id} value={group.id}>
              {group.groupName}
            </option>
          ))
        )
      }
    ]
  })
}
