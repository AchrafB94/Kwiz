import {
  ADD_SCHOOL,
  COUNT_SCHOOLS,
  DELETE_SCHOOL,
  GET_SCHOOL,
  GET_SCHOOLS,
  UPDATE_SCHOOL,
} from "./types";
import axios from "axios";
import config from "../../config";

export const getSchools = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/schools/`);
  dispatch({
    type: GET_SCHOOLS,
    payload: result.data,
  });
};

export const getSchool = (id) => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/schools/${id}`);
  dispatch({
    type: GET_SCHOOL,
    payload: result.data,
  });
};

export const addSchool = (school) => async (dispatch) => {
  const result = await axios.post(`${config.APIEndpoint}/schools`, school);
  dispatch({
    type: ADD_SCHOOL,
    payload: result.data,
  });

  return result.data.id;
};

export const deleteSchool = (id) => async (dispatch) => {
  await axios.delete(`${config.APIEndpoint}/schools/${id}`);
  dispatch({
    type: DELETE_SCHOOL,
    payload: id,
  });
};

export const updateSchool = (school) => async (dispatch) => {
  await axios.put(`${config.APIEndpoint}/schools/${school.id}`, school);
  dispatch({
    type: UPDATE_SCHOOL,
    payload: school,
  });
};

export const countSchools = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/schools/count`);
  dispatch({
    type: COUNT_SCHOOLS,
    payload: result.data,
  });
};
