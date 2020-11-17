import { useMutation } from 'graphql-hooks'

import { CREATE_USER } from '../graphql'
import useDialog from './useDialog'

export default function useCreateUserDialog(onConfirm) {
  const [createUser] = useMutation(CREATE_USER)

  const handleConfirm = async input => {
    const { error } = await createUser({ variables: { input } })

    if (error) {
      throw error?.graphQLErrors?.[0]
    }

    onConfirm()
  }

  return useDialog({
    onConfirm: handleConfirm,
    title: 'Create user',
    text: 'Use this form to create a new user',
    action: 'Create',
    fields: [
      {
        name: 'username',
        label: 'Username *'
      }
    ]
  })
}
