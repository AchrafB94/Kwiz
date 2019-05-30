import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { usersCount } from "../../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    getQuizzesCount,
    getQuestionsCount,
    getQuizPlayedSum,
  } from "../../redux/actions/quizActions";

  import { countSubjects} from '../../redux/actions/subjectActions'
  import { countSchools} from '../../redux/actions/schoolActions'

class AdminTop extends React.Component{
    componentDidMount() {
        this.props.getQuizzesCount();
        this.props.getQuestionsCount();
        this.props.usersCount();
        this.props.getQuizPlayedSum();
        this.props.countSubjects()
        this.props.countSchools()
    }
    render() {
        return(
            <center>
            <h2 >
        <span className="badge badge-primary">
          {" "}
          <FontAwesomeIcon icon="book" size="lg" /> {this.props.subjectsCount} Matiéres
        </span>{" "}
        <span className="badge badge-secondary">
          {" "}
          <FontAwesomeIcon icon="clipboard-list" size="lg" />{" "}
          {this.props.quizzesCount} Quizz
        </span>{" "}
        <span className="badge badge-success">
          {" "}
          <FontAwesomeIcon icon="question-circle" size="lg" />{" "}
          {this.props.questionsCount} Questions
        </span>{" "}
        <span className="badge badge-danger">
          {" "}
          <FontAwesomeIcon icon="user" size="lg" /> {this.props.count}{" "}
          Utilisateurs
        </span>{" "}
        <span className="badge badge-warning">
          {" "}
          <FontAwesomeIcon icon="school" size="lg" /> {this.props.schoolsCount} Ecoles
        </span>{" "}
        <span className="badge badge-info">
          {" "}
          <FontAwesomeIcon icon="check" size="lg" />{" "}
          {this.props.quizzesSumPlayed} Participations
        </span>{" "}
      </h2></center>
        )
    }
}

AdminTop.propTypes = {
    
quizzesCount: PropTypes.number.isRequired,
questionsCount: PropTypes.number.isRequired,
quizzesSumPlayed: PropTypes.number.isRequired,
count: PropTypes.number.isRequired,

}
const mapStateToProps = state => ({
    quizzesSumPlayed: state.quiz.quizzesSumPlayed,
    quizzesCount: state.quiz.quizzesCount,
    questionsCount: state.quiz.questionsCount,
    count: state.user.count,
    subjectsCount: state.subjects.subjectsCount,
    schoolsCount: state.schools.schoolsCount
  });

export default connect(
    mapStateToProps,
    {
  
        getQuizzesCount,
        getQuestionsCount,
        getQuizPlayedSum,
        usersCount,
        countSubjects,
        countSchools
  
    }
  )(AdminTop);