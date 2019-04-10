import {
    TOP_SCHOOLS_BY_LEVEL,
    TOP_QUIZZES_BY_LEVEL,
    TOP_QUIZZES_BY_SUBJECT,
    TOP_QUIZZES_BY_USER,
    TOP_SCHOOLS_BY_MEDALS,
    TOP_SCHOOLS_BY_SCORE,
    TOP_SCHOOLS_BY_SUBJECT,
    TOP_SCHOOLS_THIS_WEEK,
    TOP_USERS_BY_LEVEL,
    TOP_USERS_BY_MEDALS,
    TOP_USERS_BY_SCORE,
    TOP_USERS_BY_SUBJECT,
    TOP_USERS_THIS_WEEK,
    QUIZZES_COUNT
  } from "./types";
  import axios from "axios";
  
  export const getQuizzes = () => async dispatch => {
  
    const result = await axios.get(`http://localhost:4000/quiz/all`);
      dispatch({
        type: GET_QUIZZES,
        payload: result.data
      });
    
  };