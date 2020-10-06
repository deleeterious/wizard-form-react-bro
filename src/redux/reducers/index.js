import {
  ADD_USER,
  CHANGE_ACTIVE_FORM_STAGE,
  GET_USER,
  LOAD_USERS
} from '../types'

export const rootReducer = (state, { type, payload }) => {
  switch (type) {
    case LOAD_USERS: {
      return {
        ...state,
        users: payload
      }
    }
    case GET_USER:
      return {
        ...state,
        user: payload
      }
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, payload]
      }
    case CHANGE_ACTIVE_FORM_STAGE:
      return {
        ...state,
        activeFormStage: payload
      }

    default:
      return state
  }
}
