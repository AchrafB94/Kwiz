import React from "react";
import "./Admin.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getScores } from "../../redux/actions/scoreActions";
import gold from "../../images/gold.png";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";
import { Link } from "react-router-dom";
import {getSubjects} from "../../redux/actions/subjectActions"

import {filterScores} from "../../redux/actions/scoreActions"

class AdminStats extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            subjectId: 1,
            levelId: 1,
        }
        this.onChange = this.onChange.bind(this);
        this.onSumbit = this.onSumbit.bind(this);
    }


  componentDidMount() {
    this.props.getScores();
    this.props.getSubjects();
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
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSumbit(e) {
    e.preventDefault()

    const {levelId, subjectId} = this.state
    this.props.filterScores(levelId, subjectId)

  }

  render() {
    return (
      <div className="container">
        <div className="card bg-light">
          <div className="card-header">
            {" "}
            <form onSubmit={this.onSumbit} className="form-inline float-right">

        <label htmlFor="levelId" >
                  Niveau
                  <select
                    className="form-control"
                    name="levelId"
                    defaultValue={this.state.levelId}
                    onChange={this.onChange}
                  >
                    <option value="1">Primaire</option>
                    <option value="2">Secondaire</option>
                    <option value="3">Universitaire</option>
                    <option value="4">Tout Publique</option>
                  </select>
                </label>
        <label htmlFor="subjectId">Matiére

        <select className="form-control" name="subjectId" defaultValue={this.state.subjectId} onChange={this.onChange} >
        <option value="all">Toutes les matiéres</option>
        {this.props.subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
        </select>
        
        </label>
        
      
      
        <button type="submit" className="btn btn-info">Filtrer</button>
 
 </form>
            
            <h2>Activité des joueurs</h2>
          </div>
          <div className="card-text">
            <div className="activity-feed">
            {this.props.filteredScores.map(score => (
                <div key={score.id} className="feed-item">
                  <div className="date">
                  Niveau {score.level.name} - {score.subject.name} - <Link to={"/quiz/" + score.quiz.id}>{score.quiz.name}</Link>{" "}
                    - {score.createdAt}
                  </div>
                  {score.medal > 0 ? (
                    <div className="text">
                      {" "}
                      <b><Link to={"/user/"+score.user.id} >{score.user.firstname + " " + score.user.lastname}</Link> </b>
                      a remporté{" "}
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
                      <b><Link to={"/user/"+score.user.id} >{score.user.firstname + " " + score.user.lastname} </Link></b>
                      a obtenu {score.score} points en {score.time} secondes.
                    </div>
                  )}
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminStats.propTypes = {
  filteredScores: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  filteredScores: state.score.filteredScores,
  subjects: state.subjects.subjects
});

export default connect(
  mapStateToProps,
  { getScores, getSubjects, filterScores }
)(AdminStats);
