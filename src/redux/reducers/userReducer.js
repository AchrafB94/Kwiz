import {NEWEST_USER, USERS_COUNT, GET_USER, GET_USERS, UPDATE_USER, LOGIN, GET_NEW_MEMBERS, CHECK_PERMISSION, BLOCK_USER, UNBLOCK_USER, ADD_CONTRIBUTOR, DELETE_USER} from '../actions/types';


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
        case CHECK_PERMISSION: return  {...state, permission: action.payload};
        case BLOCK_USER: return {...state, user: state.subjects.map(user => user.id === action.payload.id ? (user = action.payload) : user)};
        case UNBLOCK_USER: return {...state, users: state.users.map(user => user.id === action.payload.id ? (user = action.payload) : user)};
        case ADD_CONTRIBUTOR: return {...state, users: [ ...state.users, action.payload]};
        case DELETE_USER: return {...state, users: state.users.filter(user => user.id !== action.payload)};
         default: return state;
    }
}