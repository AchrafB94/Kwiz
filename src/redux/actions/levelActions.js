import { GET_LEVELS, ADD_LEVEL, DELETE_LEVEL, UPDATE_LEVEL } from "./types";
import axios from "axios";
import config from "../../config";

export const getLevels = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/levels/`);
  dispatch({
    type: GET_LEVELS,
    payload: result.data,
  });
};

export const addLevel = (levelData) => async (dispatch) => {
  const result = await axios.post(`${config.APIEndpoint}/levels`, levelData);
  dispatch({
    type: ADD_LEVEL,
    payload: result.data,
  });
};

export const deleteLevel = (id) => async (dispatch) => {
  await axios.delete(`${config.APIEndpoint}/levels/${id}`);
  dispatch({
    type: DELETE_LEVEL,
    payload: id,
  });
};

export const updateLevel = (level) => async (dispatch) => {
  await axios.put(`${config.APIEndpoint}/levels/${level.id}`, level);
  dispatch({
    type: UPDATE_LEVEL,
    payload: level,
  });
};
