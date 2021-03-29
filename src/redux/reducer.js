import {
  SIGIN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAILURE,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  token: [],
  isLogged: false,
  tasks: [],
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: payload.data.results.token,
        isLogged: true,
      };

    case SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case ADD_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case GET_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: payload,
      };
    case GET_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
