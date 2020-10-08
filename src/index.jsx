import React from 'react'
import ReactDOM from 'react-dom'
// redux
import store from 'redux/store'
import { loadUsers } from 'redux/actions'
import { Provider } from 'react-redux'
// containers
import App from 'containers/App'
import * as serviceWorker from './serviceWorker'

store.dispatch(loadUsers())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
