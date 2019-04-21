import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getUsersByScore,
  getUsersByMedals,
  getUsersByLevel,
  getUsersBySubject,
  getSchoolsByScore,
  getSchoolsBySubject,
  getSchoolsByMedals,
  getSchoolsByLevel,
  getPopularSubjects
} from "../../redux/actions/scoreActions";
import {
  getQuizzesCount,
  getQuestionsCount,
  topQuizzesByLevel,
  topQuizzesBySubject,
  topQuizzesByUsers,
  getQuizPlayedSum
} from "../../redux/actions/quizActions";

import { usersCount } from "../../redux/actions/userActions";
import gold from "../../images/gold.png";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";
import DonutChart from "react-donut-chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopSchools from "../cards/TopSchools";
import TopUsers from "../cards/TopUsers";

class Stats extends React.Component {
  constructor() {
    super();
    this.state = {
      levelId: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getUsersByScore();
    this.props.getUsersByMedals();
    this.props.getSchoolsByScore();
    this.props.getSchoolsByMedals();
    this.props.getPopularSubjects();
    this.props.getQuizzesCount();
    this.props.getQuestionsCount();
    this.props.topQuizzesByLevel();
    this.props.topQuizzesBySubject();
    this.props.topQuizzesByUsers();
    this.props.usersCount();
    this.props.getQuizPlayedSum();

  }
  

  onChange(e) {
    
    this.setState({levelId: e.target.value });
  }

  
  onSubmit() {
    
    //this.props.getUsersByLevel(this.state.levelId);
  }

  render() {
    const quizzesBySubjectData = [];
    this.props.quizzesBySubject.map(quiz =>
      quizzesBySubjectData.push({
        label: quiz.subject.name,
        value: quiz.subjectsCount
      })
    );

    const quizzesByLevelData = [];
    this.props.quizzesByLevel.map(quiz =>
      quizzesByLevelData.push({
        label: quiz.level.name,
        value: quiz.levelCount
      })
    );
    return (
      <div className="container-fluid mt-5">
        <h1 className="display-5 mb-5">
          <span class="badge badge-primary">
            {" "}
            <FontAwesomeIcon icon="book" size="lg" /> ? Matiéres
          </span>{" "}
          <span class="badge badge-secondary">
            {" "}
            <FontAwesomeIcon icon="clipboard-list" size="lg" />{" "}
            {this.props.quizzesCount} Quizz
          </span>{" "}
          <span class="badge badge-success">
            {" "}
            <FontAwesomeIcon icon="question-circle" size="lg" />{" "}
            {this.props.questionsCount} Questions
          </span>{" "}
          <span class="badge badge-danger">
            {" "}
            <FontAwesomeIcon icon="user" size="lg" /> {this.props.count}{" "}
            Utilisateurs
          </span>{" "}
          <span class="badge badge-warning">
            {" "}
            <FontAwesomeIcon icon="school" size="lg" /> ? Etablissements
          </span>{" "}
          <span class="badge badge-info">
            {" "}
            <FontAwesomeIcon icon="check" size="lg" />{" "}
            {this.props.quizzesSumPlayed} Participations
          </span>{" "}
        </h1>


        <div className="row">
          <div className="col-9 col-12-sm bg-light ">
            <Tabs defaultActiveKey="scores">
              <Tab eventKey="scores" title="Top Scores">
                <table className="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Etablissement</th>
                      <th scope="col">Score total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.usersByScore.map((score, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {score.user.firstname + " " + score.user.lastname}
                          </td>
                          <td>{score.school.name}</td>
                          <td>{score.total_score}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Tab>
              <Tab eventKey="levels" title="Top Scores (Par niveau)">
                <form class="form-group mt-5" onSubmit={this.onSubmit()}>
                  <label for="levelSelect">Veuillez choisir le niveau</label>
                  <select
                    class="form-control"
                    id="levelSelect"
                    name="levelId"
                    defaultValue={this.state.levelId}
                    onChange={this.onChange}
                  >
                  <option selected>Choisir</option>
                    <option value="1">Niveau Primaire</option>
                    <option value="2">Niveau Secondaire</option>
                    <option value="3">Niveau Universitaire</option>
                    <option value="4">Tout Publique</option>
                  </select>
                </form>
                <table className="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Etablissement</th>
                      <th scope="col">Score total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.usersByLevel.map((score, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {score.user.firstname + " " + score.user.lastname}
                          </td>
                          <td>{score.school.name}</td>
                          <td>{score.total_score}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Tab>
              <Tab eventKey="medals" title="Classement des medailles">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Etablissement</th>
                      <th scope="col">
                        {" "}
                        <img src={gold} alt="" height="40" />
                      </th>
                      <th scope="col">
                        {" "}
                        <img src={silver} alt="" height="40" />
                      </th>
                      <th scope="col">
                        {" "}
                        <img src={bronze} alt="" height="40" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.usersByMedals.map((score, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {score.user.firstname + " " + score.user.lastname}
                          </td>
                          <td>{score.school.name}</td>
                          <td>{Math.round(score.total_medals / 100)}</td>
                          <td>{Math.round(score.total_medals / 10) % 10}</td>
                          <td>{(Math.round(score.total_medals) % 100) % 10}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Tab>
              <Tab eventKey="topschools" title="Top Scores (Etablissments)">
                <table className="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Score total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.schoolsByScore.map((score, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{score.school.name}</td>
                          <td>{score.total_score}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Tab>
              <Tab
                eventKey="medalsschools"
                title="Classement des medailles (Etablissements)"
              >
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nom</th>
                      <th scope="col">
                        {" "}
                        <img src={gold} alt="" height="40" />
                      </th>
                      <th scope="col">
                        {" "}
                        <img src={silver} alt="" height="40" />
                      </th>
                      <th scope="col">
                        {" "}
                        <img src={bronze} alt="" height="40" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.schoolsByMedals.map((score, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{score.school.name}</td>
                          <td>{Math.round(score.total_medals / 100)}</td>
                          <td>{Math.round(score.total_medals / 10) % 10}</td>
                          <td>{(Math.round(score.total_medals) % 100) % 10}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Tab>
            </Tabs>
          </div>

          <div className="col-3  col-12-sm">
            <div className="card bg-light mb-4">
              <div className="card-header">Top Matiéres</div>
              <div className="card-text">
                <ul class="list-group list-group-hover">
                  {this.props.popularSubjects.map(score => {
                    return (
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        {score.subject.name}
                        <span class="badge badge-primary badge-pill">
                          {score.played}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <TopSchools limit="25" />
            <TopUsers limit="25" />
          </div>
        </div>
        <hr />
        <div className="row" style={{ justifyContent: "space-around" }}>
          <div class="card border-info mb-3">
            <div class="card-header">Distribution des Quizz</div>
            <div class="card-body">
              <h4 class="card-title">Selon les Matiéres</h4>
              <p class="card-text">
                <DonutChart data={quizzesBySubjectData} />
              </p>
            </div>
          </div>

          <div class="card border-info mb-3">
            <div class="card-header">Distribution des Quizz</div>
            <div class="card-body">
              <h4 class="card-title">Selon les Niveaux</h4>
              <p class="card-text">
                <DonutChart data={quizzesByLevelData} />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Stats.propTypes = {
  usersByScore: PropTypes.array.isRequired,
  usersByMedals: PropTypes.array.isRequired,
  usersByLevel: PropTypes.array.isRequired,
  usersBySubject: PropTypes.array.isRequired,

  schoolsByLevel: PropTypes.array.isRequired,
  schoolsByMedals: PropTypes.array.isRequired,
  schoolsByScore: PropTypes.array.isRequired,
  schoolsBySubject: PropTypes.array.isRequired,

  popularSubjects: PropTypes.array.isRequired,

  quizzesCount: PropTypes.number.isRequired,
  questionsCount: PropTypes.number.isRequired,

  quizzesByLevel: PropTypes.array.isRequired,
  quizzesBySubject: PropTypes.array.isRequired,
  quizzesByUsers: PropTypes.array.isRequired,
  quizzesSumPlayed: PropTypes.number.isRequired,

  count: PropTypes.number.isRequired,

  getUsersByMedals: PropTypes.func.isRequired,
  getUsersByScore: PropTypes.func.isRequired,
  getUsersByLevel: PropTypes.func.isRequired,
  getUsersBySubject: PropTypes.func.isRequired,

  getSchoolsByScore: PropTypes.func.isRequired,
  getSchoolsBySubject: PropTypes.func.isRequired,
  getSchoolsByMedals: PropTypes.func.isRequired,
  getSchoolsByLevel: PropTypes.func.isRequired,

  getPopularSubjects: PropTypes.func.isRequired,

  getQuizzesCount: PropTypes.func.isRequired,
  getQuestionsCount: PropTypes.func.isRequired,

  topQuizzesByLevel: PropTypes.func.isRequired,
  topQuizzesBySubject: PropTypes.func.isRequired,
  topQuizzesByUsers: PropTypes.func.isRequired,
  getQuizPlayedSum: PropTypes.func.isRequired,
  usersCount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  usersByScore: state.score.usersByScore,
  usersByMedals: state.score.usersByMedals,
  schoolsByLevel: state.score.schoolsByLevel,
  schoolsByMedals: state.score.schoolsByMedals,
  schoolsByScore: state.score.schoolsByScore,
  schoolsBySubject: state.score.schoolsBySubject,
  usersByLevel: state.score.usersByLevel,
  usersBySubject: state.score.usersBySubject,
  popularSubjects: state.score.popularSubjects,
  quizzesSumPlayed: state.quiz.quizzesSumPlayed,

  quizzesCount: state.quiz.quizzesCount,
  questionsCount: state.quiz.questionsCount,
  quizzesByLevel: state.quiz.quizzesByLevel,
  quizzesBySubject: state.quiz.quizzesBySubject,
  quizzesByUsers: state.quiz.quizzesByUsers,
  count: state.user.count
});

export default connect(
  mapStateToProps,
  {
    getUsersByScore,
    getUsersByMedals,
    getUsersByLevel,
    getUsersBySubject,
    getSchoolsByScore,
    getSchoolsBySubject,
    getSchoolsByMedals,
    getSchoolsByLevel,
    getPopularSubjects,
    getQuizzesCount,
    getQuestionsCount,
    topQuizzesByLevel,
    topQuizzesBySubject,
    topQuizzesByUsers,
    getQuizPlayedSum,
    usersCount
  }
)(Stats);
