import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getQuizzes } from "../redux/actions/quizActions";
import francais from "../../images/1.png";
import maths from "../../images/2.png";
import physiques from "../../images/3.png";
import svt from "../../images/4.png";
import env from "../../images/5.png";
import histoire from "../../images/6.png";
import geographie from "../../images/7.png";
import anglais from "../../images/8.png";
import informatique from "../../images/9.png";
import chimie from "../../images/10.png";

class QuizList extends React.Component {
  componentWillMount() {
    this.props.getQuizzes();
  }

  showImage(param) {
    switch (param) {
      case 1:
        return francais;
      case 2:
        return maths;
      case 3:
        return physiques;
      case 4:
        return svt;
      case 5:
        return env;
      case 6:
        return histoire;
      case 7:
        return geographie;
      case 8:
        return anglais;
      case 9:
        return informatique;
      case 10:
        return chimie;
      default:
        return francais;
    }
  }

  quizCard(quiz) {
    return (
      <div key={quiz.id}>
        <div className="card ">
          <div className="row no-gutters">
            <div className="col-auto">
              <a href={"/quiz/" + quiz.id}>
                <img
                  src={this.showImage(quiz.subject.id)}
                  className="img-fluid"
                  alt=""
                  height="60"
                  width="60"
                />
              </a>
            </div>

            <div className="col">
              <div className="card-block">
                <h5>
                  {" "}
                  <a href={"/quiz/" + quiz.id}>
                    <span className="badge badge-info">
                      {quiz.subject.name}
                    </span>
                  </a>{" "}
                  <a href={"/quiz" + quiz.id}>
                    <span className="badge badge-secondary">
                      Niveau {quiz.level.name}
                    </span>
                  </a>{" "}
                  <a href={"/quiz/" + quiz.id}>{quiz.name}</a>
                </h5>
                <small className="text-muted">
                  Ajouté par <b>Mr. Contributeur</b> le {quiz.created}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const quizSuggestions = this.props.quizzes.filter(quiz => quiz.subject.link === this.props.subjectLink &&  quiz.id !== this.props.currentId);
        return (quizSuggestions.map(quiz => this.quizCard(quiz)))
    } 
  }


QuizList.propTypes = {
  quizzes: PropTypes.array.isRequired,
  getQuizzes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quizzes: state.quiz.quizzes
});

export default connect(
  mapStateToProps,
  { getQuizzes }
)(QuizList);
