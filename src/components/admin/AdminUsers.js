import React from "react";
import "./Admin.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers, deleteUser, addContributor, blockUser, unblockUser } from "../../redux/actions/userActions";
import { resetUser } from "../../redux/actions/scoreActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Modal, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom";
import defaultPhoto from "../../images/default.png";


class AdminUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      id: null,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      search: "",
      showAdd: false,
      showDelete: false,
      showDisable: false,
      showEnable: false,
      showReset: false,
      emailUsedAlert: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
    this.handleEnable = this.handleEnable.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  componentDidMount() {
    this.props.getUsers();
  }
  handleClose() {
    this.setState({ showAdd: false, showDelete: false, showDisable: false, showEnable: false, showReset: false});
  }
  onClickAdd() {
    this.setState({showAdd: true});
  }
  handleAdd() {
    
      const contribData = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
      };
      this.props.addContributor(contribData).then(result => {
        if(result.code === 1006) {
            this.setState({emailUsedAlert: true})
        }else {
        this.setState({ showAdd: false });
        }
      } )
    
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClickDelete = (id) => {

    this.setState({
        showDelete: true,
        id: id
    })
}
  handleDelete = () => {
    this.props.deleteUser(this.state.id);
    this.setState({showDelete: false})
  };

  onClickDisable = (user) => {

    this.setState({
        showDisable: true,
        user: user
    })
}
  handleDisable = () => {
    this.props.blockUser(this.state.user);
    this.setState({showDisable: false})
    window.location.reload()
  };

  onClickEnable = (user) => {

    this.setState({
      showEnable: true,
      user: user
    })
}
  handleEnable = () => {
    this.props.unblockUser(this.state.user);
    this.setState({showEnable: false})
    window.location.reload()
  };

  onClickReset = (user) => {

    this.setState({
      showReset: true,
      user: user
    })
}
  handleReset = () => {
    this.props.resetUser(this.state.user);
    this.setState({showEnable: false})
    window.location.reload()
  };


  getStatus = (status) => {
    switch(status) {
      case 'verified': return 'Verifié';
      case 'unverified': return 'Non verifié';
      case 'blocked': return 'Désactivé';
      default: return ' '
    }
  }
  render() {
    return (
      <div className="container-fluid">
          <Modal dismissable show={this.state.showAdd} onClose={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un nouveau contributeur</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="form-row">
      <Alert dismissible show={this.state.emailUsedAlert} onClose={() => this.setState({emailUsedAlert: false})} variant="danger">  
                        <p> <FontAwesomeIcon icon="exclamation-triangle" /> L'email que vous avez saisie est déjà utilisée par un autre compte.
   
  </p>
</Alert>
      <div className="form-group col-6">
  
                <label htmlFor="firstname">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleChange}
                  required
                />
                </div>    <div className="form-group col-6">          <label htmlFor="lastname">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                  required
                />
              </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group col-6">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  minLength='8'
                  maxLength='15'
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                </div>
              </div>
              
      </Modal.Body>
      <Modal.Footer>
      <Button  variant="primary" onClick={this.handleAdd} >
          Ajouter
        </Button>
        <Button variant="secondary" onClick={this.handleClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={this.state.showDelete} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Attention!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p>Êtes-vous vraiment sûr de vouloir supprimer ce compte? ça supprimera tous ses quizz!</p>
      </Modal.Body>
      <Modal.Footer>
      <Button  variant="danger" onClick={this.handleDelete} >
          Supprimer
        </Button>
        <Button variant="secondary" onClick={this.handleClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={this.state.showDisable} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Attention!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p>Voulez-vous vraiment désactiver ce compte? Il ne pourra plus se connecter et participer!</p>
      </Modal.Body>
      <Modal.Footer>
      <Button  variant="danger" onClick={this.handleDisable} >
          Désactiver
        </Button>
        <Button variant="secondary" onClick={this.handleClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={this.state.showEnable} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Attention!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p>Voulez-vous réactiver ce compte?</p>
      </Modal.Body>
      <Modal.Footer>
      <Button  variant="danger" onClick={this.handleEnable} >
          Réactiver
        </Button>
        <Button variant="secondary" onClick={this.handleClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={this.state.showReset} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Attention!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p>Réinitialiser ce compte supprimera tous ses scores mais ne supprimera pas le compte.</p>
      </Modal.Body>
      <Modal.Footer>
      <Button  variant="danger" onClick={this.handleReset} >
          Réinitialiser
        </Button>
        <Button variant="secondary" onClick={this.handleClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>

        <div className="card bg-light mb-5">
          <div className="card-header">
              <button className="btn btn-primary float-right" onClick={this.onClickAdd.bind(this)}>
                <FontAwesomeIcon icon="plus" /> Ajouter un contributeur
              </button>
            <h3>Gestion des Contributeurs</h3>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Membre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date d'ajout</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.users
                  .filter(user => user.roleId === 2)
                  .map(user => {
                    return (
                      <tr key={user.id}>
                        <td>
                          {user.image ? (
                            <img
                              src={
                                "http://localhost/kwiz/public/images/" +
                                user.image
                              }
                              height="20"
                              width="20"
                              className="thumbnail"
                              alt=""
                            />
                          ) : (
                            <img
                              src={defaultPhoto}
                              height="20"
                              width="20"
                              className="thumbnail"
                              alt=""
                            />
                          )}{" "}
                          <Link to={"/user/" + user.id}>
                            {user.firstname + " " + user.lastname}{" "}
                          </Link>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.createdAt}</td>
                        <td>
                          <button className=" btn-danger" onClick={this.onClickDelete.bind(this,user.id)}>
                            {" "}
                            <FontAwesomeIcon icon="trash-alt" /> Supprimer
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card bg-light">
          <div className="card-header">
            <form className="form-inline float-right">
              <input
                className="form-control mr-sm-2"
                type="search"
                name="search"
                value={this.state.search}
                placeholder="Filtrer par nom ou email"
                onChange={this.onChange}
              />
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

                  <th scope="col">Téléphone</th>
                  <th scope="col">Date de naissance</th>
                  <th scope="col">Date d'inscription</th>
                  <th scope="col">Etat du compte</th>
                  <th scope="col">Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.users
                  .filter(user => user.roleId === 1)
                  .filter(
                    user =>
                      user.firstname.toLowerCase().match(this.state.search) ||
                      user.lastname.toLowerCase().match(this.state.search) ||
                      user.email.toLowerCase().match(this.state.search)
                  )
                  .map(user => {
                    return (
                      <tr key={user.id}>
                        <td>
                          {user.image ? (
                            <img
                              src={
                                "http://localhost/kwiz/public/images/" +
                                user.image
                              }
                              height="20"
                              width="20"
                              className="thumbnail"
                              alt=""
                            />
                          ) : (
                            <img
                              src={defaultPhoto}
                              height="20"
                              width="20"
                              className="thumbnail"
                              alt=""
                            />
                          )}{" "}
                          <Link to={"/user/" + user.id}>
                            {user.firstname + " " + user.lastname}{" "}
                          </Link>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.level ? user.level.name : ""}</td>
                        <td>
                          {user.school ? (
                            <Link to={"/school/" + user.school.id}>
                              {" "}
                              {user.school.name}
                            </Link>
                          ) : (
                            " "
                          )}
                        </td>
                        <td>{user.classroom}</td>
                        
                        <td>{user.phone}</td>
                        <td>{user.birthdate}</td>
                        <td>{user.createdAt}</td>
                        <td>{this.getStatus(user.status)}</td>
                        {user.status === 'blocked' ?  <td>
                          <button className=" btn-dark" onClick={this.onClickEnable.bind(this,user)}>
                            {" "}
                            <FontAwesomeIcon icon="unlock-alt" /> Débloquer
                          </button>
                        </td> :  <td>
                          <button className=" btn-danger" onClick={this.onClickDisable.bind(this,user)}>
                            {" "}
                            <FontAwesomeIcon icon="ban" /> Désactiver
                          </button>
                        </td>}

                       
                        <td>
                          <button className=" btn-secondary" onClick={this.onClickReset.bind(this,user)}>
                            {" "}
                            <FontAwesomeIcon icon="redo" /> Réinitialiser
                          </button>
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
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.user.users
});

export default connect(
  mapStateToProps,
  {
    getUsers, deleteUser, addContributor, blockUser, unblockUser, resetUser
  }
)(AdminUsers);
