module.exports = function makeLoaders(fastify) {
  return {
    User: {
      groups(queries) {
        return Promise.all(
          queries.map(({ obj }) => fastify.provider.listGroupsForUser(obj.id))
        )
      }
    },
    Group: {
      users(queries) {
        return Promise.all(
          queries.map(({ obj }) => fastify.provider.listUsersForGroup(obj.id))
        )
      }
    }
  }
}
