import {NEWEST_USER, USERS_COUNT, GET_USER, UPDATE_USER} from '../actions/types';


const initialState = {
    count: 0,
    newestUser: [],
    user: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case NEWEST_USER: return {...state, newestUser: action.payload};
        case USERS_COUNT: return {...state, count: action.payload};
        case GET_USER: return {...state, user: action.payload};
        case UPDATE_USER: return {...state, user: action.payload};
         default: return state;
    }
}