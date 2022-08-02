import React from "react";
import "./Admin.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPopularQuizzes } from "../../redux/actions/scoreActions";
import { Link } from "react-router-dom";

class AdminTopQuizzes extends React.Component {
  componentDidMount() {
    this.props.getPopularQuizzes();
  }

  render() {
    return (
      <div className="card bg-light">
        <div className="card-header">
          Les quizz les plus jouées{" "}
          <Link to="/admin/quiz">
            <button className="float-right btn-sm btn-info">
              Tous les quiz
            </button>
          </Link>
        </div>
        <div className="card-text">
          <ul className="list-group list-group-hover">
            {this.props.popularQuizzes.map((score, index) => {
              if (score.quiz)
                return (
                  <li
                    key={score.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    #{index + 1} - {score.quiz.name}
                    <span className="badge badge-primary badge-pill">
                      {score.played}
                    </span>
                  </li>
                );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

AdminTopQuizzes.propTypes = {
  popularQuizzes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  popularQuizzes: state.score.popularQuizzes,
});

export default connect(mapStateToProps, {
  getPopularQuizzes,
})(AdminTopQuizzes);
