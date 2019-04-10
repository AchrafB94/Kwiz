import {
  GET_QUIZZES,
  GET_QUIZ,
  GET_SUBJECTS,
  SAVE_ANSWER,
  ADD_SCORE
} from "./types";
import axios from "axios";

export const getQuizzes = () => async dispatch => {

  const result = await axios.get(`http://localhost:4000/quiz/all`);
    dispatch({
      type: GET_QUIZZES,
      payload: result.data
    });
  
};

export const getQuiz = id => async dispatch => {
  const result = await axios.get(`http://localhost:4000/quiz/${id}`);
  dispatch({
    type: GET_QUIZ,
    payload: result.data
  });
};

export const getSubjects = () => async dispatch => {
  const result = await axios.get(`http://localhost:4000/subjects/`);
  dispatch({
    type: GET_SUBJECTS,
    payload: result.data
  });
};



export const saveAnswer = text => async dispatch => {
  dispatch({
    type: SAVE_ANSWER,
    payload: text
  });
};

export const addScore = scoreData => async dispatch => {
  const resultScore = await axios.post(
    `http://localhost:4000/scores/add`,
    scoreData
  );
  await axios.put(`http://localhost:4000/quiz/updatePlayed/${scoreData.quizId}`);
  
  dispatch({
    type: ADD_SCORE,
    payload: resultScore.data
  });
  
};