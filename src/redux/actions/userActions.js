import {
  USERS_COUNT,
  NEWEST_USER,
  GET_USER,
  UPDATE_USER,
  GET_NEW_MEMBERS,
  GET_USERS,
  CHECK_PERMISSION,
  ADD_CONTRIBUTOR,
  BLOCK_USER,
  UNBLOCK_USER,
  DELETE_USER,
} from "./types";
import axios from "axios";
import config from "../../config";

export const register = (newUser) => async (dispatch) => {
  const result = await axios.post(`${config.APIEndpoint}/users/register`, {
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    email: newUser.email,
    password: newUser.password,
    schoolId: newUser.schoolId,
    birthdate: newUser.birthdate,
    gender: newUser.gender,
    phone: newUser.phone,
    levelId: newUser.levelId,
    class: newUser.class,
    district: newUser.district,
    city: newUser.city,
    province: newUser.province,
  });

  return result.data;
};

export const login = (user) => async (dispatch) => {
  const result = await axios.post(`${config.APIEndpoint}/users/login`, {
    email: user.email,
    password: user.password,
  });

  return result.data;
};

export const getUser = (id) => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/users/${id}`, config);
  dispatch({
    type: GET_USER,
    payload: result.data,
  });
};

export const getUsers = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/users/`, config);
  dispatch({
    type: GET_USERS,
    payload: result.data,
  });
};

export const getNewMembers = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/users/new`, config);
  dispatch({
    type: GET_NEW_MEMBERS,
    payload: result.data,
  });
};

export const updateUser = (user) => async (dispatch) => {
  const result = await axios.put(
    `${config.APIEndpoint}/users/${user.id}`,
    user,
    config
  );
  dispatch({
    type: UPDATE_USER,
    payload: result.data,
  });
};

export const updateImage = (updImage) => async (dispatch) => {
  await axios.put(
    `${config.APIEndpoint}/users/image/${updImage.id}/`,
    updImage,
    config
  );
};

export const getNewestUser = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/users/newest`, config);
  dispatch({
    type: NEWEST_USER,
    payload: result.data,
  });
};

export const usersCount = () => async (dispatch) => {
  const result = await axios.get(`${config.APIEndpoint}/users/count`, config);
  dispatch({
    type: USERS_COUNT,
    payload: result.data,
  });
};

export const checkPermission = (roleId, ruleId) => async (dispatch) => {
  const data = { roleId, ruleId };
  const result = await axios.get(
    `${config.APIEndpoint}/users/permission`,
    data,
    config
  );

  dispatch({
    type: CHECK_PERMISSION,
    payload: result.data,
  });
};

export const addContributor = (contribData) => async (dispatch) => {
  const result = await axios.post(
    `${config.APIEndpoint}/users/addcontributor`,
    contribData,
    config
  );
  dispatch({
    type: ADD_CONTRIBUTOR,
    payload: result.data,
  });
  return result.data;
};

export const blockUser = (user) => async (dispatch) => {
  await axios.put(`${config.APIEndpoint}/users/block/${user.id}`, config);
  dispatch({
    type: BLOCK_USER,
    payload: user,
  });
};

export const unblockUser = (user) => async (dispatch) => {
  await axios.put(`${config.APIEndpoint}/users/unblock/${user.id}`, config);
  dispatch({
    type: UNBLOCK_USER,
    payload: user,
  });
};

export const deleteUser = (id) => async (dispatch) => {
  await axios.delete(`${config.APIEndpoint}/users/${id}`, config);
  dispatch({
    type: DELETE_USER,
    payload: id,
  });
};

export const changePassword = (passwordData) => async (dispatch) => {
  const result = await axios.put(
    `${config.APIEndpoint}/users/changepassword/${passwordData.id}`,
    passwordData,
    config
  );
  return result.data;
};
export const confirmEmail = (token) => async (dispatch) => {
  const data = { token: token };
  const result = await axios.post(`${config.APIEndpoint}/users/confirm/`, data);
  return result.data;
};

export const resetPassword = (email) => async (dispatch) => {
  const data = { email };
  const result = await axios.post(
    `${config.APIEndpoint}/users/resetpassword/`,
    data
  );
  return result.data;
};

export const confirmPassword = (data) => async (dispatch) => {
  const result = await axios.post(
    `${config.APIEndpoint}/users/confirmpasswordreset/`,
    data
  );
  return result.data;
};
