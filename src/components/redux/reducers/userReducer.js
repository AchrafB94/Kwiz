import {NEWEST_USER, USERS_COUNT, USERS_ONLINE} from '../actions/types';


const initialState = {
    count: 0,
    newestUser: [],
    online: 0,
};

export default function(state = initialState, action) {
    switch(action.type) {
        case NEWEST_USER: return {...state, newestUser: action.payload};
        case USERS_COUNT: return {...state, count: action.payload};
        case USERS_ONLINE: return {...state, online: action.payload};
         default: return state;
    }
}