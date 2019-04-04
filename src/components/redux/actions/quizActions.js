import {
  GET_QUIZZES,
  GET_QUIZ,
  GET_MATIERES,
  GET_ANSWERS,
  GET_QUESTIONS,
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

export const getMatieres = () => async dispatch => {
  const result = await axios.get(`http://localhost:4000/subjects/`);
  dispatch({
    type: GET_MATIERES,
    payload: result.data
  });
};

function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export const getQuestions = id => async dispatch => {
  const result = await axios.get(`http://localhost:4000/questions/${id}`);

  const shuffledQuestions = shuffleArray(result.data);

  dispatch({
    type: GET_QUESTIONS,
    payload: shuffledQuestions
  });
};

export const getAnswers = id => async dispatch => {
  const result = await axios.get(`http://localhost:4000/answers/${id}`);
  dispatch({
    type: GET_ANSWERS,
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
  /*
  await axios.put(`http://localhost:4000/quiztimes/${scoreData.quiz_id}`);
  */
  dispatch({
    type: ADD_SCORE,
    payload: resultScore.data
  });
  
};
