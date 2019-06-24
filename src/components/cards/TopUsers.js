import React from 'react';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsersThisWeek } from "../../redux/actions/scoreActions";

import { Link } from "react-router-dom"
class TopUsers extends React.Component {


  componentDidMount() {
    this.props.getUsersThisWeek()
  }


  render() {


  
    return(
      <div className="card bg-light mb-3">
      <div className="card-body">
        <h5 className="card-title">Top {this.props.limit} élèves cette semaine</h5>
        <div className="card-text">
        <table className="table table-striped table-borderless">

  <tbody>
    {this.props.popularUsers.map((score,index) => {return <tr key={index}>
      <th scope="row">#{index + 1}</th>
      <td><Link to={"/user/"+score.user.id} >{score.user.firstname+" "+score.user.lastname}</Link></td>
      <td>{score.total_score} points</td>
    </tr>})}
    
  </tbody>
</table>
        
        </div>
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
  