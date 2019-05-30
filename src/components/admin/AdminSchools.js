import React from "react";
import "./Admin.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Modal, Button } from "react-bootstrap"
import { getSchools, addSchool, deleteSchool, updateSchool } from "../../redux/actions/schoolActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom'
class AdminSchools extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            show: false,
            showModify: false,
            showDelete: false,
            id: null,
            name: "",
            address: "",
            region: "",
            country: "",
            search: ""
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleModify = this.handleModify.bind(this)
    }

    handleClose() {
        this.setState({ show: false, showModify: false, showDelete: false});
      }
    
      handleShow() {
        this.setState({ show: true });
      }

      handleAdd() {

        if(this.state.name !=="") {
          const schoolData = {
            name: this.state.name,
            country: this.state.country,
            region: this.state.region,
            address: this.state.address,
        }
        
        this.props.addSchool(schoolData)
        this.setState({ show: false });

        }

        

      }

      handleChange(e) {
          
        this.setState({ [e.target.name]: e.target.value });
      }

      onClickModify = (school) => {
          this.setState({
              showModify: true,
              name: school.name,
              id: school.id,
              region: school.region,
              country: school.country,
              address: school.address
          })
      }

      handleModify() {
          const subjectData = {
              id: this.state.id,
              name: this.state.name,
              country: this.state.country,
              region: this.state.region,
              address: this.state.address,
          }

          this.props.updateSchool(subjectData)
          this.setState({showModify: false})
      }

      onClickDelete = (id,name) => {

        this.setState({
            showDelete: true,
            name: name,
            id: id
        })
    }
      handleDelete = () => {
        this.props.deleteSchool(this.state.id);
        this.setState({showDelete: false})
      };

  componentDidMount() {
    this.props.getSchools();
    
  }

  render() {
    return (
      <div className="container">
        <Modal show={this.state.show} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un nouveau etablissement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Adresse</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group col-6">
                <label htmlFor="region">Region</label>
                <input
                  type="text"
                  className="form-control"
                  name="region"
                  value={this.state.region}
                  onChange={this.handleChange}
                  required
                />
                </div>
                <div className="form-group col-6">
                 <label htmlFor="country">Pays</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={this.state.country}
                  onChange={this.handleChange}
                  required
                />
                </div>
              </div>
              
      </Modal.Body>
      <Modal.Footer>
      <Button  variant="primary" onClick={this.handleAdd} >
          Enregistrer
        </Button>
        <Button variant="secondary" onClick={this.handleClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={this.state.showModify} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Modifier l'etablissement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Adresse</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group col-6">
                <label htmlFor="region">Region</label>
                <input
                  type="text"
                  className="form-control"
                  name="region"
                  value={this.state.region}
                  onChange={this.handleChange}
                  required
                />
                </div>
                <div className="form-group col-6">
                 <label htmlFor="country">Pays</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={this.state.country}
                  onChange={this.handleChange}
                  required
                />
                </div>
              </div>
      </Modal.Body>
      <Modal.Footer>
      <Button  variant="primary" onClick={this.handleModify} >
          Enregistrer
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
      <p>Êtes-vous vraiment sûr de vouloir supprimer cet etablissement? ça supprimera toutes les scores qui lui sont liés!</p>
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
        <div className="row">
          <div className="col-12">
            <div className="card bg-light">
            <div className="card-header">
            <button className="btn float-right btn-outline-primary" onClick={this.handleShow}>
              
              <FontAwesomeIcon icon="plus" /> Créer un nouveau etablissement
            </button>
            <form className="form-inline float-right">
 <input className="form-control mr-sm-2" type="search" name="search" value={this.state.search} placeholder="Filtrer par nom" onChange={this.handleChange}  />
  </form>
            <h3>Gestion des Etablissements</h3></div>
              <div className="card-body">
              
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Etablissement</th>
                      <th scope="col">Adressse</th>
                      <th scope="col">Région</th>
                      <th scope="col">Pays</th>
                      <th scope="col">Actions</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.schools.filter(school => school.name.toLowerCase().match(this.state.search)).map(school => {
                      return (
                        <tr key={school.id}>
                          <td>
                            
                          <Link to={"/school/"+school.id}> {school.name}</Link>
                          </td>
                          <td>{school.address}</td>
                          <td>{school.region}</td>
                          <td>{school.country}</td>
                          <td >
                            <button className="btn-sm btn-info" onClick={this.onClickModify.bind(this, school)}> <FontAwesomeIcon icon="edit" /> Modifer</button>
                            </td>
                            <td><button className="btn-sm btn-danger" onClick={this.onClickDelete.bind(this, school.id)}><FontAwesomeIcon icon="trash-alt" /> Supprimer</button>
                          </td>
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

AdminSchools.propTypes = {
  schools: PropTypes.array.isRequired,
  
};

const mapStateToProps = state => ({
  schools: state.schools.schools
  
});

export default connect(
  mapStateToProps,
  {
    getSchools, addSchool, deleteSchool, updateSchool
   
  }
)(AdminSchools);
