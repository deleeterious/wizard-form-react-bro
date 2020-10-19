import { ACCOUNT_FORM_STAGE } from 'constants.js'
import { createStore, applyMiddleware } from 'redux'
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

const initialState = {
  activeFormStage: ACCOUNT_FORM_STAGE,
  users: [],
  user: {}
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
