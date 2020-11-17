'use strict'
const envSchema = require('env-schema')
const S = require('fluent-schema')

const config = envSchema({
  dotenv: true,
  schema: S.object()
    .prop('API_HOST', S.string().required())
    .prop('API_PORT', S.string().required())
    .prop('CORS_ORIGIN', S.string())
    .prop(
      'AUTH_PROVIDER',
      S.string().enum(['cognito', 'auth0']).default('auth0')
    )
    .prop('AUTH0_DOMAIN', S.string())
    .prop('AUTH0_CLIENT_ID', S.string())
    .prop('AUTH0_CLIENT_SECRET', S.string())
    .prop('AUTH0_CONNECTION', S.string())
    .prop('COGNITO_REGION', S.string())
    .prop('COGNITO_USER_POOL_ID', S.string())
})

module.exports = {
  server: {
    host: config.API_HOST,
    port: config.API_PORT
  },
  fastify: {
    logger: true
  },
  cors: { origin: !!config.CORS_ORIGIN, credentials: true },
  auth: {
    provider: config.AUTH_PROVIDER,
    auth0: {
      domain: config.AUTH0_DOMAIN,
      clientId: config.AUTH0_CLIENT_ID,
      clientSecret: config.AUTH0_CLIENT_SECRET,
      connection: config.AUTH0_CONNECTION
    },
    cognito: {
      region: config.COGNITO_REGION,
      userPoolId: config.COGNITO_USER_POOL_ID
    }
  }
}
