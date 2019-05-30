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
import { getLevels } from "../../redux/actions/levelActions";
import {filterScores} from "../../redux/actions/scoreActions"

class AdminStats extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            subjectId: 'all',
            levelId: 1,
        }
        this.onChange = this.onChange.bind(this);
        this.onSumbit = this.onSumbit.bind(this);
    }


  componentDidMount() {
    this.props.getScores();
    this.props.getSubjects();
    this.props.getLevels()
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
      <div className="container-fluid">
        <div className="card bg-light">
          <div className="card-header">
            {" "}
            <form onSubmit={this.onSumbit} className="form-inline float-right">
  <div class="form-row">
    <div class="col">
    <label htmlFor="levelId">
                  Niveau
                  <select className="form-control" 
                       
                          name="levelId"
                          defaultValue={this.state.levelId}
                          onChange={this.handleChange}>
   {this.props.levels.map(level => <option key={level.id} value={level.id}>{level.name}</option>)}
  </select>
                </label>
    </div>
    <div class="col">
    <label htmlFor="subjectId">Matiére

<select className="form-control" name="subjectId" defaultValue={this.state.subjectId} onChange={this.onChange} >
<option value="all">Toutes les matiéres</option>
{this.props.subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
</select>

</label>
    </div>
    <div className="col">
    <button type="submit" className="btn btn-info">Obtenir des scores</button>
    </div>
  </div>
</form>
           
     
        
      
      
     
            
            <h2>Scores</h2>
          </div>
          <div className="card-text">
              <table className="table table-striped">
                <tr>
                <th>Nom</th>
                <th>Quiz</th>
                <th>Matiére</th>
                <th>Niveau</th>
                <th>Recompense</th>
                <th>Points</th>
                <th>Pourcentage</th>
                <th>Temps (secondes)</th>
                <th>Date</th>

                </tr>
                
     
            {this.props.filteredScores.map(score => (

                    <tr key={score.id}>
                        <td><Link to={"/user/"+score.user.id} >{score.user.firstname + " " + score.user.lastname}</Link> </td>
                        <td><Link to={"/quiz/" + score.quiz.id}>{score.quiz.name}</Link></td>
                        <td>{score.subject.name}</td>
                        <td>{score.level.name}</td>
                        <td>{score.medal > 0 ? <div>  <img
                        src={this.medalImage(score.medal)}
                        alt=""
                        height="25"
                      />  <b>{this.medalName(score.medal)}</b></div> : " " } </td>
                        <td>{score.score}</td>
                        <td>{score.percentage}%</td>
                        <td>{score.time}</td>
                        <td>{score.createdAt}</td>


                    </tr>

              ))}
                       </table>
            </div>
          </div>
        </div>
    );
  }
}

AdminStats.propTypes = {
  filteredScores: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  levels: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  filteredScores: state.score.filteredScores,
  subjects: state.subjects.subjects,
  levels: state.levels.levels
});

export default connect(
  mapStateToProps,
  { getScores, getSubjects, filterScores, getLevels }
)(AdminStats);
