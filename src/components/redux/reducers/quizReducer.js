import {GET_QUIZZES, GET_QUIZ, GET_MATIERES, GET_QUESTIONS, GET_ANSWERS, SAVE_ANSWER, ADD_SCORE} from '../actions/types';




const initialState = {
    quizzes: [],
    quiz: {},
    questions: [],
    answers: [],
    matieres: [],
    choices: [],
    score: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_QUIZZES: return {...state, quizzes: action.payload};
        case GET_QUIZ: return {...state, quiz: action.payload};
        case GET_MATIERES: return {...state, matieres: action.payload};
        case GET_QUESTIONS: return {...state, questions: action.payload};
        case GET_ANSWERS: return {...state, answers: action.payload};
        case SAVE_ANSWER: return {...state, choices: [action.payload, ...state.choices]};
        case ADD_SCORE: return {...state, score: [action.payload]};
         default: return state;
    }
}