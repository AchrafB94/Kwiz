import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { suggestQuizzes } from "../redux/actions/quizActions";

class QuizList extends React.Component {
  componentWillMount() {
   this.props.suggestQuizzes(this.props.subjectId, this.props.currentId);
  }


  quizCard(quiz) {
    return (
      <div key={quiz.id}>
        <div className="card ">
          <div className="row no-gutters">

            <div className="col">
              <div className="card-block">
                <h5>
                  <a href={"/quiz" + quiz.id}>
                    <span className="badge badge-secondary">
                      Niveau {quiz.level.name}
                    </span>
                  </a>{" "}
                  <a href={"/quiz/" + quiz.id}>{quiz.name}</a>
                </h5>
                <small className="text-muted">
                  Ajouté le {quiz.created} par <b>Mr. {quiz.user.firstname+" "+quiz.user.lastname}</b> 
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    //const quizSuggestions = this.props.quizzes.filter(quiz => quiz.subject.id === this.props.subjectId &&  quiz.id !== this.props.currentId).slice(0,4);
        return (this.props.quizzesSuggestions.map(quiz => this.quizCard(quiz)))
    } 
  }


QuizList.propTypes = {
  quizzesSuggestions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  quizzesSuggestions: state.quiz.quizzesSuggestions
});

export default connect(
  mapStateToProps,
  { suggestQuizzes  }
)(QuizList);
