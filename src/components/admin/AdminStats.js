import React from "react";
import "./Admin.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AdminTop from "./AdminTop";
import { getPopularSubjects, getNewScores } from "../../redux/actions/scoreActions";
import { topQuizzesByLevel,topQuizzesBySubject} from "../../redux/actions/quizActions";
import {getNewQuizzes} from "../../redux/actions/quizActions"
import { getNewMembers } from "../../redux/actions/userActions"
import DonutChart from "react-donut-chart";
import defaultPhoto from '../../images/default.png'
import gold from "../../images/gold.png";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";
import {Link} from 'react-router-dom'






class AdminStats extends React.Component {
  componentDidMount() {
    this.props.getPopularSubjects();
    this.props.topQuizzesByLevel();
    this.props.topQuizzesBySubject();
    this.props.getNewMembers()
    this.props.getNewScores()
    this.props.getNewQuizzes()
    
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
      <div className="container-fluid">
        <div className="row">
        <div className="col-6">
        <AdminTop />
        <div className="card bg-light">
        <div className="card-header"> <h2>Activité des joueurs</h2></div>
              <div className="card-text">
            
<div className="activity-feed">
{this.props.scores.map(score =>
  <div key={score.id} className="feed-item">
  
    <div className="date">Niveau {score.level.name} - {score.subject.name} - <Link to={"/quiz/"+score.quiz.id} >{score.quiz.name}</Link> - {score.createdAt}</div>
    {score.medal > 0 ? <div className="text"> <b>{score.user.firstname+" "+score.user.lastname} </b>a remporté <img src={this.medalImage(score.medal)} alt="" height="25" /> <b>{this.medalName(score.medal)}</b> avec un score de {score.score} points en {score.time} secondes.</div>
    : <div className="text"><b>{score.user.firstname+" "+score.user.lastname} </b>a obtenu {score.score} points en {score.time} secondes.</div> }
  </div>)}
</div>
              
              </div>
              <div className="card-footer"> <Link to="/admin-scores"><button className="float-right btn btn-info">Afficher plus...</button></Link></div>
            </div>
        </div>
        
        <div className="col-3">
      
          <div className="card bg-light">
              <div className="card-header">Les matiéres les plus jouées <Link to="/admin-subjects"><button className="float-right btn-sm btn-info">Toutes les matiéres</button></Link></div>
              <div className="card-text">
                <ul className="list-group list-group-hover">
                  {this.props.popularSubjects.map((score,index) => {
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
            <br />
            <div className="card bg-light">
              <div className="card-header">Les quiz les plus populaires <Link to="/admin-quiz"><button className="float-right btn-sm btn-info">Tous les Quizz</button></Link></div>
              <div className="card-text">
              <div className="activity-feed">
              {this.props.quizzes.map(quiz => <div className="feed-item" key={quiz.id}>
              <div className="date"><b>{quiz.name}</b> - {quiz.createdAt}</div>
              <div className="text"> 
              
              <span className="badge badge-secondary">Niveau {quiz.level.name}</span>{" "}<span className="badge badge-info">{quiz.subject.name}</span>
              {" "}{quiz.user ? <span className="small">Par {quiz.user.firstname+" "+quiz.user.lastname}</span> : ""}
              </div>
              
              </div>)}
               </div>
              </div>
            </div>
          </div>
          <div className="col-3">
          <div className="card bg-light">
              <div className="card-header">Nouveaux membres</div>
              <div className="card-text">
              <table className="table table-hover">
              <tbody>
              {this.props.users.map(user => <tr key={user.id}>
              <td>{user.image ? <img src={"http://localhost/kwiz/public/images/"+user.image} height="25" width="25" className="thumbnail" alt="" /> 
                : <img src={defaultPhoto} height="25" width="25" className="thumbnail" alt="" />}</td>
                <td><Link to={"/user/"+user.id}>{user.firstname+" "+user.lastname}</Link></td>
                <td>{user.school ? <Link to={"/school/"+user.school.id}>{user.school ? user.school.name : ''}</Link> : " "}</td>
                </tr>
                )}</tbody>
               </table>
              </div>
            </div>
          </div>
          </div>
        <hr />
        
        <div className="container-fluid card border-info">
            <div className="card-body">
              <div className="card-text">
              <div className="row">
              <div className="col-6">
              <h3>Distribution des Quizz selon les matiéres</h3>
                <DonutChart data={quizzesBySubjectData} width={500}   />
               
                </div>
                <div className="col-6">
                <h3>Distribution des Quizz selon les niveaux</h3>
                <DonutChart data={quizzesByLevelData}  width={500}  />
                </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

AdminStats.propTypes = {
    popularSubjects: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    scores: PropTypes.array.isRequired,
    quizzes: PropTypes.array.isRequired
  
};

const mapStateToProps = state => ({
    popularSubjects: state.score.popularSubjects,
    quizzesBySubject: state.quiz.quizzesBySubject,
    quizzesByLevel: state.quiz.quizzesByLevel,
    users: state.user.users,
    scores: state.score.scores,
    quizzes: state.quiz.quizzes
  
});

export default connect(
  mapStateToProps,
  {
    getPopularSubjects,
    topQuizzesByLevel,
    topQuizzesBySubject,
    getNewMembers,
    getNewScores,
    getNewQuizzes
  }
)(AdminStats);
