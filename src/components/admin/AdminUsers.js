import React from "react";
import "./Admin.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {Link} from 'react-router-dom'
import defaultPhoto from '../../images/default.png'
class AdminUsers extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
          search: ""
        }
        this.onChange = this.onChange.bind(this);
    }
  componentDidMount() {
    this.props.getUsers();
    
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    return (
      <div className="container-fluid">
            <div className="card bg-light">
            <div className="card-header">
            <form className="form-inline float-right">
 <input className="form-control mr-sm-2" type="search" name="search" value={this.state.search} placeholder="Filtrer par nom ou email" onChange={this.onChange}  />
  </form>
            <h3>Gestion des Utilisateurs</h3>
           </div>
              <div className="card-body">
              
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Membre</th>
                      <th scope="col">Email</th>
                      <th scope="col">Niveau</th>
                      <th scope="col">Etablissement</th>
                      <th scope="col">Classe</th>
                      
                      <th scope="col">Date de naissance</th>
                      <th scope="col">Sexe</th>
                      <th scope="col">Téléphone</th>
                      <th scope="col">Date d'inscription</th>
                      <th scope="col">Actions</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.users.filter(user => user.firstname.toLowerCase().match(this.state.search) || user.lastname.toLowerCase().match(this.state.search) || user.email.toLowerCase().match(this.state.search)).map(user => {
                      return (
                        <tr key={user.id}>
                          <td>{user.image ? <img src={"http://localhost/kwiz/public/images/"+user.image} height="20" width="20" className="thumbnail" alt="" /> 
                : <img src={defaultPhoto} height="20" width="20" className="thumbnail" alt="" />} <Link to={"/user/"+user.id} >{user.firstname+" "+user.lastname} </Link></td>
                            <td>{user.email}</td>
                            <td>{user.level ? user.level.name : ''}</td>
                            <td> <Link to={"/school/"+user.school.id} > {user.school ? user.school.name : ''}</Link></td>
                            <td>{user.class}</td>
                            
                            <td>{user.birthdate}</td>
                            <td>{user.gender}</td>
                            <td>{user.phone}</td>
                            <td>{user.createdAt}</td>
                            
                            <td >
                            <button className=" btn-danger" > <FontAwesomeIcon icon="ban" /> Bloquer le compte</button>
                            </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        
    );
  }
}

AdminUsers.propTypes = {
  users: PropTypes.array.isRequired,
  
};

const mapStateToProps = state => ({
  users: state.user.users
  
});

export default connect(
  mapStateToProps,
  {
    getUsers
   
  }
)(AdminUsers);
