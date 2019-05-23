import {GET_QUIZZES, GET_QUIZ,   QUIZZES_COUNT,
    QUIZZES_SUM_PLAYED,
    QUESTIONS_COUNT,
    TOP_QUIZZES_BY_LEVEL,
    TOP_QUIZZES_BY_SUBJECT,
    TOP_QUIZZES_BY_USER,
    SUGGEST_QUIZZES,
    RESET_CHOICES,
    GET_NEW_QUIZZES,
    GET_QUIZZES_BY_USER,
    DELETE_QUIZ,
    CREATE_QUIZ,
    IMPORT_QUESTION,
    EDIT_QUIZ} from '../actions/types';
    


const initialState = {
    quizzes: [],
    quiz: {},
    quizzesCount: 0,
    quizzesSumPlayed: 0,
    questionsCount: 0,
    quizzesByLevel: [],
    quizzesBySubject: [],
    quizzesByUsers: [],
    subject: {},
    quizzesSuggestions: [],
    question: {}

};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_QUIZZES: return {...state, quizzes: action.payload};
        case GET_QUIZ: return {...state, quiz: action.payload};
        case QUIZZES_COUNT: return {...state, quizzesCount: action.payload};
        case QUIZZES_SUM_PLAYED: return {...state, quizzesSumPlayed: action.payload};
        case QUESTIONS_COUNT: return {...state, questionsCount: action.payload};
        case TOP_QUIZZES_BY_LEVEL: return {...state, quizzesByLevel: action.payload};
        case TOP_QUIZZES_BY_SUBJECT: return {...state, quizzesBySubject: action.payload};
        case TOP_QUIZZES_BY_USER: return {...state, quizzesByUsers: action.payload};
        case SUGGEST_QUIZZES: return {...state, quizzesSuggestions: action.payload};
        case RESET_CHOICES: return {...state, choices: []};
        case GET_NEW_QUIZZES: return {...state, quizzes: action.payload};
        case GET_QUIZZES_BY_USER: return {...state, quizzes: action.payload};
        case CREATE_QUIZ: return {...state, quiz: action.payload}
        case DELETE_QUIZ:  return {...state, quizzes: state.quizzes.filter(quiz => quiz.id !== action.payload)};
        case IMPORT_QUESTION: return {...state, question: action.payload};
        case EDIT_QUIZ: return {...state, quizzes: state.quizzes.map(quiz => quiz.id === action.payload.id ? (quiz = action.payload) : quiz)}
         default: return state;
    }
}