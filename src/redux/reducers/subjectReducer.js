import { GET_SUBJECTS, GET_SUBJECT, ADD_SUBJECT, DELETE_SUBJECT, UPDATE_SUBJECT, COUNT_SUBJECTS } from "../actions/types";

const initialState = {
  subjects: [],
  subject: {},
  subjectsCount: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUBJECTS:
      return { ...state, subjects: action.payload };
    case GET_SUBJECT:
      return { ...state, subject: action.payload };
    case ADD_SUBJECT: 
        return {...state, subjects: [ ...state.subjects, action.payload]};
        case DELETE_SUBJECT: return {...state, subjects: state.subjects.filter(subject => subject.id !== action.payload)};
    case UPDATE_SUBJECT: return {...state, subjects: state.subjects.map(subject => subject.id === action.payload.id ? (subject = action.payload) : subject)}
    case COUNT_SUBJECTS: return {...state, subjectsCount: action.payload};      
    default:
      return state;
  }
}
