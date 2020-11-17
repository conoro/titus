'use strict'

const fp = require('fastify-plugin')

const authProviders = {
  auth0: require('./auth0'),
  cognito: require('./cognito')
}

async function auth(server, options) {
  server.register(authProviders[options.provider], options)
}

module.exports = fp(auth)
