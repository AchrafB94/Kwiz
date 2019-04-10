import {
    USERS_COUNT,
    NEWEST_USER
  } from "./types";
  import axios from "axios";
  
  
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

  export const getOnlineUsers = () => async dispatch => {
    const result = await axios.get('http://localhost:4000/users/online')
    dispatch({
        type: USERS_COUNT,
        payload: result.data
    })
}