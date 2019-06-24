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
    DELETE_USER
  } from "./types";
  import axios from "axios";


  let config = {
    headers: {
      'x-access-token': localStorage.usertoken,
    }
  }

export const register = (newUser) => async dispatch => {
    const result = await axios
        .post('http://localhost:4000/users/register', {
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
            
        })

        return result.data
}



export const login = user => async dispatch => {
    const result = await axios.post('http://localhost:4000/users/login', {
            email: user.email,
            password: user.password
        })
               
                return result.data
        
}

  export const getUser = (id) => async dispatch => {
    const result = await axios.get(`http://localhost:4000/users/${id}`,config);
    dispatch({
      type: GET_USER,
      payload: result.data
    });
  };

  export const getUsers = () => async dispatch => {
    const result = await axios.get(`http://localhost:4000/users/`,config);
    dispatch({
      type: GET_USERS,
      payload: result.data
    });
  };

  export const getNewMembers = () => async dispatch => {
    const result = await axios.get(`http://localhost:4000/users/new`,config);
    dispatch({
      type: GET_NEW_MEMBERS,
      payload: result.data
    });
  };


  export const updateUser = (user) => async dispatch => {
    const result = await axios.put(`http://localhost:4000/users/${user.id}`,user,config);
    dispatch ({
        type: UPDATE_USER,
        payload: result.data
    })
}

export const updateImage = (updImage) => async dispatch => {
  await axios.put(`http://localhost:4000/users/image/${updImage.id}/`,updImage,config);
}

  
  export const getNewestUser = () => async dispatch => {
    const result = await axios.get(`http://localhost:4000/users/newest`,config);
    dispatch({
      type: NEWEST_USER,
      payload: result.data
    });
  };
  
  export const usersCount = () => async dispatch => {
      const result = await axios.get('http://localhost:4000/users/count',config)
      dispatch({
          type: USERS_COUNT,
          payload: result.data
      })
  }


  export const checkPermission = (roleId,ruleId) => async dispatch => {
    const data = {roleId,ruleId}
      const result = await axios.get('http://localhost:4000/users/permission',data,config)
      
      dispatch({
        type: CHECK_PERMISSION,
        payload: result.data

        
    })
  }
  
  export const addContributor = (contribData) => async dispatch => {
    const result = await axios.post('http://localhost:4000/users/addcontributor',contribData,config)
    dispatch({
      type: ADD_CONTRIBUTOR,
      payload: result.data
    })
    return result.data
  }

  export const blockUser = (user) => async dispatch => {
    await axios.put(`http://localhost:4000/users/block/${user.id}`,config)
    dispatch({
      type: BLOCK_USER,
      payload: user
    })
  }

  export const unblockUser = (user) => async dispatch => {
    await axios.put(`http://localhost:4000/users/unblock/${user.id}`,config)
    dispatch({
      type: UNBLOCK_USER,
      payload: user
    })
  }

  export const deleteUser = (id) => async dispatch => {
    await axios.delete(`http://localhost:4000/users/${id}`,config)
    dispatch({
      type: DELETE_USER,
      payload: id
    })
  }


export const changePassword = (passwordData) => async dispatch => {
    const result = await axios.put(`http://localhost:4000/users/changepassword/${passwordData.id}`,passwordData,config);
    return result.data
}
export const confirmEmail = (token) => async dispatch => {
  const data = {token: token}
  const result = await axios.post(`http://localhost:4000/users/confirm/`,data);
  return result.data
}

export const resetPassword = (email) => async dispatch => {
  const data = {email}
  const result = await axios.post(`http://localhost:4000/users/resetpassword/`,data)
  return result.data
}

export const confirmPassword = (data) => async dispatch => {
  const result = await axios.post(`http://localhost:4000/users/confirmpasswordreset/`,data);
  return result.data
}