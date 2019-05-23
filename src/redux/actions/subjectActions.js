import {
    GET_SUBJECTS,
    GET_SUBJECT,
    ADD_SUBJECT,
    DELETE_SUBJECT,
    UPDATE_SUBJECT,
    COUNT_SUBJECTS
  } from "./types";
  import axios from "axios";


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


  export const addSubject = (subjectData) => async dispatch => {
    const result = await axios.post(`http://localhost:4000/subjects`,subjectData);
    dispatch({
      type: ADD_SUBJECT,
      payload: result.data
    })
  }

  export const deleteSubject = (id) => async dispatch => {
    await axios.delete(`http://localhost:4000/subjects/${id}`);
    dispatch( {
        type: DELETE_SUBJECT,
        payload: id
    });
}

export const updateSubject = (subject) => async dispatch => {
  await axios.put(`http://localhost:4000/subjects/${subject.id}`,subject);
  dispatch ({
      type: UPDATE_SUBJECT,
      payload: subject
  })
}

export const countSubjects = () => async dispatch => {
  const result = await axios.get(`http://localhost:4000/subjects/count`);
  dispatch({
    type: COUNT_SUBJECTS,
    payload: result.data
  });
};