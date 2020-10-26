import {
  ADD_USER,
  DELETE_USER,
  LOAD_USERS_FAILED,
  LOAD_USERS_PENDING,
  LOAD_USERS_SUCCESS,
  UPDATE_USER
} from 'redux/types'

const initialState = {
  isFetching: false,
  data: [],
  error: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USERS_PENDING: {
      return {
        ...state,
        isFetching: true
      }
    }
    case LOAD_USERS_SUCCESS: {
      return {
        ...state,
        data: payload,
        isFetching: false
      }
    }
    case LOAD_USERS_FAILED: {
      return {
        ...state,
        error: payload
      }
    }
    case ADD_USER:
      return {
        ...state,
        data: [...state.data, payload]
      }
    case UPDATE_USER: {
      return {
        ...state,
        data: [
          ...state.data.map((user) => {
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
        data: [...state.data.filter((user) => user.id !== payload)]
      }
    default:
      return state
  }
}
