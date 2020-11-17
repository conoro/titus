#! /usr/bin/env node

'use strict'

const Fastify = require('fastify')
const cors = require('fastify-cors')

const config = require('./lib/config')
const server = require('./lib/server')

process.on('unhandledRejection', err => {
  console.error(err)
  process.exit(1)
})

const main = async () => {
  const fastify = Fastify(config.fastify)

  fastify.register(cors, config.cors)
  fastify.register(server, config.auth)

  await fastify.listen(config.server)

  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.once(signal, () => {
      fastify.log.info({ signal }, 'closing application')
      fastify
        .close()
        .then(() => {
          fastify.log.info({ signal }, 'application closed')
          process.exit(0)
        })
        .catch(err => {
          fastify.log.error({ err }, 'Error closing the application')
          process.exit(1)
        })
    })
  }
}

main()
