import {
    USERS_COUNT,
    NEWEST_USER,
    GET_USER,
    UPDATE_USER,
  } from "./types";
  import axios from "axios";

  
  export const getUser = (id) => async dispatch => {
    const result = await axios.get(`http://localhost:4000/users/${id}`);
    dispatch({
      type: GET_USER,
      payload: result.data
    });
  };


  export const updateUser = (user) => async dispatch => {
    const result = await axios.put(`http://localhost:4000/users/${user.id}`,user);
    dispatch ({
        type: UPDATE_USER,
        payload: result.data
    })
}

export const updateImage = (updImage) => async dispatch => {
  await axios.put(`http://localhost:4000/users/image/${updImage.id}/`,updImage);
}

  
  export const getNewestUser = () => async dispatch => {
    const result = await axios.get(`http://localhost:4000/users/newest`);
    dispatch({
      type: NEWEST_USER,
      payload: result.data
    });
  };
  
  export const usersCount = () => async dispatch => {
      const result = await axios.get('http://localhost:4000/users/count')
      dispatch({
          type: USERS_COUNT,
          payload: result.data
      })
  }

  