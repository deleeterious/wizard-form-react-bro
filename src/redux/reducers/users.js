import {
  ADD_USER_FAILED,
  ADD_USER_PENDING,
  ADD_USER_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
  LOAD_USERS_FAILED,
  LOAD_USERS_PENDING,
  LOAD_USERS_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
} from 'redux/types';

const initialState = {
  isFetching: false,
  data: [],
  error: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USERS_PENDING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case LOAD_USERS_SUCCESS: {
      return {
        ...state,
        data: payload,
        isFetching: false,
      };
    }
    case LOAD_USERS_FAILED: {
      return {
        ...state,
        error: payload,
      };
    }
    case ADD_USER_SUCCESS:
      return {
        ...state,
        data: [...state.data, payload],
        isFetching: false,
      };
    case ADD_USER_PENDING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ADD_USER_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        data: [
          ...state.data.map((user) => {
            if (user.id === payload.id)
              return { ...state.user, ...payload.changes };
            return user;
          }),
        ],
      };
    }
    case UPDATE_USER_PENDING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter((user) => user.id !== payload)],
      };
    case DELETE_USER_PENDING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case DELETE_USER_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};
