import React from 'react';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSchoolsBySubject } from "../redux/actions/scoreActions";

class TopSchools extends React.Component {


  componentWillMount() {
    this.props.getSchoolsBySubject(this.props.subjectId)
  }


  render() {

    const top = this.props.schoolsBySubject.slice(0,this.props.limit)

  
    return(
      <div class="card bg-light mb-3">
      <div class="card-body">
        <h5 class="card-title">Top {this.props.limit} etablissments en {this.props.name}</h5>
        <p class="card-text">
        <table class="table table-striped">

  <tbody>
    {top.map((score,index) => {return <tr>
      <th scope="row">{index + 1}</th>
      <td>{score.school.name}</td>
      <td>{score.total_score} points</td>
    </tr>})}
    
  </tbody>
</table>
        
        </p>
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
  