import { ADD_SCHOOL,COUNT_SCHOOLS,DELETE_SCHOOL,GET_SCHOOL,GET_SCHOOLS, UPDATE_SCHOOL } from "../actions/types";

const initialState = {
  schools: [],
  school: {},
  schoolsCount: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SCHOOLS:
      return { ...state, schools: action.payload };
    case GET_SCHOOL:
      return { ...state, school: action.payload };
    case ADD_SCHOOL: 
        return {...state, schools: [ ...state.schools, action.payload]};
        case DELETE_SCHOOL: return {...state, schools: state.schools.filter(school => school.id !== action.payload)};
        case UPDATE_SCHOOL: return {...state, schools: state.schools.map(school => school.id === action.payload.id ? (school = action.payload) : school)}
    case COUNT_SCHOOLS: return {...state, schoolsCount: action.payload};      
    default:
      return state;
  }
}
