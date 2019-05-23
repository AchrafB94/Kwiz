import {     GET_LEVELS,
    ADD_LEVEL,
    DELETE_LEVEL,
    UPDATE_LEVEL, } from "../actions/types";

const initialState = {
  levels: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LEVELS:
      return { ...state, levels: action.payload };
    case ADD_LEVEL: 
        return {...state, levels: [ ...state.levels, action.payload]};
        case DELETE_LEVEL: return {...state, levels: state.levels.filter(level => level.id !== action.payload)};
    case UPDATE_LEVEL: return {...state, levels: state.levels.map(level => level.id === action.payload.id ? (level = action.payload) : level)}
  
    default:
      return state;
  }
}
