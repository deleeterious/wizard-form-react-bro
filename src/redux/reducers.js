import {
  ADD_USER,
  CHANGE_ACTIVE_FORM_STAGE,
  DELETE_USER,
  FETCHING_ERROR,
  FETCHING_PENDING,
  LOAD_USER_SUCCESS,
  LOAD_USERS_SUCCESS,
  UPDATE_USER
} from './types'

export const rootReducer = (state, { type, payload }) => {
  switch (type) {
    case LOAD_USERS_SUCCESS: {
      return {
        ...state,
        users: payload,
        isFetching: false
      }
    }
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isFetching: false
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
          ...state.users.map((user) => {
            if (user.id === payload.id)
              return { ...state.user, ...payload.changes }
            return user
          })
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
