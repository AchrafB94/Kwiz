import React from "react";
import "./Admin.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPopularSubjects } from "../../redux/actions/scoreActions";
import { Link } from "react-router-dom";

class AdminTopSubjecs extends React.Component {
  componentDidMount() {
    this.props.getPopularSubjects();
  }

  render() {
    return (
      <div className="card bg-light">
        <div className="card-header">
          Les matiéres les plus jouées{" "}
          <Link to="/admin/subjects">
            <button className="float-right btn-sm btn-info">
              Toutes les matiéres
            </button>
          </Link>
        </div>
        <div className="card-text">
          <ul className="list-group list-group-hover">
            {this.props.popularSubjects.map((score, index) => {
              if (score.subject)
                return (
                  <li
                    key={score.played}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    #{index + 1} - {score.subject.name}
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

AdminTopSubjecs.propTypes = {
  popularSubjects: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  popularSubjects: state.score.popularSubjects,
});

export default connect(mapStateToProps, {
  getPopularSubjects,
})(AdminTopSubjecs);
