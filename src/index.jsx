import React from 'react'
import ReactDOM from 'react-dom'
// react-redux
import { Provider } from 'react-redux'

import App from './containers/App'
import * as serviceWorker from './serviceWorker'
// redux
import store from './redux/store'
import { loadUsers } from './redux/actions'

store.dispatch(loadUsers())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
