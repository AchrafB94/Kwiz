import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAvailableQuizzes } from "../../redux/actions/quizActions";
import { Link } from "react-router-dom";

class QuizList extends React.Component {
  componentDidMount() {
    
   const level =  localStorage.userlevel
   this.props.getAvailableQuizzes(level);
  }


  quizCard(quiz) {
    return (
      <div key={quiz.id}>

        <div className="card ">
          <div className="row no-gutters">

            <div className="col">
              <div className="card-body">
                <h2>
                  
                  
                  <Link to={"/quiz/" + quiz.id}>{quiz.name}</Link>
                </h2>
                <p className="text-muted">
                  Ajouté le {quiz.created} par <b>{quiz.user.firstname+" "+quiz.user.lastname}</b>
                </p>
                <p className="text-muted">{quiz.description}</p>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }

  render() {
      const quizzesBySubject = this.props.quizzes.filter(quiz => quiz.subject.id === this.props.subjectId)
       return( quizzesBySubject.map(quiz => this.quizCard(quiz)))
      }
    }


QuizList.propTypes = {
  quizzes: PropTypes.array.isRequired,
  getAvailableQuizzes: PropTypes.func.isRequired,
  
};

const mapStateToProps = state => ({
  quizzes: state.quiz.quizzes,
});

export default connect(
  mapStateToProps,
  { getAvailableQuizzes }
)(QuizList);
