import { useMutation } from 'graphql-hooks'

import { CREATE_GROUP } from '../graphql'
import useDialog from './useDialog'

export default function useCreateGroupDialog(onConfirm) {
  const [createGroup] = useMutation(CREATE_GROUP)

  const handleConfirm = async input => {
    const { error } = await createGroup({ variables: { input } })

    if (error) {
      throw error?.graphQLErrors?.[0]
    }

    onConfirm()
  }

  return useDialog({
    onConfirm: handleConfirm,
    title: 'Create group',
    text: 'Use this form to create a new group',
    action: 'Create',
    fields: [
      {
        name: 'groupName',
        label: 'Group Name *'
      }
    ]
  })
}
