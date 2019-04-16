import {
    TOP_SCHOOLS_BY_LEVEL,
    TOP_SCHOOLS_BY_MEDALS,
    TOP_SCHOOLS_BY_SCORE,
    TOP_SCHOOLS_BY_SUBJECT,
    TOP_USERS_BY_LEVEL,
    TOP_USERS_BY_MEDALS,
    TOP_USERS_BY_SCORE,
    TOP_USERS_BY_SUBJECT,
    LAST_THREE_WINNERS,
    USER_AVERAGE,
    USER_COUNT_SCORE,
    USER_SUM_SCORE,
    USER_SUM_MEDALS,
    POPULAR_SUBJECTS,
    TOP_SCHOOLS_THIS_WEEK,
    TOP_USERS_THIS_WEEK

  } from "../actions/types";


const initialState = {
    schoolsByLevel: [],
    schoolsByMedals: [],
    schoolsByScore: [],
    schoolsBySubject: [],
    usersByLevel: [],
    usersByScore: [],
    usersBySubject: [],
    usersByMedals: [],
    threeWinners: [],
    average: [],
    scoreCount: 0,
    scoreSum: 0,
    medalSum: 0,
    popularSubjects: [],
    popularSchools: [],
    popularUsers: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case TOP_SCHOOLS_BY_LEVEL: return {...state, schoolsByLevel: action.payload};
        case TOP_SCHOOLS_BY_MEDALS:return {...state, schoolsByMedals: action.payload};
        case TOP_SCHOOLS_BY_SCORE: return {...state, schoolsByScore: action.payload};
        case TOP_SCHOOLS_BY_SUBJECT: return {...state, schoolsBySubject: action.payload};
        case TOP_USERS_BY_LEVEL: return {...state, usersByLevel: action.payload};
        case TOP_USERS_BY_MEDALS: return {...state, usersByMedals: action.payload};
        case TOP_USERS_BY_SCORE: return {...state, usersByScore: action.payload};
        case TOP_USERS_BY_SUBJECT: return {...state, usersBySubject: action.payload};
        case LAST_THREE_WINNERS: return {...state, threeWinners: action.payload};
        case USER_AVERAGE: return {...state, average: action.payload};
        case USER_COUNT_SCORE: return {...state, scoreCount: action.payload};
        case USER_SUM_SCORE: return {...state, scoreSum: action.payload};
        case USER_SUM_MEDALS: return {...state, medalSum: action.payload};
        case POPULAR_SUBJECTS: return {...state, popularSubjects: action.payload};
        case TOP_SCHOOLS_THIS_WEEK: return {...state, popularSchools: action.payload};
        case TOP_USERS_THIS_WEEK: return {...state, popularUsers: action.payload}
         default: return state;
    }
}