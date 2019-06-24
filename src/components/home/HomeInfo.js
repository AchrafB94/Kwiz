import React from 'react';

import { Link } from "react-router-dom"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getNewestUser, usersCount
} from "../../redux/actions/userActions";
import {getQuestionsCount} from '../../redux/actions/quizActions';
import {countScores} from '../../redux/actions/scoreActions';
import './HomeInfo.css'
class UserCard extends React.Component{

    componentDidMount() {
        this.props.usersCount()
        this.props.getNewestUser()
        this.props.getQuestionsCount()
        this.props.countScores()
        
    }

    render() {

        
    if (this.props.count == null) return null;
    if (this.props.questionsCount == null) return null;
    if (this.props.scoreCount == null) return null;
    if (this.props.newestUser == null) return null;
        
        return(
            <div className="card bg-light mb-3">
    <div className="card-header text-center">
  <small className="text-muted">
                Nouveau Membre: <b>{this.props.newestUser.map(user => <Link key={user.id} to={"/user/"+user.id} >{user.firstname+" "+user.lastname}</Link> )}</b>
              </small>
              </div>
  <div className="card-body">

    <div className="card-text">
    
    <p className="small text-muted float-center"> <b  id="numbers">{this.props.questionsCount}</b> questions - <b id="numbers">{this.props.count}</b> utilisateurs inscrits - quizz joués <b  id="numbers">{this.props.scoreCount}</b> fois  </p>
            </div>
  </div>

</div>

        )
    }
}

UserCard.propTypes = {
    count: PropTypes.number.isRequired,
    questionsCount: PropTypes.number.isRequired,
    scoreCount: PropTypes.number.isRequired,
    newestUser: PropTypes.array.isRequired,
    usersCount: PropTypes.func.isRequired,
    getNewestUser: PropTypes.func.isRequired,
    getQuestionsCount: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    count: state.user.count,
    questionsCount: state.quiz.questionsCount,
    scoreCount: state.score.scoreCount,
    newestUser: state.user.newestUser

  });
  
  export default connect(
    mapStateToProps,
    { getNewestUser,usersCount, getQuestionsCount, countScores }
  )(UserCard);
  