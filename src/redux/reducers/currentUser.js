import {
  LOAD_USER_FAILED,
  LOAD_USER_PENDING,
  LOAD_USER_SUCCESS,
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

    default:
      return state;
  }
};
