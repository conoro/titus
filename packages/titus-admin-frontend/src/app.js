import React, { Suspense } from 'react'
import T from 'prop-types'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import { Router as BrowserRouter } from 'react-router-dom'

import Admin from './components/Admin'
import Loading from './components/Loading'
import history from './history'

export default function App({ token, serverUrl, ...props }) {
  const client = new GraphQLClient({
    url: serverUrl
  })

  if (token) {
    client.setHeader('Authorization', `Bearer ${token}`)
  }

  return (
    <ClientContext.Provider value={client}>
      <Suspense fallback={<Loading />}>
        <BrowserRouter history={history}>
          <Admin {...props} />
        </BrowserRouter>
      </Suspense>
    </ClientContext.Provider>
  )
}

App.propTypes = {
  serverUrl: T.string.isRequired,
  token: T.string
}
