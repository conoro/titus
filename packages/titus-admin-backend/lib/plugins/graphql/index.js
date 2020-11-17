const fp = require('fastify-plugin')
const mercurius = require('mercurius')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = require('./typeDefs')
const makeResolvers = require('./resolvers')
const makeLoaders = require('./loaders')

async function graphql(fastify, options) {
  const resolvers = makeResolvers(fastify)
  const loaders = makeLoaders(fastify)

  fastify.register(mercurius, {
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    loaders,
    graphiql: 'playground'
  })
}

module.exports = fp(graphql)
