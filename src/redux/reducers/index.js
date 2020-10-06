import { ADD_USER, CHANGE_ACTIVE_FORM_STAGE, LOAD_USERS } from '../types'

export const rootReducer = (state, { type, payload }) => {
  switch (type) {
    case LOAD_USERS: {
      return {
        ...state,
        users: payload
      }
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
