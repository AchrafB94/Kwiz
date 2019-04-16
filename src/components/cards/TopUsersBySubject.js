import React from 'react';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsersBySubject } from "../redux/actions/scoreActions";

class TopSchools extends React.Component {


  componentWillMount() {
    this.props.getUsersBySubject(this.props.subjectId)
  }


  render() {

    const top = this.props.usersBySubject.slice(0,this.props.limit)

  
    return(
      <div class="card bg-light mb-3">
      <div class="card-body">
        <h5 class="card-title">Top {this.props.limit} etablissments en {this.props.name}</h5>
        <p class="card-text">
        <table class="table table-striped">

  <tbody>
    {top.map((score,index) => {return <tr>
      <th scope="row">{index + 1}</th>
      <td>{score.user.firstname+" "+score.user.lastname}</td>
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
    usersBySubject: PropTypes.array.isRequired,
    getUsersBySubject: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    usersBySubject: state.score.usersBySubject
  });
  
  export default connect(
    mapStateToProps,
    { getUsersBySubject }
  )(TopSchools);
  