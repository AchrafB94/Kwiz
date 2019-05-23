import {
  GET_QUIZZES,
  GET_QUIZ,
  QUIZZES_COUNT,
  QUIZZES_SUM_PLAYED,
  QUESTIONS_COUNT,
  TOP_QUIZZES_BY_LEVEL,
  TOP_QUIZZES_BY_SUBJECT,
  TOP_QUIZZES_BY_USER,
  SUGGEST_QUIZZES,
  GET_QUIZZES_BY_USER,
  GET_NEW_QUIZZES,
  DELETE_QUIZ,
  CREATE_QUIZ,
  CREATE_QUESTIONS,
  IMPORT_QUESTION,
  EDIT_QUIZ,
  CLOSE_QUIZ
} from "./types";
import axios from "axios";

export const getAvailableQuizzes = () => async dispatch => {

  const result = await axios.get(`http://localhost:4000/quiz/available/`);
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



export const suggestQuizzes = (subjectId, currentId) => async dispatch => {
  
  const result = await axios.get(`http://localhost:4000/quiz/suggest/${subjectId}/${currentId}`,);
  dispatch({
    type: SUGGEST_QUIZZES,
    payload: result.data
  })
}







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

export const getQuizzesByUser = (userId) => async dispatch => {
  const result = await axios.get(`http://localhost:4000/quiz/user/${userId}`);
    dispatch({
      type: GET_QUIZZES_BY_USER,
      payload: result.data
    });
};

export const getNewQuizzes = () => async dispatch => {
  const result = await axios.get(`http://localhost:4000/quiz/new/`);
    dispatch({
      type: GET_NEW_QUIZZES,
      payload: result.data
    });
};

export const deleteQuiz = (id,userId,rank) => async dispatch => {
  await axios.delete(`http://localhost:4000/quiz/${id}/${userId}/${rank}`);
  dispatch( {
      type: DELETE_QUIZ,
      payload: id
  });
}

export const createQuiz = (quizData) => async dispatch => {
  const result = await axios.post(`http://localhost:4000/quiz/`,quizData);
    dispatch({
      type: CREATE_QUIZ,
      payload: result.data
    });
};

export const createQuestions = (quizId,levelId,subjectId,questionsData,answersData,valuesData) => async dispatch => {


    await axios.post(`http://localhost:4000/questions/create`,quizId,levelId,subjectId,questionsData,answersData,valuesData);
  
  


    dispatch({
      type: CREATE_QUESTIONS,
    });
};

export const rankUp = (quizId,position,userId) => async dispatch => {
  const data = {quizId,position,userId}
  const result = await axios.put(`http://localhost:4000/quiz/rank/`,data);
  dispatch({
    type: GET_QUIZZES_BY_USER,
    payload: result.data
  });
};

export const importQuestion = (subjectId,levelId) => async dispatch => {
  const result = await axios.get(`http://localhost:4000/questions/import/${subjectId}/${levelId}`);
  dispatch({
    type: IMPORT_QUESTION,
    payload: result.data
  });
};

export const editQuiz = (quiz) => async dispatch => {
  await axios.put(`http://localhost:4000/quiz/${quiz.id}`,quiz);
  dispatch ({
      type: EDIT_QUIZ,
      payload: quiz
  })
}

export const closeQuiz = (id,contribId) => async dispatch => {
  
  await axios.put(`http://localhost:4000/quiz/close/${id}`,contribId)
    dispatch({
      type: CLOSE_QUIZ,

    });
  };