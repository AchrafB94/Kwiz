import {
  GET_QUIZZES,
  GET_QUIZ,
  GET_SUBJECTS,
  SAVE_ANSWER,
  ADD_SCORE,
  QUIZZES_COUNT,
  QUIZZES_SUM_PLAYED,
  QUESTIONS_COUNT,
  TOP_QUIZZES_BY_LEVEL,
  TOP_QUIZZES_BY_SUBJECT,
  TOP_QUIZZES_BY_USER,
  GET_SUBJECT,
  SUGGEST_QUIZZES,
  RESET_CHOICES
} from "./types";
import axios from "axios";

export const getAvailableQuizzes = (levelId) => async dispatch => {

  const result = await axios.get(`http://localhost:4000/quiz/available/${levelId}`);
    dispatch({
      type: GET_QUIZZES,
      payload: result.data
    });
  
};

export const getAllQuizzes = () => async dispatch => {

  const result = await axios.get(`http://localhost:4000/quiz/`);
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

export const getSubject = (id) => async dispatch => {
  const result = await axios.get(`http://localhost:4000/subjects/${id}`);
  dispatch({
    type: GET_SUBJECT,
    payload: result.data
  });
};

export const suggestQuizzes = (subjectId, currentId) => async dispatch => {
  
  const result = await axios.get(`http://localhost:4000/quiz/suggest/${subjectId}/${currentId}`,);
  dispatch({
    type: SUGGEST_QUIZZES,
    payload: result.data
  })
}



export const saveAnswer = text => dispatch => {
  dispatch({
    type: SAVE_ANSWER,
    payload: text
  });
};

export const resetChoices = () => async dispatch => {
  dispatch({
    type: RESET_CHOICES
  });
};

export const addScore = scoreData => async dispatch => {
  const resultScore = await axios.post(
    `http://localhost:4000/scores/`,
    scoreData
  );
  await axios.put(`http://localhost:4000/quiz/updatePlayed/${scoreData.quizId}`);

  if(scoreData.medal !== 0) {
    await axios.put(`http://localhost:4000/quiz/updateMedals/${scoreData.quizId}/${scoreData.medal}`)
  }

  if(scoreData.medal === 1) {
    await axios.put(`http://localhost:4000/quiz/closeQuiz/${scoreData.quizId}`)
  }
  
  dispatch({
    type: ADD_SCORE,
    payload: resultScore.data
  });
  
};



export const topQuizzesBySubject = () => async dispatch => {
  const result = await axios.get(`http://localhost:4000/quiz/topQuizzesBySubject/`);
  dispatch({
    type: TOP_QUIZZES_BY_SUBJECT,
    payload: result.data
  });
};

export const topQuizzesByLevel = () => async dispatch => {
  const result = await axios.get(`http://localhost:4000/quiz/topQuizzesByLevel/`);
  dispatch({
    type: TOP_QUIZZES_BY_LEVEL,
    payload: result.data
  });
};

export const topQuizzesByUsers = () => async dispatch => {
  const result = await axios.get(`http://localhost:4000/quiz/topQuizzesByUsers/`);
  dispatch({
    type: TOP_QUIZZES_BY_USER,
    payload: result.data
  });
};

export const getQuizzesCount = () => async dispatch => {
  const result = await axios.get(`http://localhost:4000/quiz/countQuizzes`);
  dispatch({
    type: QUIZZES_COUNT,
    payload: result.data
  });
};

export const getQuizPlayedSum = () => async dispatch => {
  const result = await axios.get(`http://localhost:4000/quiz/quizPlayedSum`);
  dispatch({
    type: QUIZZES_SUM_PLAYED,
    payload: result.data
  });
};

export const getQuestionsCount = () => async dispatch => {
  const result = await axios.get(`http://localhost:4000/questions/count`);
  dispatch({
    type: QUESTIONS_COUNT,
    payload: result.data
  });
};