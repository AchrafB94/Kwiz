import React from "react";


import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getQuizzes } from "../redux/actions/quizActions";
import { Link } from "react-router-dom";
class QuizList extends React.Component {
  componentWillMount() {
   this.props.getQuizzes();
  }

  quizCard(quiz) {
    var desc = quiz.description
    var trimmedDesc = desc.substring(0, 200);

    return (
      <div key={quiz.id}>
        <div className="card ">
          <div className="row no-gutters">
            <div className="col-auto">
              <Link to={"/quiz/" + quiz.id}>
                <img
                  src={require(`../../images/${quiz.subject.image}.png`)}
                  alt=""
                  height="100"
                />
              </Link>
            </div>

            <div className="col">
              <div className="card-block">
                <h4>
                  {" "}
                  <Link to={"/quiz/" + quiz.id}>
                    <span className="badge badge-info">
                      {quiz.subject.name}
                    </span>
                  </Link>{" "}
                  <Link to={"/quiz/" + quiz.id}>
                    <span className="badge badge-secondary">
                      Niveau {quiz.level.name}
                    </span>
                  </Link>{" "}
                  <Link to={"/quiz/" + quiz.id}>{quiz.name}</Link>
                </h4>
                <p className="text-muted">
                  Ajouté le {quiz.created} par <b>Mr {quiz.user.firstname} {quiz.user.lastname}</b> {quiz.description ? " - "+trimmedDesc+"..." : ""}
                </p>
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
          <h2>
            {this.props.quizzes.length} nouveaux challenges sont disponibles!{" "}
          </h2>
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
