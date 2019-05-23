import React, { Component } from "react";
import gold from "../../images/gold.png";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getUserMedalsBySchool, getSchoolSumMedals } from "../../redux/actions/scoreActions";
import {getSchool} from "../../redux/actions/schoolActions";
import {Link } from "react-router-dom"
import "./School.css"
class Profile extends Component {
  constructor() {
    super();
    this.state = {
        name: ""
        
    };
  }

  componentDidMount() {

    const { id } = this.props.match.params;
      
    this.props.getSchool(id);
    this.props.getUserMedalsBySchool(id)
    this.props.getSchoolSumMedals(id)
  }

  

  render() {
    return (
      <div className="container  mt-5 mb-5">
      <div className="card bg-light">
      <div className="card-header">          <h1 className="display-4">
                {this.props.school.name}
              </h1></div>
        <div className="card-body row">
          <div className="col-4 border-right mt-3 justify-content-center">

          
            <div id="medals" className="row">
              <div className="col-4">
                <img src={gold} className="center" height="30" alt="" />{" "}
                {Math.round(this.props.schoolMedalSum / 100)}{" "}
              </div>
              <div className="col-4">
                <img src={silver} className="thumb" height="30" alt="" />{" "}
                {Math.round(this.props.schoolMedalSum / 10) % 10}
              </div>
              <div className="col-4">
                <img src={bronze} className="thumb" height="30" alt="" />{" "}
                {(Math.round(this.props.schoolMedalSum) % 100) % 10}
              </div>
            </div>

<hr />
            <table className="table table-borderless" >
              <tbody>
              <tr>
                <td><b>Adresse</b></td>
                <td> {this.props.school.address}</td>
              </tr>

              <tr>
                <td><b>Région</b></td>
                <td>  {this.props.school.region}</td>
              </tr>

              <tr>
                <td><b>Pays</b></td>
                <td>{this.props.school.country}</td>
              </tr>
              </tbody>
            </table>
           
            
              


          </div>
          <div className="col-8">
            <div>



              

              <h2>Classement des members</h2>
              <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nom</th>
                      <th scope="col">
                        {" "}
                        <img src={gold} alt="" height="40" />
                      </th>
                      <th scope="col">
                        {" "}
                        <img src={silver} alt="" height="40" />
                      </th>
                      <th scope="col">
                        {" "}
                        <img src={bronze} alt="" height="40" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.userMedalsBySchool.map((score, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td><Link to={"/user/"+score.user.id} >{score.user.firstname+" "+score.user.lastname}</Link></td>
                          <td>{Math.round(score.total_medals / 100)}</td>
                          <td>{Math.round(score.total_medals / 10) % 10}</td>
                          <td>{(Math.round(score.total_medals) % 100) % 10}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
    school: PropTypes.object.isRequired,
    userMedalsBySchool: PropTypes.array.isRequired,
    schoolMedalSum: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  school: state.schools.school,
  userMedalsBySchool: state.score.userMedalsBySchool,
  schoolMedalSum: state.score.schoolMedalSum
});

export default connect(
  mapStateToProps,
  {
      getSchool,getUserMedalsBySchool,getSchoolSumMedals
  }
)(Profile);
