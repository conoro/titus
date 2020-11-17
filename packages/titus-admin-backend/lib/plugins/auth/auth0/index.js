'use strict'

const fp = require('fastify-plugin')

async function auth0(server, options) {
  server.register(require('./provider'), options.auth0)
}

module.exports = fp(auth0)
module.exports.autoload = false
