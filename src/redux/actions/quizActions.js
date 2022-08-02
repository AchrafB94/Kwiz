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
  EDIT_QUIZ,
  CLOSE_QUIZ,
  GET_QUESTIONS,
  CREATE_QUESTION,
  GET_QUESTION,
  RENAME_QUESTION,
  ADD_ANSWER,
  EDIT_ANSWER,
  REMOVE_QUESTION,
  REMOVE_ANSWER,
} from "./types";
import axios from "axios";
import config from "../../config";

export const getAvailableQuizzes = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/quiz/available/`);
  dispatch({
    type: GET_QUIZZES,
    payload: result.data,
  });
};

export const getAllQuizzes = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/quiz/`);
  dispatch({
    type: GET_QUIZZES,
    payload: result.data,
  });
};

export const getQuiz = (id) => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/quiz/${id}`);
  dispatch({
    type: GET_QUIZ,
    payload: result.data,
  });
};

export const suggestQuizzes = (subjectId, currentId) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/quiz/suggest/${subjectId}/${currentId}`
  );
  dispatch({
    type: SUGGEST_QUIZZES,
    payload: result.data,
  });
};

export const topQuizzesBySubject = () => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/quiz/topQuizzesBySubject/`
  );
  dispatch({
    type: TOP_QUIZZES_BY_SUBJECT,
    payload: result.data,
  });
};

export const topQuizzesByLevel = () => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/quiz/topQuizzesByLevel/`
  );
  dispatch({
    type: TOP_QUIZZES_BY_LEVEL,
    payload: result.data,
  });
};

export const topQuizzesByUsers = () => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/quiz/topQuizzesByUsers/`
  );
  dispatch({
    type: TOP_QUIZZES_BY_USER,
    payload: result.data,
  });
};

export const getQuizzesCount = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/quiz/countQuizzes`);
  dispatch({
    type: QUIZZES_COUNT,
    payload: result.data,
  });
};

export const getQuizPlayedSum = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/quiz/quizPlayedSum`);
  dispatch({
    type: QUIZZES_SUM_PLAYED,
    payload: result.data,
  });
};

export const getQuestionsCount = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/questions/count`);
  dispatch({
    type: QUESTIONS_COUNT,
    payload: result.data,
  });
};

export const getQuizzesByUser = (userId) => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/quiz/user/${userId}`);
  dispatch({
    type: GET_QUIZZES_BY_USER,
    payload: result.data,
  });
};

export const getNewQuizzes = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/quiz/new/`);
  dispatch({
    type: GET_NEW_QUIZZES,
    payload: result.data,
  });
};

export const deleteQuiz = (id, userId, rank) => async (dispatch) => {
  await axios.delete(`${config.APIEndpoint}/quiz/${id}/${userId}/${rank}`);
  dispatch({
    type: DELETE_QUIZ,
    payload: id,
  });
};

export const createQuiz = (quizData) => async (dispatch) => {
  const result = await axios.post(`${config.APIEndpoint}/quiz/`, quizData);
  dispatch({
    type: CREATE_QUIZ,
    payload: result.data,
  });
};

export const addQuestion = (questionsData) => async (dispatch) => {
  const result = await axios.post(
    `${config.APIEndpoint}/questions/`,
    questionsData
  );
  dispatch({
    type: CREATE_QUESTION,
    payload: result.data,
  });
};

export const addAnswer = (answerData) => async (dispatch) => {
  const result = await axios.post(
    `${config.APIEndpoint}/questions/answer`,
    answerData
  );
  dispatch({
    type: ADD_ANSWER,
    payload: result.data,
  });
};

export const getQuestions = (id) => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/questions/quiz/${id}`);
  dispatch({
    type: GET_QUESTIONS,
    payload: result.data,
  });
};

export const editQuiz = (quiz) => async (dispatch) => {
  await axios.put(`${config.APIEndpoint}/quiz/${quiz.id}`, quiz);
  dispatch({
    type: EDIT_QUIZ,
    payload: quiz,
  });
};

export const closeQuiz = (id, contribId) => async (dispatch) => {
  await axios.put(`${config.APIEndpoint}/quiz/close/${id}`, contribId);
  dispatch({
    type: CLOSE_QUIZ,
  });
};

export const getQuestion = (id) => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/questions/${id}`);
  dispatch({
    type: GET_QUESTION,
    payload: result.data,
  });
};

export const renameQuestion = (data) => async (dispatch) => {
  await axios.put(`${config.APIEndpoint}/questions/${data.id}`, data);
  dispatch({
    type: RENAME_QUESTION,
    payload: data,
  });
};

export const editAnswer = (data) => async (dispatch) => {
  await axios.put(`${config.APIEndpoint}/questions/answer/${data.id}`, data);
  dispatch({
    type: EDIT_ANSWER,
    payload: data,
  });
};

export const deleteQuestion = (id) => async (dispatch) => {
  await axios.delete(`${config.APIEndpoint}/questions/${id}`);
  dispatch({
    type: REMOVE_QUESTION,
    payload: id,
  });
};

export const deleteAnswer = (answerData) => async (dispatch) => {
  await axios.delete(
    `${config.APIEndpoint}/questions/answer/${answerData.questionId}/${answerData.id}`
  );
  dispatch({
    type: REMOVE_ANSWER,
    payload: answerData.id,
  });
};
