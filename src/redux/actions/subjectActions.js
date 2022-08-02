import {
  GET_SUBJECTS,
  GET_SUBJECT,
  ADD_SUBJECT,
  DELETE_SUBJECT,
  UPDATE_SUBJECT,
  COUNT_SUBJECTS,
} from "./types";
import axios from "axios";
import config from "../../config";

export const getSubjects = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/subjects/`);
  dispatch({
    type: GET_SUBJECTS,
    payload: result.data,
  });
};

export const getSubject = (id) => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/subjects/${id}`);
  dispatch({
    type: GET_SUBJECT,
    payload: result.data,
  });
};

export const addSubject = (subjectData) => async (dispatch) => {
  const result = await axios.post(
    `${config.APIEndpoint}/subjects`,
    subjectData
  );
  dispatch({
    type: ADD_SUBJECT,
    payload: result.data,
  });
};

export const deleteSubject = (id) => async (dispatch) => {
  await axios.delete(`${config.APIEndpoint}/subjects/${id}`);
  dispatch({
    type: DELETE_SUBJECT,
    payload: id,
  });
};

export const updateSubject = (subject) => async (dispatch) => {
  await axios.put(`${config.APIEndpoint}/subjects/${subject.id}`, subject);
  dispatch({
    type: UPDATE_SUBJECT,
    payload: subject,
  });
};

export const countSubjects = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/subjects/count`);
  dispatch({
    type: COUNT_SUBJECTS,
    payload: result.data,
  });
};
