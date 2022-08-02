import React from "react";
import "./Admin.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNewScores } from "../../redux/actions/scoreActions";
import gold from "../../images/gold.png";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";
import { Link } from "react-router-dom";
import moment from "moment";

class AdminActivity extends React.Component {
  componentDidMount() {
    this.props.getNewScores();
  }

  medalImage(number) {
    switch (number) {
      case 100:
        return gold;
      case 10:
        return silver;
      case 1:
        return bronze;
      default:
        return null;
    }
  }

  medalName(number) {
    switch (number) {
      case 100:
        return "une medaille d'or";
      case 10:
        return "une medaille d'argent";
      case 1:
        return "une medaille de bronze";
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="card bg-light">
        <div className="card-header">
          {" "}
          <h2>Activité des joueurs</h2>
        </div>
        <div className="card-text">
          <div className="activity-feed">
            {this.props.scores.map((score) => (
              <div key={score.id} className="feed-item">
                <div className="date">
                  {score.level
                    ? "Niveau " + score.level.name
                    : "Niveau non défini"}{" "}
                  - {score.subject ? score.subject.name : "Matiére non défini"}{" "}
                  -{" "}
                  {score.quiz ? (
                    <Link to={"/quiz/" + score.quiz.id}>{score.quiz.name}</Link>
                  ) : (
                    "Quiz non défini"
                  )}
                  - {moment(score.createdAt).format("D/MM/Y HH:mm")}
                </div>
                {score.medal > 0 ? (
                  <div className="text">
                    {" "}
                    <b>{score.user.firstname + " " + score.user.lastname} </b>a
                    remporté{" "}
                    <img
                      src={this.medalImage(score.medal)}
                      alt=""
                      height="25"
                    />{" "}
                    <b>{this.medalName(score.medal)}</b> avec un score de{" "}
                    {score.score} points en {score.time} secondes.
                  </div>
                ) : (
                  <div className="text">
                    <b>{score.user.firstname + " " + score.user.lastname} </b>a
                    obtenu {score.score} points en {score.time} secondes.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="card-footer">
          {" "}
          <Link to="/admin/scores">
            <button className="float-right btn btn-info">
              Afficher plus...
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

AdminActivity.propTypes = {
  scores: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  scores: state.score.scores,
});

export default connect(mapStateToProps, {
  getNewScores,
})(AdminActivity);
