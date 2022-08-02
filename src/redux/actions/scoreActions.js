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
  TOP_USERS_THIS_WEEK,
  CHECK_WINNER,
  GET_WINNERS,
  NEW_SCORES,
  GET_WINNERS_BY_QUIZ,
  USER_MEDALS_BY_SCHOOL,
  SCHOOL_SUM_MEDALS,
  ADD_SCORE,
  GET_SCORES,
  FILTER_SCORES,
  COUNT_SCORES,
  RESET_USER_SCORES,
  POPULAR_QUIZZES,
  TOP_USERS_BY_PARTICIPATIONS,
} from "./types";
import axios from "axios";
import config from "../../config";

export const addScore = (scoreData) => async (dispatch) => {
  console.log(scoreData);
  const resultScore = await axios.post(
    `${config.APIEndpoint}/scores/`,
    scoreData
  );
  if (scoreData.medal === 1) {
    const contribId = { contribId: scoreData.contribId };

    await axios.put(
      `${config.APIEndpoint}/quiz/close/${scoreData.quizId}`,
      contribId
    );
  } else if (scoreData.medal === 10 || scoreData.medal === 100) {
    await axios.put(
      `${config.APIEndpoint}/quiz/updateMedals/${scoreData.quizId}/${scoreData.medal}`
    );
  }

  dispatch({
    type: ADD_SCORE,
    payload: resultScore.data,
  });
};

export const checkWinner = (quizId, userId) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/checkWinner/${quizId}/${userId}`
  );
  dispatch({
    type: CHECK_WINNER,
    payload: result.data,
  });
};

export const getNewScores = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/scores/new`);
  dispatch({
    type: NEW_SCORES,
    payload: result.data,
  });
};

export const getScores = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/scores/`);
  dispatch({
    type: GET_SCORES,
    payload: result.data,
  });
};

export const getLastThreeWinners = () => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/lastThreeWinners`
  );
  dispatch({
    type: LAST_THREE_WINNERS,
    payload: result.data,
  });
};

export const getWinners = (subjectId, levelId) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/winners/${subjectId}/${levelId}`
  );
  dispatch({
    type: GET_WINNERS,
    payload: result.data,
  });
};

export const getWinnersByQuiz = (quizId) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/quizwinners/${quizId}`
  );
  dispatch({
    type: GET_WINNERS_BY_QUIZ,
    payload: result.data,
  });
};

export const getSchoolsByScore = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/scores/schoolsByScore`);
  dispatch({
    type: TOP_SCHOOLS_BY_SCORE,
    payload: result.data,
  });
};

export const getSchoolsThisWeek = () => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/topschoolsThisWeek`
  );
  dispatch({
    type: TOP_SCHOOLS_THIS_WEEK,
    payload: result.data,
  });
};

export const getSchoolsByMedals = () => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/schoolsByMedals`
  );
  dispatch({
    type: TOP_SCHOOLS_BY_MEDALS,
    payload: result.data,
  });
};

export const getSchoolsByLevel = (id) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/schoolsByLevel/${id}`
  );
  dispatch({
    type: TOP_SCHOOLS_BY_LEVEL,
    payload: result.data,
  });
};

export const getSchoolsBySubject = (id) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/schoolsBySubject/${id}`
  );
  dispatch({
    type: TOP_SCHOOLS_BY_SUBJECT,
    payload: result.data,
  });
};

export const getUsersByScore = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/scores/usersByScore`);
  dispatch({
    type: TOP_USERS_BY_SCORE,
    payload: result.data,
  });
};

export const getUserScoresByParticipations = () => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/usersbyparticipations`
  );
  dispatch({
    type: TOP_USERS_BY_PARTICIPATIONS,
    payload: result.data,
  });
};

export const getUsersThisWeek = () => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/topusersThisWeek`
  );
  dispatch({
    type: TOP_USERS_THIS_WEEK,
    payload: result.data,
  });
};

export const getUsersByMedals = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/scores/usersByMedals`);
  dispatch({
    type: TOP_USERS_BY_MEDALS,
    payload: result.data,
  });
};

export const getUsersByLevel = (id) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/usersByLevel/${id}`
  );
  dispatch({
    type: TOP_USERS_BY_LEVEL,
    payload: result.data,
  });
};

export const getUsersBySubject = (id) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/usersBySubject/${id}`
  );
  dispatch({
    type: TOP_USERS_BY_SUBJECT,
    payload: result.data,
  });
};
export const getPopularSubjects = () => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/popularSubjects`
  );
  dispatch({
    type: POPULAR_SUBJECTS,
    payload: result.data,
  });
};

export const getPopularQuizzes = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/scores/popularQuizzes`);
  dispatch({
    type: POPULAR_QUIZZES,
    payload: result.data,
  });
};

export const getUserFavoriteSubject = (id) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/userFavoriteSubject/${id}`
  );
  dispatch({
    type: USER_FAVORITE,
    payload: result.data,
  });
};

export const getUserAverage = (id) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/userAverage/${id}`
  );
  dispatch({
    type: USER_AVERAGE,
    payload: result.data,
  });
};

export const getUserMedalsBySchool = (id) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/usermedalsbyschool/${id}`
  );
  dispatch({
    type: USER_MEDALS_BY_SCHOOL,
    payload: result.data,
  });
};

export const getUserSumMedals = (id) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/userSumMedals/${id}`
  );
  dispatch({
    type: USER_SUM_MEDALS,
    payload: result.data,
  });
};

export const getSchoolSumMedals = (id) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/schoolSumMedals/${id}`
  );
  dispatch({
    type: SCHOOL_SUM_MEDALS,
    payload: result.data,
  });
};

export const getUserCountScore = (id) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/userCountScore/${id}`
  );
  dispatch({
    type: USER_COUNT_SCORE,
    payload: result.data,
  });
};

export const getUserSumScore = (id) => async (dispatch) => {
  const result = await axios.get(
    `${config.APIEndpoint}/scores/userSumScore/${id}`
  );
  dispatch({
    type: USER_SUM_SCORE,
    payload: result.data,
  });
};

export const filterScores = (levelId, subjectId) => async (dispatch) => {
  let result = [];
  if (subjectId === "all") {
    result = await axios.get(`${config.APIEndpoint}/scores/filter/${levelId}/`);
  } else {
    result = await axios.get(
      `${config.APIEndpoint}/scores/filter/${levelId}/${subjectId}`
    );
  }

  dispatch({
    type: FILTER_SCORES,
    payload: result.data,
  });
};

export const countScores = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/scores/count/`);
  dispatch({
    type: COUNT_SCORES,
    payload: result.data,
  });
};

export const resetUser = (user) => async (dispatch) => {
  await axios.delete(`${config.APIEndpoint}/scores/reset/${user.id}`);
  dispatch({
    type: RESET_USER_SCORES,
    payload: user,
  });
};
