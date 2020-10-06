import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from '../reducers'

const initialState = {
  activeFormStage: 1,
  users: [],
  user: {}
}

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk))
)

export default store
