import {
  ADD_USER,
  CHANGE_ACTIVE_FORM_STAGE,
  DELETE_USER,
  FETCHING_ERROR,
  FETCHING_PENDING,
  FETCHING_SUCCESS,
  GET_USER,
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
    case FETCHING_PENDING: {
      return {
        ...state,
        isFetching: true
      }
    }
    case FETCHING_SUCCESS: {
      return {
        ...state,
        isFetching: false
      }
    }
    case FETCHING_ERROR: {
      return {
        ...state,
        error: payload
      }
    }

    default:
      return state
  }
}
