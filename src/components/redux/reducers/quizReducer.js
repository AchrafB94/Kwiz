import {GET_QUIZZES, GET_QUIZ, GET_SUBJECTS, SAVE_ANSWER, ADD_SCORE} from '../actions/types';


const initialState = {
    quizzes: [],
    quiz: {},
    subjects: [],
    choices: [],
    score: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_QUIZZES: return {...state, quizzes: action.payload};
        case GET_QUIZ: return {...state, quiz: action.payload};
        case GET_SUBJECTS: return {...state, subjects: action.payload};
        case SAVE_ANSWER: return {...state, choices: [action.payload, ...state.choices]};
        case ADD_SCORE: return {...state, score: [action.payload]};
         default: return state;
    }
}