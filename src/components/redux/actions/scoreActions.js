import {
    TOP_SCHOOLS_BY_LEVEL,
    TOP_SCHOOLS_BY_MEDALS,
    TOP_SCHOOLS_BY_SCORE,
    TOP_SCHOOLS_BY_SUBJECT,
    TOP_SCHOOLS_THIS_WEEK,
    TOP_USERS_BY_LEVEL,
    TOP_USERS_BY_MEDALS,
    TOP_USERS_BY_SCORE,
    TOP_USERS_BY_SUBJECT,
    LAST_THREE_WINNERS,
    USER_AVERAGE,
    USER_COUNT_SCORE,
    USER_SUM_SCORE,
    USER_SUM_MEDALS,
    USER_FAVORITE,
    POPULAR_SUBJECTS,
    TOP_USERS_THIS_WEEK

  } from "./types";
  import axios from "axios";
  
  export const getLastThreeWinners = () => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/lastThreeWinners`);
      dispatch({
        type: LAST_THREE_WINNERS,
        payload: result.data
      });
    
  };
  
  export const getSchoolsByScore = () => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/schoolsByScore`);
      dispatch({
        type: TOP_SCHOOLS_BY_SCORE,
        payload: result.data
      });
    
  };

  export const getSchoolsThisWeek = () => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/topschoolsThisWeek`);
      dispatch({
        type: TOP_SCHOOLS_THIS_WEEK,
        payload: result.data
      });
    
  };

  export const getSchoolsByMedals = () => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/schoolsByMedals`);
      dispatch({
        type: TOP_SCHOOLS_BY_MEDALS,
        payload: result.data
      });
    
  };

  export const getSchoolsByLevel = (id) => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/schoolsByLevel/${id}`);
      dispatch({
        type: TOP_SCHOOLS_BY_LEVEL,
        payload: result.data
      });
    
  };

  export const getSchoolsBySubject = (id) => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/schoolsBySubject/${id}`);
      dispatch({
        type: TOP_SCHOOLS_BY_SUBJECT,
        payload: result.data
      });
    
  };

  export const getUsersByScore = () => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/usersByScore`);
      dispatch({
        type: TOP_USERS_BY_SCORE,
        payload: result.data
      });
    
  };

  export const getUsersThisWeek = () => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/topusersThisWeek`);
      dispatch({
        type: TOP_USERS_THIS_WEEK,
        payload: result.data
      });
    
  };

  export const getUsersByMedals = () => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/usersByMedals`);
      dispatch({
        type: TOP_USERS_BY_MEDALS,
        payload: result.data
      });
    
  };

  export const getUsersByLevel = (id) => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/usersByLevel/${id}`);
      dispatch({
        type: TOP_USERS_BY_LEVEL,
        payload: result.data
      });
    
  };

  export const getUsersBySubject = (id) => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/usersBySubject/${id}`);
      dispatch({
        type: TOP_USERS_BY_SUBJECT,
        payload: result.data
      });
    
  };
  export const getPopularSubjects = () => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/popularSubjects`);
      dispatch({
        type: POPULAR_SUBJECTS,
        payload: result.data
      });
    
  };

  export const getUserFavoriteSubject = (id) => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/userFavoriteSubject/${id}`);
      dispatch({
        type: USER_FAVORITE,
        payload: result.data
      });
    
  };

  export const getUserAverage = (id) => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/userAverage/${id}`);
      dispatch({
        type: USER_AVERAGE,
        payload: result.data
      });
    
  };

 

  export const getUserSumMedals = (id) => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/userSumMedals/${id}`);
      dispatch({
        type: USER_SUM_MEDALS,
        payload: result.data
      });
    
  };

  export const getUserCountScore = (id) => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/userCountScore/${id}`);
      dispatch({
        type: USER_COUNT_SCORE,
        payload: result.data
      });
    
  };

  export const getUserSumScore = (id) => async dispatch => {

    const result = await axios.get(`http://localhost:4000/scores/userSumScore/${id}`);
      dispatch({
        type: USER_SUM_SCORE,
        payload: result.data
      });
    
  };