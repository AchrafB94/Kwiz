import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import gold from "../../images/gold.png";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser } from "../../redux/actions/userActions";
import {
  getUserAverage,
  getUserCountScore,
  getUserFavoriteSubject,
  getUserSumMedals,
  getUserSumScore
} from "../../redux/actions/scoreActions";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Profile.css";
import defaultImage from "../../images/default.png"
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: ""
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    const userId = decoded.id;
    this.props.getUser(userId);
    this.props.getUserAverage(userId);
    this.props.getUserCountScore(userId);
    this.props.getUserFavoriteSubject(userId);
    this.props.getUserSumMedals(userId);
    this.props.getUserSumScore(userId);
  }

  

  render() {
    
    if (this.props.user.role == null) return null;
    if (this.props.user.level == null) return null;
    if (this.props.user.school == null) return null;
    if (this.props.user.image == null) return null;

    return (
      <div className="container card bg-light mt-5 mb-5">
        <div className="row">
          <div className="col-3 border-right mt-3 justify-content-center">
          {this.props.user.image ? <div><Image
              src={'http://localhost/kwiz/public/images/'+this.props.user.image}
              thumbnail
              
            /> 
            <Link to="/settings/photo" params={{ setting: "photo" }} ><button className="btn btn-sm btn-light center">Change votre photo de profil</button></Link></div> :
            <div>
            <Image
              src={defaultImage}
              thumbnail
              
            /> <Link to="/settings/photo" ><button className="btn btn-sm btn-light center">Ajouter une photo de profil</button></Link></div>}
            
            <hr />
            <div id="medals" className="row">
              <div className="col-4">
                <img src={gold} className="center" height="30" alt="" />{" "}
                {Math.round(this.props.medalSum / 100)}{" "}
              </div>
              <div className="col-4">
                <img src={silver} className="thumb" height="30" alt="" />{" "}
                {Math.round(this.props.medalSum / 10) % 10}
              </div>
              <div className="col-4">
                <img src={bronze} className="thumb" height="30" alt="" />{" "}
                {(Math.round(this.props.medalSum) % 100) % 10}
              </div>
            </div>

            <hr />
            <p>
              Score Total: <b>{this.props.scoreSum}</b>{" "}
            </p>

            <p>
              Moyenne:{" "}
              <b>
                {this.props.average.map(avg => Math.round(avg.percentage_avg))}%{" "}
              </b>
            </p>

            <p>
              Nombre de participations: <b>{this.props.scoreCount}</b>
            </p>
          </div>
          <div className="col-9">
            <div>
              <h1 className="display-4">
                {this.props.user.roleId > 1 ? <span className="badge badge-secondary">{this.props.user.role.name}</span> : ""}
                {" "}
                {this.props.user.firstname + " " + this.props.user.lastname}
              </h1>
            </div>
            <table className="table ">
            <tbody>
              <tr>
                <td>
                  <FontAwesomeIcon icon="envelope" /> Email
                </td>
                <td>
                  {this.props.user.email}{" "}
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon="birthday-cake" /> Date de naissance
                </td>
                <td>{this.props.user.birthdate}</td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon="phone" /> Téléphone
                </td>
                <td>{this.props.user.phone}</td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon="layer-group" /> Niveau
                </td>
                <td>{this.props.user.level.name}

                  </td>
                
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon="school" /> Etablissement
                </td>
                <td>
                  <Link to={"/school/"+this.props.user.school.id}> {this.props.user.school.name}</Link>

                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon="calculator" /> Classe
                </td>
                <td>{this.props.user.classroom}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  average: PropTypes.array.isRequired,
  scoreCount: PropTypes.number,
  scoreSum: PropTypes.number,
  medalSum: PropTypes.number,

  getUser: PropTypes.func.isRequired,
  getUserAverage: PropTypes.func.isRequired,
  getUserCountScore: PropTypes.func.isRequired,
  getUserFavoriteSubject: PropTypes.func.isRequired,
  getUserSumMedals: PropTypes.func.isRequired,
  getUserSumScore: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user,
  average: state.score.average,
  scoreCount: state.score.scoreCount,
  scoreSum: state.score.scoreSum,
  medalSum: state.score.medalSum
});

export default connect(
  mapStateToProps,
  {
    getUser,
    getUserAverage,
    getUserCountScore,
    getUserFavoriteSubject,
    getUserSumMedals,
    getUserSumScore
  }
)(Profile);
