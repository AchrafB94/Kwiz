import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import profile from '../../images/user-male-icon.png'
import gold from '../../images/gold.png'
import silver from '../../images/silver.png'
import bronze from '../../images/bronze.png'
import './Profile.css'

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
        this.setState({
            firstname: decoded.firstname,
            lastname: decoded.lastname,
            email: decoded.email,
            birthdate: decoded.birthdate,
            gender: decoded.gender,
            phone: decoded.phone,
            level: "getlevelname",
            school: "getschoolname",
            class: decoded.class,
            district: decoded.district,
            city: decoded.city,
            province: decoded.province,
            photo: decoded.photo,
        })
    }

    render () {
        return (
            <div className="container mt-5">
                <div className="row">
                <div className="col-3 ">
                <div className="jumbotron">
                <center>
                <img src={profile} className="thumb" height="200"  alt=""/>
                <br />
                <button className="btn-modify">Changez votre photo</button>
                <hr />
                <h3>SCORE TOTAL</h3>
                <h2>0000</h2>
                <table className="table">
                    <tr>
                        <td><img src={gold} className="thumb" height="80"  alt=""/></td>
                        <td><img src={silver} className="thumb" height="80"  alt=""/></td>
                        <td><img src={bronze} className="thumb" height="80"  alt=""/></td>
                    </tr>
                    <tr>
                        <td className="display-4">0</td> 
                        <td className="display-4">0</td>
                        <td className="display-4">0</td>
                    </tr>
                </table>
                </center>
                </div>
                
                </div>
                <div className="col-9 ">
                <div className="jumbotron">
                <div>
                <button className="btn btn-info float-right">Modifier votre profile</button></div>
                <h1> Mon Profile</h1>
                <table className="table lead">
                    <tr>
                        <td>Nom</td>
                        <td>{this.state.firstname+" "+this.state.lastname}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{this.state.email}  <button className="btn-modify">Modifier</button></td>
                    </tr>
                    <tr>
                        <td>Mot de passe</td>
                        <td>********  <button className="btn-modify">Modifier</button></td>
                    </tr>
                    <tr>
                        <td>Date de naissance</td>
                        <td>{this.state.birthdate}</td>
                    </tr>
                    <tr>
                        <td>Sexe</td>
                        <td>{this.state.gender}</td>
                    </tr>
                    <tr>
                        <td>Telephone</td>
                        <td>{this.state.phone}</td>
                    </tr>
                    <tr>
                        <td>Niveau</td>
                        <td>{this.state.level}</td>
                    </tr>
                    <tr>
                        <td>Etablissement</td>
                        <td>{this.state.school}</td>
                    </tr>
                    <tr>
                        <td>Classe</td>
                        <td>{this.state.class}</td>
                    </tr>
                    <tr>
                        <td>Adresse</td>
                        <td>{this.state.district} - {this.state.city} - {this.state.province}</td>
                    </tr>
                </table>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Profile