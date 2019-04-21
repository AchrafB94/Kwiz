import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import gold from '../../images/gold.png'
import silver from '../../images/silver.png'
import bronze from '../../images/bronze.png'
import './Profile.css'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser } from "../../redux/actions/userActions";
import { getUserAverage,getUserCountScore,getUserFavoriteSubject,getUserSumMedals,getUserSumScore } from "../../redux/actions/scoreActions";
import {Image} from 'react-bootstrap'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            firstname: '',
            lastname: '',
            email: ''
        }
    }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        const userId = decoded.id;
        this.props.getUser(userId)
        this.props.getUserAverage(userId)
        this.props.getUserCountScore(userId)
        this.props.getUserFavoriteSubject(userId)
        this.props.getUserSumMedals(userId)
        this.props.getUserSumScore(userId)
        
    }

    render () {
        
    if (this.props.user.level == null) return null;
    if (this.props.user.school == null) return null;
        return (
            <div className="container mt-5">
                <div className="row">
                <div className="col-3-xl col-3-lg col-3-md col-12-sm  ">
                <div className="card">
                <center>
                <Image className="card-img-top" src={require(`../../images/${this.props.user.image}`)} rounded/>
                <br />
                
                <table className="table table-borderless">
                    <tr>
                        <td><img src={gold} className="thumb" height="80"  alt=""/></td>
                        <td><img src={silver} className="thumb" height="80"  alt=""/></td>
                        <td><img src={bronze} className="thumb" height="80"  alt=""/></td>
                    </tr>
                    <tr>
                        <td className="display-4">{Math.round(this.props.medalSum / 100)} </td>
                        <td className="display-4"> {Math.round(this.props.medalSum / 10) % 10}</td>
                        <td className="display-4"> {(Math.round(this.props.medalSum) % 100) % 10}</td>
                    </tr>
                </table>
                <hr />
                <h3>Score Total</h3>
                <h2>{this.props.scoreSum}</h2>

                <hr />
                <h3>Moyenne</h3>
                <h2>{this.props.average.map(avg => Math.round(avg.percentage_avg))}%</h2>


                <hr />
                <h3>Nombre de participations</h3>
                <h2>{this.props.scoreCount}</h2>

                </center>
                </div>
                
                </div>
                <div className="col-9-xl col-9-lg col-9-md col-12-sm ">
                <div className="card">
                <div className="card-header">
                <Link to="/profilemodify"><button className="btn btn-primary float-right">Modifier votre profile</button></Link>
                
                <h1 > {this.props.user.firstname+" "+this.props.user.lastname}</h1></div>
                <table className="table lead">
                    <tr>
                        <td>Email</td>
                        <td>{this.props.user.email}  <Link to="/settings"><button className="btn-info btn-sm">Changer</button></Link></td>
                    </tr>
                    <tr>
                        <td>Mot de passe</td>
                        <td>********  <Link to="/settings"><button className="btn-info btn-sm">Changer</button></Link></td>
                    </tr>
                    <tr>
                        <td>Date de naissance</td>
                        <td>{this.props.user.birthdate}</td>
                    </tr>
                    <tr>
                        <td>Telephone</td>
                        <td>{this.props.user.phone}</td>
                    </tr>
                    <tr>
                        <td>Niveau</td>
                        <td>{this.props.user.level.name}</td>
                    </tr>
                    <tr>
                        <td>Etablissement</td>
                        <td>{this.props.user.school.name} <Link to="/settings"><button className="btn-info btn-sm">Changer</button></Link></td>
                    </tr>
                    <tr>
                        <td>Classe</td>
                        <td>{this.props.user.class}</td>
                    </tr>
                    <tr>
                        <td>Adresse</td>
                        <td>{this.props.user.district} - {this.props.user.city} - {this.props.user.province}</td>
                    </tr>
                </table>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  average: PropTypes.array.isRequired,
  scoreCount: PropTypes.number.isRequired,
  scoreSum: PropTypes.number.isRequired,
  medalSum: PropTypes.number.isRequired,

  getUser: PropTypes.func.isRequired,
  getUserAverage: PropTypes.func.isRequired,
  getUserCountScore: PropTypes.func.isRequired,
  getUserFavoriteSubject: PropTypes.func.isRequired,
  getUserSumMedals: PropTypes.func.isRequired,
  getUserSumScor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.user,
  average: state.score.average,
  scoreCount: state.score.scoreCount,
  scoreSum: state.score.scoreSum,
  medalSum: state.score.medalSum,
});

export default connect(
  mapStateToProps,
  { getUser,getUserAverage,getUserCountScore,getUserFavoriteSubject,getUserSumMedals,getUserSumScore }
)(Profile);
