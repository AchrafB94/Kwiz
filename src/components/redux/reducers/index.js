import { combineReducers } from 'redux';
import quizReducer from './quizReducer'
import userReducer from './userReducer';
import scoreReducer from './scoreReducer';

export default combineReducers({
    quiz: quizReducer,
    user: userReducer,
    score: scoreReducer
});