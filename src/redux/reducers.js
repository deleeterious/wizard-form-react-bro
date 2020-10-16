import {
  ADD_USER,
  CHANGE_ACTIVE_FORM_STAGE,
  CLEAR_NEW_USER,
  DELETE_USER,
  GET_USER,
  LOAD_USERS,
  SET_AVATAR,
  SET_EDIT,
  SET_NEW_USER,
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
    case SET_AVATAR:
      return {
        ...state,
        avatar: payload
      }
    case SET_NEW_USER:
      return {
        ...state,
        newUser: { ...state.newUser, ...payload }
      }
    case CLEAR_NEW_USER:
      return {
        ...state,
        newUser: {}
      }
    case SET_EDIT:
      return {
        ...state,
        isEdit: payload
      }

    default:
      return state
  }
}
