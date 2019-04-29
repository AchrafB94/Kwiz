import {GET_QUIZZES, GET_QUIZ, GET_SUBJECTS, SAVE_ANSWER, ADD_SCORE,   QUIZZES_COUNT,
    QUIZZES_SUM_PLAYED,
    QUESTIONS_COUNT,
    TOP_QUIZZES_BY_LEVEL,
    TOP_QUIZZES_BY_SUBJECT,
    TOP_QUIZZES_BY_USER,
    GET_SUBJECT,
    SUGGEST_QUIZZES,
    RESET_CHOICES,
    SUBJECTS_ON} from '../actions/types';
    


const initialState = {
    quizzes: [],
    quiz: {},
    subjects: [],
    choices: [],
    score: {},
    quizzesCount: 0,
    quizzesSumPlayed: 0,
    questionsCount: 0,
    quizzesByLevel: [],
    quizzesBySubject: [],
    quizzesByUsers: [],
    subject: {},
    quizzesSuggestions: [],
    loadSubjects: false

};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_QUIZZES: return {...state, quizzes: action.payload};
        case GET_QUIZ: return {...state, quiz: action.payload};
        case GET_SUBJECTS: return {...state, subjects: action.payload};
        case SAVE_ANSWER: return {...state, choices: [...state.choices, action.payload]};
        case ADD_SCORE: return {...state, score: [action.payload]};
        case QUIZZES_COUNT: return {...state, quizzesCount: action.payload};
        case QUIZZES_SUM_PLAYED: return {...state, quizzesSumPlayed: action.payload};
        case QUESTIONS_COUNT: return {...state, questionsCount: action.payload};
        case TOP_QUIZZES_BY_LEVEL: return {...state, quizzesByLevel: action.payload};
        case TOP_QUIZZES_BY_SUBJECT: return {...state, quizzesBySubject: action.payload};
        case TOP_QUIZZES_BY_USER: return {...state, quizzesByUsers: action.payload};
        case GET_SUBJECT: return {...state, subject: action.payload};
        case SUGGEST_QUIZZES: return {...state, quizzesSuggestions: action.payload};
        case RESET_CHOICES: return {...state, choices: []}
        case SUBJECTS_ON: return {...state, loadSubjects: true}
         default: return state;
    }
}