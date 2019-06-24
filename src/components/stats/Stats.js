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
  getPopularSubjects,
  getUserScoresByParticipations
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
import { Link } from "react-router-dom"

class Stats extends React.Component {
  constructor() {
    super();
    this.state = {
      levelId: 1
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getUsersByScore();
    this.props.getUsersByMedals();
    this.props.getSchoolsByScore();
    this.props.getSchoolsByMedals();
    this.props.getUserScoresByParticipations();
    
    

  }

  onChange(e) {
    this.setState({levelId: e.target.value})
    
  }

  render() {
   
    return (
      <div className="container-fluid mt-4">
       

        <div className="card row bg-light">
          <div className="col-12 col-12-sm  ">
            <Tabs fill  defaultActiveKey="medals">
           
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
                            <Link to={"/user/"+score.user.id} >{score.user.firstname + " " + score.user.lastname}</Link>
                          </td>
                          <td>{score.school ? <Link to={"/school/"+score.school.id} >{score.school.name}</Link> : "" }</td>
                          <td>{Math.round(score.total_medals / 100)}</td>
                          <td>{Math.round(score.total_medals / 10) % 10}</td>
                          <td>{(Math.round(score.total_medals) % 100) % 10}</td>
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
                      if(score.school) {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{score.school ? <Link to={"/school/"+score.school.id} > {score.school.name}</Link> : " "}</td>
                          <td>{Math.round(score.total_medals / 100)}</td>
                          <td>{Math.round(score.total_medals / 10) % 10}</td>
                          <td>{(Math.round(score.total_medals) % 100) % 10}</td>
                        </tr>
                      )}
                      else return (" ")
                    })}
                  </tbody>
                </table>
              </Tab>
              <Tab eventKey="scores" title="Meilleurs Scores">
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
                          <Link to={"/user/"+score.user.id} >{score.user.firstname + " " + score.user.lastname}</Link>
                          </td>
                          <td>{score.school ? <Link to={"/school/"+score.school.id} >{score.school.name}</Link> : ""}</td>
                          <td>{score.total_score}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Tab>
            
              <Tab eventKey="topschools" title="Meilleurs Scores (Etablissments)">
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
                            if(score.school) {
                      return (
                  
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{score.school ? <Link to={"/school/"+score.school.id} >{score.school.name}</Link> : " "}</td>
                          <td>{score.total_score}</td>
                        </tr>
                      )}else return (" ")
                    })}
                  </tbody>
                </table>
              </Tab>

              <Tab eventKey="participations" title="Participations">
                <table className="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Etablissement</th>
                      <th scope="col">Nombre de participations</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.props.usersByParticipations.map((score, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                          <Link to={"/user/"+score.user.id} >{score.user.firstname + " " + score.user.lastname}</Link>
                          </td>
                          <td>{score.school ? <Link to={"/school/"+score.school.id} >{score.school.name}</Link> : "" }</td>
                          <td>{score.played}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Tab>
            
            </Tabs>
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
  usersByParticipations: PropTypes.array.isRequired,

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
  usersByParticipations: state.score.usersByParticipations,
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
    getUserScoresByParticipations,
    usersCount
  }
)(Stats);
