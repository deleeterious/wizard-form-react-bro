import {
  LOAD_USER_FAILED,
  LOAD_USER_PENDING,
  LOAD_USER_SUCCESS,
  RESET_USER,
} from 'redux/types';

const initialState = {
  data: {},
  isFetching: false,
  error: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER_PENDING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case LOAD_USER_FAILED: {
      return {
        ...state,
        error: payload,
      };
    }
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        data: payload,
        isFetching: false,
      };
    case RESET_USER:
      return {
        ...state,
        data: {},
      };

    default:
      return state;
  }
};
