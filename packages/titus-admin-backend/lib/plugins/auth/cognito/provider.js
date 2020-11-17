const fp = require('fastify-plugin')
const AWS = require('aws-sdk')

function transformUser(user) {
  return {
    id: user.Username,
    username: user.Username,
    ...user
  }
}

function transformGroup(group) {
  return {
    id: group.GroupName,
    groupName: group.GroupName,
    ...group
  }
}

function CognitoProvider(options) {
  const cognito = new AWS.CognitoIdentityServiceProvider({
    region: options.region
  })

  const UserPoolId = options.userPoolId

  return {
    async listUsers() {
      const result = await cognito
        .listUsers({
          UserPoolId
        })
        .promise()

      return result.Users.map(transformUser)
    },
    async getUser(id) {
      const user = await cognito
        .adminGetUser({
          UserPoolId,
          Username: id
        })
        .promise()

      return transformUser(user)
    },
    async listGroups() {
      const result = await cognito
        .listGroups({
          UserPoolId
        })
        .promise()

      return result.Groups.map(transformGroup)
    },
    async getGroup(id) {
      const group = await cognito
        .getGroup({
          UserPoolId,
          GroupName: id
        })
        .promise()

      return transformGroup(group.Group)
    },
    async createUser({ username }) {
      const result = await cognito
        .adminCreateUser({
          UserPoolId,
          Username: username
        })
        .promise()

      return transformUser(result.User)
    },
    async createGroup({ groupName }) {
      const result = await cognito
        .createGroup({
          UserPoolId,
          GroupName: groupName
        })
        .promise()

      return transformGroup(result.Group)
    },
    async listGroupsForUser(id) {
      const userGroups = await cognito
        .adminListGroupsForUser({
          UserPoolId,
          Username: id
        })
        .promise()

      return userGroups.Groups.map(transformGroup)
    },
    async listUsersForGroup(id) {
      const groupUsers = await cognito
        .listUsersInGroup({
          UserPoolId,
          GroupName: id
        })
        .promise()

      return groupUsers.Users.map(transformUser)
    },
    addUserToGroup({ userId, groupId }) {
      return cognito
        .adminAddUserToGroup({
          UserPoolId,
          Username: userId,
          GroupName: groupId
        })
        .promise()
    },
    removeUserFromGroup({ userId, groupId }) {
      return cognito
        .adminRemoveUserFromGroup({
          UserPoolId,
          Username: userId,
          GroupName: groupId
        })
        .promise()
    },
    deleteUser({ id }) {
      return cognito
        .adminDeleteUser({
          UserPoolId,
          Username: id
        })
        .promise()
    },
    deleteGroup({ id }) {
      return cognito
        .deleteGroup({
          UserPoolId,
          GroupName: id
        })
        .promise()
    }
  }
}

async function provider(fastify, options) {
  fastify.decorate('provider', new CognitoProvider(options))
}

module.exports = fp(provider)
