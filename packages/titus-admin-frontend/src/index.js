import React from 'react'
import { render } from 'react-dom'

import App from './app'
import config from './config'

render(<App serverUrl={config.serverUrl} />, document.getElementById('root'))
