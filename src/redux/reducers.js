import {
  ADD_USER,
  CHANGE_ACTIVE_FORM_STAGE,
  DELETE_USER,
  GET_USER,
  LOAD_AVATAR,
  LOAD_USERS,
  UPDATE_USER
} from './types'

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
    case UPDATE_USER: {
      return {
        ...state,
        users: [
          ...state.users.filter((user) => user.id !== payload.id),
          { ...state.user, ...payload.changes }
        ]
      }
    }
    case DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter((user) => user.id !== payload)]
      }
    case CHANGE_ACTIVE_FORM_STAGE:
      return {
        ...state,
        activeFormStage: payload
      }
    case LOAD_AVATAR:
      return {
        ...state,
        avatar: payload
      }

    default:
      return state
  }
}
