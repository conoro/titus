export const LOAD_GROUP = `
query LoadGroup($id: String!) { 
  group(id: $id) { 
    id
    groupName
    users { 
      id
      username 
    } 
  } 
}
`

export const LOAD_GROUPS = '{ groups { id groupName } }'

export const LOAD_USER = `
query LoadUser($id: String!) { 
  user(id: $id) { 
    id
    username
    groups { 
      id
      groupName 
    }  
  } 
}
`

export const LOAD_USERS = '{ users { id username } }'

export const ADD_USER_TO_GROUP = `
mutation AddUserToGroup($input: AddUserToGroupInput!) {
  addUserToGroup(input: $input)
}
`

export const REMOVE_USER_FROM_GROUP = `
mutation RemoveUserFromGroup($input: RemoveUserFromGroupInput!) {
  removeUserFromGroup(input: $input)
}
`

export const DELETE_GROUP = `
mutation DeleteGroup($input: DeleteGroupInput!) {
  deleteGroup(input: $input)
}
`

export const DELETE_USER = `
mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input)
}
`

export const CREATE_GROUP = `
mutation CreateGroup($input: GroupInput!) {
  createGroup(input: $input) {
    groupName
  }
}
`

export const CREATE_USER = `
mutation CreateUser($input: UserInput!) {
  createUser(input: $input) {
    username
  }
}
`
