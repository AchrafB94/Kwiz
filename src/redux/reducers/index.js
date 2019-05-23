import { combineReducers } from 'redux';
import quizReducer from './quizReducer'
import userReducer from './userReducer';
import scoreReducer from './scoreReducer';
import subjectReducer from './subjectReducer';
import schoolReducer from './schoolReducer';
import levelReducer from './levelReducer';

export default combineReducers({
    quiz: quizReducer,
    user: userReducer,
    score: scoreReducer,
    subjects: subjectReducer,
    schools: schoolReducer,
    levels: levelReducer
});