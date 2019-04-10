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
import { Link } from "react-router-dom";

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
              <Link to={"/quiz/" + quiz.id}>
                <img
                  src={this.showImage(quiz.subject.id)}
                  className="img-fluid"
                  alt=""
                  height="60"
                  width="60"
                />
              </Link>
            </div>

            <div className="col">
              <div className="card-block">
                <h5>
                  {" "}
                  <Link to={"/quiz/" + quiz.id}>
                    <span className="badge badge-info">
                      {quiz.subject.name}
                    </span>
                  </Link>{" "}
                  <Link to={"/quiz" + quiz.id}>
                    <span className="badge badge-secondary">
                      Niveau {quiz.level.name}
                    </span>
                  </Link>{" "}
                  <Link to={"/quiz/" + quiz.id}>{quiz.name}</Link>
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
      return (
        <div>
          <h5>
            {this.props.quizzes.length} nouveaux challenges sont disponibles!{" "}
          </h5>
          {this.props.quizzes.map(quiz => this.quizCard(quiz))}
        </div>
      );
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