const fp = require('fastify-plugin')
const ManagementClient = require('auth0').ManagementClient

function transformUser(user) {
  return {
    id: user.user_id,
    username: user.name,
    ...user
  }
}

function transformGroup(role) {
  return {
    id: role.id,
    groupName: role.name,
    ...role
  }
}

function Auth0Provider(options) {
  const auth0 = new ManagementClient({
    domain: options.domain,
    clientId: options.clientId,
    clientSecret: options.clientSecret
  })

  return {
    async listUsers() {
      const result = await auth0.getUsers({})

      return result.map(transformUser)
    },
    async getUser(id) {
      const user = await auth0.getUser({ id })

      return transformUser(user)
    },
    async listGroups() {
      const result = await auth0.getRoles()

      return result.map(transformGroup)
    },
    async getGroup(id) {
      const role = await auth0.getRole({ id })

      return transformGroup(role)
    },
    async createUser({ username }) {
      const result = await auth0.createUser({
        email: username,
        connection: options.connection,
        // TODO
        password: '123'
      })

      return transformUser(result)
    },
    async createGroup({ groupName }) {
      const result = await auth0.createRole({ name: groupName })

      return transformGroup(result)
    },
    async listGroupsForUser(id) {
      const userRoles = await auth0.getUserRoles({ id })

      return userRoles.map(transformGroup)
    },
    async listUsersForGroup(id) {
      const groupUsers = await auth0.getUsersInRole({ id })

      return groupUsers.map(transformUser)
    },
    addUserToGroup({ userId, groupId }) {
      return auth0.assignRolestoUser({ id: userId }, { roles: [groupId] })
    },
    removeUserFromGroup({ userId, groupId }) {
      return auth0.removeRolesFromUser({ id: userId }, { roles: [groupId] })
    },
    deleteUser({ id }) {
      return auth0.deleteUser({ id })
    },
    deleteGroup({ id }) {
      return auth0.deleteRole({ id })
    }
  }
}

async function provider(fastify, options) {
  fastify.decorate('provider', new Auth0Provider(options))
}

module.exports = fp(provider)
