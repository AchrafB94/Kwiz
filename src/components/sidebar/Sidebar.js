import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSubjects } from "../../redux/actions/subjectActions";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
  state = {
    selected: 2,
  };

  componentDidMount() {
    this.props.getSubjects();
  }

  checkPermission(permissions, ruleId) {
    const found = permissions.some((el) => el.ruleId === ruleId);
    if (found) return true;
    else return false;
  }

  render() {
    if (localStorage.usertoken) {
      const decoded = jwt_decode(localStorage.usertoken);

      const permissions = decoded.role.permissions;

      return (
        <div className="border-right" id="sidebar-wrapper">
          <div className="list-group  list-group-flush">
            <div>
              {this.checkPermission(permissions, 5) ? (
                <Link
                  to={"/admin/"}
                  id="admin"
                  className="list-group-item list-group-item-action"
                >
                  {" "}
                  <FontAwesomeIcon icon="cogs" /> Administration
                </Link>
              ) : (
                ""
              )}
              {this.checkPermission(permissions, 7) ? (
                <Link
                  to={"/admin/users/"}
                  id="admin"
                  className="list-group-item list-group-item-action"
                >
                  {" "}
                  <FontAwesomeIcon icon="user" /> Utilisateurs
                </Link>
              ) : (
                ""
              )}
              {this.checkPermission(permissions, 9) ? (
                <Link
                  to={"/admin/schools/"}
                  id="admin"
                  className="list-group-item list-group-item-action"
                >
                  {" "}
                  <FontAwesomeIcon icon="school" /> Etablissements
                </Link>
              ) : (
                ""
              )}
              {this.checkPermission(permissions, 1) ? (
                <Link
                  to={"/admin/levels/"}
                  id="admin"
                  className="list-group-item list-group-item-action"
                >
                  {" "}
                  <FontAwesomeIcon icon="plus" /> Niveaux
                </Link>
              ) : (
                ""
              )}
              {this.checkPermission(permissions, 2) ? (
                <Link
                  to={"/admin/subjects/"}
                  id="admin"
                  className="list-group-item list-group-item-action"
                >
                  {" "}
                  <FontAwesomeIcon icon="book" /> Matiéres
                </Link>
              ) : (
                ""
              )}
              {this.checkPermission(permissions, 3) ? (
                <Link
                  to={"/admin/quiz/"}
                  id="admin"
                  className="list-group-item list-group-item-action"
                >
                  {" "}
                  <FontAwesomeIcon icon="clipboard-list" /> Quizz
                </Link>
              ) : (
                ""
              )}
              {this.checkPermission(permissions, 6) ? (
                <Link
                  to={"/admin/scores/"}
                  id="admin"
                  className="list-group-item list-group-item-action"
                >
                  {" "}
                  <FontAwesomeIcon icon="clipboard-check" /> Scores
                </Link>
              ) : (
                ""
              )}

              {this.checkPermission(permissions, 4) ? (
                <Link
                  to={"/contrib/"}
                  id="admin"
                  className="list-group-item list-group-item-action"
                >
                  {" "}
                  <FontAwesomeIcon icon="question-circle" /> Mes Quizz
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="list-group  list-group-flush">
            {this.props.subjects.map((subject) => {
              return (
                <div key={subject.id}>
                  <Link
                    to={"/subject/" + subject.id}
                    id="subject"
                    className="list-group-item list-group-item-action"
                  >
                    {subject.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else return null;
  }
}

Sidebar.propTypes = {
  subjects: PropTypes.array.isRequired,
  getSubjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  subjects: state.subjects.subjects,
});

export default connect(mapStateToProps, { getSubjects })(Sidebar);
