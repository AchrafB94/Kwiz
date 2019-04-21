import React from "react";
import jwt_decode from "jwt-decode"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAvailableQuizzes } from "../../redux/actions/quizActions";
import { Link } from 'react-router-dom'

class QuizList extends React.Component {
  componentWillMount() {
    
   const user =  jwt_decode(localStorage.usertoken)
   this.props.getAvailableQuizzes(user.levelId);
  }




  quizCard(quiz) {
    return (
      <div key={quiz.id}>

        <div className="card ">
          <div className="row no-gutters">

            <div className="col">
              <div className="card-body">
                <h4>
                  
                  <Link to={"/quiz/" + quiz.id}>{quiz.name}</Link>
                </h4>
                <i className="text-muted">
                  Ajouté le {quiz.created} par <b>Mr. {quiz.user.firstname+" "+quiz.user.lastname}</b>
                </i>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }

  render() {
      const quizzesBySubject = this.props.quizzes.filter(quiz => quiz.subject.id === this.props.subjectId && quiz.id !== this.props.currentId)
       return( quizzesBySubject.map(quiz => this.quizCard(quiz)))
      }
    }


QuizList.propTypes = {
  quizzes: PropTypes.array.isRequired,
  getAvailableQuizzes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quizzes: state.quiz.quizzes
});

export default connect(
  mapStateToProps,
  { getAvailableQuizzes }
)(QuizList);
