import React from 'react';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSchoolsBySubject } from "../../redux/actions/scoreActions";

import { Link } from "react-router-dom"
class TopSchools extends React.Component {


  componentDidMount() {
    this.props.getSchoolsBySubject(this.props.subjectId)
  }

    
  componentDidUpdate(prevProps) {
    if (this.props.subjectId !== prevProps.subjectId) {
      this.props.getSchoolsBySubject(this.props.subjectId)
      
    }
  }

  render() {

    const top = this.props.schoolsBySubject.slice(0,this.props.limit)

  
    return(
      <div className="card bg-light mb-3">
      <div className="card-body">
        <h5 className="card-title">Top {this.props.limit} etablissments en {this.props.name}</h5>
        <div className="card-text">
        <table className="table table-striped">

  <tbody>
    {top.map((score,index) => {return <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{score.school ? <Link to={"/school/"+score.school.id} >{score.school.name}</Link> : "" }</td>
      <td>{score.total_score} points</td>
    </tr>})}
    
  </tbody>
</table>
        
        </div>
      </div>
    </div>
    )

  }}

  TopSchools.propTypes = {
    schoolsBySubject: PropTypes.array.isRequired,
    getSchoolsBySubject: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    schoolsBySubject: state.score.schoolsBySubject
  });
  
  export default connect(
    mapStateToProps,
    { getSchoolsBySubject }
  )(TopSchools);
  