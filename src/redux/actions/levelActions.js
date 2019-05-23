import {
    GET_LEVELS,
    ADD_LEVEL,
    DELETE_LEVEL,
    UPDATE_LEVEL,
  } from "./types";
  import axios from "axios";


export const getLevels = () => async dispatch => {
    const result = await axios.get(`http://localhost:4000/levels/`);
    dispatch({
      type: GET_LEVELS,
      payload: result.data
    });
  };



  export const addLevel = (levelData) => async dispatch => {
    const result = await axios.post(`http://localhost:4000/levels`,levelData);
    dispatch({
      type: ADD_LEVEL,
      payload: result.data
    })
  }

  export const deleteLevel = (id) => async dispatch => {
    await axios.delete(`http://localhost:4000/levels/${id}`);
    dispatch( {
        type: DELETE_LEVEL,
        payload: id
    });
}

export const updateLevel = (level) => async dispatch => {
  await axios.put(`http://localhost:4000/levels/${level.id}`,level);
  dispatch ({
      type: UPDATE_LEVEL,
      payload: level
  })
}
