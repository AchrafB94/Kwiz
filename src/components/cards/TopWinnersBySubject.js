import React from 'react';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getWinners } from "../../redux/actions/scoreActions";

import { Link } from "react-router-dom"
import gold from "../../images/gold.png";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";
class TopWinnersBySubject extends React.Component {


  componentDidMount() {
    const subject = this.props.subject
    const level = this.props.level
    this.props.getWinners(subject,level)
  }


  
  componentDidUpdate(prevProps) {
    if (this.props.subject !== prevProps.subject) {
      
    const subject = this.props.subject
    const level = this.props.level
      this.props.getWinners(subject,level)
      
    }
  }

  mapWinners(score,index) {
    return <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                          <Link to={"/user/"+score.user.id} >{score.user.firstname + " " + score.user.lastname}</Link>
                          </td>
                          <td>  <img src={gold} alt="" height="25" /> {Math.round(score.total_medals / 100)}</td>
                          <td>  <img src={silver} alt="" height="25" /> {Math.round(score.total_medals / 10) % 10}</td>
                          <td>   <img src={bronze} alt="" height="25" /> {(Math.round(score.total_medals) % 100) % 10}</td>
                        </tr>
  }


  render() {

    const top = this.props.winners

  
    return(
      <div className="card bg-light mb-3">
      <div className="card-body">
        <div className="card-text">
        <table className="table table-borderless">
  <tbody>
    {top.map((score,index) => {return   this.mapWinners(score,index)})}
    
  </tbody>
</table>
        
        </div>
      </div>
    </div>
    )

  }}

  TopWinnersBySubject.propTypes = {
    winners: PropTypes.array.isRequired,
    getWinners: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    winners: state.score.winners
  });
  
  export default connect(
    mapStateToProps,
    { getWinners }
  )(TopWinnersBySubject);
  