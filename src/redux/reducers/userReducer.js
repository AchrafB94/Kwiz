import {NEWEST_USER, USERS_COUNT, GET_USER, GET_USERS, UPDATE_USER, LOGIN, GET_NEW_MEMBERS, CHECK_PERMISSION} from '../actions/types';


const initialState = {
    count: 0,
    newestUser: [],
    user: {},
    users: [],
    permission: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case NEWEST_USER: return {...state, newestUser: action.payload};
        case USERS_COUNT: return {...state, count: action.payload};
        case GET_USER: return {...state, user: action.payload};
        case UPDATE_USER: return {...state, user: action.payload};
        case LOGIN: return {...state, user: action.payload};
        case GET_NEW_MEMBERS: return {...state, users: action.payload};
        case GET_USERS: return {...state, users: action.payload};
        case CHECK_PERMISSION: return  {...state, permission: action.payload}
         default: return state;
    }
}