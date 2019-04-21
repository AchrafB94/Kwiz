import React from 'react';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getNewestUser, usersCount
} from "../../redux/actions/userActions";
import {getQuestionsCount, getQuizPlayedSum} from '../../redux/actions/quizActions';
import './UserCard.css'
class UserCard extends React.Component{

    componentDidMount() {
        this.props.usersCount()
        this.props.getNewestUser()
        this.props.getQuestionsCount()
        this.props.getQuizPlayedSum()
        
    }

    render() {

        
    if (this.props.count == null) return null;
    if (this.props.questionsCount == null) return null;
    if (this.props.quizzesSumPlayed == null) return null;
    if (this.props.newestUser == null) return null;
        
        return(
            <div className="card bg-light mb-3">
    <div className="card-header">
  <small className="text-muted">
                Nouveau Membre: <b>{this.props.newestUser.map(user => user.firstname+" "+user.lastname)}</b>
              </small>
              </div>
  <div className="card-body">

    <div className="card-text">
    
    <p className="text-muted float-center"> <b  id="numbers">{this.props.questionsCount}</b> questions </p>
            <p className="text-muted text-center"> <b id="numbers">{this.props.count}</b> utilisateurs inscrits </p>
            <p className="text-muted float-right"> quizz joués <b  id="numbers">{this.props.quizzesSumPlayed}</b> fois  </p>
            </div>
  </div>

</div>

        )
    }
}

UserCard.propTypes = {
    count: PropTypes.number.isRequired,
    questionsCount: PropTypes.number.isRequired,
    quizzesSumPlayed: PropTypes.number.isRequired,
    newestUser: PropTypes.array.isRequired,
    usersCount: PropTypes.func.isRequired,
    getNewestUser: PropTypes.func.isRequired,
    getQuestionsCount: PropTypes.func.isRequired,
    getQuizPlayedSum: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    count: state.user.count,
    questionsCount: state.quiz.questionsCount,
    quizzesSumPlayed: state.quiz.quizzesSumPlayed,
    newestUser: state.user.newestUser

  });
  
  export default connect(
    mapStateToProps,
    { getNewestUser,usersCount, getQuestionsCount, getQuizPlayedSum }
  )(UserCard);
  