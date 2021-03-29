import axios from "axios";
import { v4 as uuidv4 } from "uuid";
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
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
} from "./actionTypes";

export const signInRequest = (payload) => ({
  type: SIGN_IN_REQUEST,
  payload,
});

export const signInSuccess = (payload) => ({
  type: SIGN_IN_SUCCESS,
  payload,
});

export const signInFailure = (payload) => ({
  type: SIGN_IN_FAILURE,
  payload,
});

// signIn Request (POST REQUEST)

export const signin = (email, password) => (dispatch) => {
  dispatch(signInRequest());
  return axios({
    method: "post",
    url: "https://stage.api.sloovi.com/login",
    data: {
      email: email,
      password: password,
    },
  })
    .then((res) => dispatch(signInSuccess(res)))
    .catch((err) => dispatch(signInFailure(err)));
};

// add task request starts

export const addTaskRequest = (payload) => ({
  type: ADD_TASK_REQUEST,
  payload,
});

export const addTaskSuccess = (payload) => ({
  type: ADD_TASK_SUCCESS,
  payload,
});
export const addTaskFailure = (payload) => ({
  type: ADD_TASK_FAILURE,
  payload,
});

//add_task (POST Request)

export const addTask = (date, time, task, token) => async (dispatch) => {
  dispatch(addTaskRequest());
  return await axios({
    method: "post",
    url:
      "https://stage.api.sloovi.com/task/lead_04412ba1d622466cab1f0ad941fcf303",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      assigned_user: "user_15f4808a77194be88c8d19414671d3c8",
      task_date: date,
      task_time: time,
      task_msg: task,
      is_completed: 0,
    },
  })
    .then((res) => dispatch(addTaskSuccess(res)))
    .catch((err) => dispatch(addTaskFailure(err)));
};

// get tasks requests

//get task

export const getTaskRequest = () => ({
  type: GET_TASK_REQUEST,
});

export const getTaskSuccess = (payload) => ({
  type: GET_TASK_SUCCESS,
  payload,
});

export const getTaskFailure = (payload) => ({
  type: GET_TASK_FAILURE,
  payload,
});

//"GET" request(AXIOS CALL)

export const getTask = (token) => async (dispatch) => {
  dispatch(getTaskRequest());
  await axios({
    method: "GET",
    url:
      "https://stage.api.sloovi.com/task/lead_04412ba1d622466cab1f0ad941fcf303",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => dispatch(getTaskSuccess(res)))
    .catch((err) => dispatch(getTaskFailure(err)));
};

//Delete Task

export const deleteTaskRequest = () => ({
  type: DELETE_TASK_REQUEST,
});

export const deleteTaskSuccess = (payload) => ({
  type: DELETE_TASK_SUCCESS,
  payload,
});

export const deleteTaskFailure = () => ({
  type: DELETE_TASK_FAILURE,
});

//DELETE REQUEST (redux-thunk)

export const deleteTask = (id, token) => (dispatch) => {
  dispatch(deleteTaskRequest());
  axios({
    method: "DELETE",
    url: `https://stage.api.sloovi.com/task/lead_04412ba1d622466cab1f0ad941fcf303/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => dispatch(getTask(token)))
    .catch((err) => dispatch(deleteTaskSuccess()));
};
