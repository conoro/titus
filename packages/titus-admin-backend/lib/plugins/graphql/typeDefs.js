const gql = require('graphql-tag')

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    groups: [Group]!
  }

  type Group {
    id: ID!
    groupName: String!
    users: [User]!
  }

  input UserInput {
    username: String!
  }

  input GroupInput {
    groupName: String!
  }

  input AddUserToGroupInput {
    userId: String!
    groupId: String!
  }

  input RemoveUserFromGroupInput {
    userId: String!
    groupId: String!
  }

  input DeleteUserInput {
    id: String!
  }

  input DeleteGroupInput {
    id: String!
  }

  type Query {
    users: [User]
    user(id: String!): User
    groups: [Group]
    group(id: String!): Group
  }

  type Mutation {
    createUser(input: UserInput!): User
    createGroup(input: GroupInput!): Group
    addUserToGroup(input: AddUserToGroupInput!): Boolean
    removeUserFromGroup(input: RemoveUserFromGroupInput!): Boolean
    deleteUser(input: DeleteUserInput!): Boolean
    deleteGroup(input: DeleteGroupInput!): Boolean
  }
`

module.exports = typeDefs
