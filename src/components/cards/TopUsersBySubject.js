import React from 'react';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsersBySubject } from "../../redux/actions/scoreActions";

class TopSchools extends React.Component {


  componentDidMount() {
    this.props.getUsersBySubject(this.props.subjectId)
  }

  componentDidUpdate(prevProps) {
    if(this.props.subjectId !== prevProps.subjectId) {
    this.props.getUsersBySubject(this.props.subjectId)
    }
  }


  render() {

    const top = this.props.usersBySubject.slice(0,this.props.limit)

  
    return(
      <div className="card bg-light mb-3">
      <div className="card-body">
        <h5 className="card-title">Top {this.props.limit} élèves en {this.props.name}</h5>
        <div className="card-text">
        <table className="table table-striped">

  <tbody>
    {top.map((score,index) => {return <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{score.user.firstname+" "+score.user.lastname}</td>
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
  