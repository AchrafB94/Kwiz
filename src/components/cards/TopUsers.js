import React from 'react';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsersThisWeek } from "../redux/actions/scoreActions";

class TopUsers extends React.Component {


  componentWillMount() {
    this.props.getUsersThisWeek()
  }


  render() {

    const top = this.props.popularUsers.slice(0,this.props.limit-1)

  
    return(
      <div class="card bg-light mb-3">
      <div class="card-body">
        <h4 class="card-title">Top {this.props.limit} élèves cette semaine</h4>
        <p class="card-text">
        <table class="table table-striped table-borderless">

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

  TopUsers.propTypes = {
    popularUsers: PropTypes.array.isRequired,
    getUsersThisWeek: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    popularUsers: state.score.popularUsers
  });
  
  export default connect(
    mapStateToProps,
    { getUsersThisWeek }
  )(TopUsers);
  