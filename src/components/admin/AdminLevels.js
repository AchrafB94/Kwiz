import React from "react";
import "./Admin.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Modal, Button } from "react-bootstrap"

import { getLevels, addLevel, deleteLevel, updateLevel } from "../../redux/actions/levelActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class AdminLevels extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            show: false,
            showModify: false,
            showDelete: false,
            id: null,
            name: ""
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

          const levelData = {
            name: this.state.name
        }
        
        this.props.addLevel(levelData)
        this.setState({ show: false });
        }


      }

      handleChange(e) {
          
        this.setState({ name: e.target.value });
      }

      onClickModify = (id,name) => {
          this.setState({
              showModify: true,
              name: name,
              id: id
          })
      }

      handleModify() {
          const levelData = {
              id: this.state.id,
              name: this.state.name
          }

          this.props.updateLevel(levelData)
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
        this.props.deleteLevel(this.state.id);
        this.setState({showDelete: false})
      };

  componentDidMount() {
    this.props.getLevels();
  
    
  }

  render() {
    return (
      <div className="container">
        <Modal show={this.state.show} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un niveau</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="form-group">
                <label htmlFor="class">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={this.handleChange}
                  required
                />
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
        <Modal.Title>Renommer le niveau</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="form-group">
                <label htmlFor="class">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
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
      <p>Êtes-vous vraiment sûr de vouloir supprimer ce niveau? Cela supprimera également tous les quiz et scores liés à ce niveau! Il ne pourra jamais être récupéré et toutes les données seront perdues.</p>
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
              
              <FontAwesomeIcon icon="plus" /> Ajouter un niveau
            </button>
            <h3>Gestion des Niveaux</h3>
            </div>
              <div className="card-body">
              
                <table className="table table-hover ">
                  <thead>
                    <tr>
                      <th scope="col">Niveau</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.levels.map(level => {
                      return (
                        <tr key={level.id}>
                          <td>
                              {level.name}
                          </td>
                          <td >
                            <button className="btn-sm btn-info" onClick={this.onClickModify.bind(this, level.id,level.name)}> <FontAwesomeIcon icon="edit" /> Renommer</button>
                            </td>
                            <td><button className="btn-sm btn-danger" onClick={this.onClickDelete.bind(this, level.id)}><FontAwesomeIcon icon="trash-alt" /> Supprimer</button>
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

AdminLevels.propTypes = {
  levels: PropTypes.array.isRequired,
  
};

const mapStateToProps = state => ({

  levels: state.levels.levels
  
});

export default connect(
  mapStateToProps,
  { getLevels, addLevel, deleteLevel, updateLevel }
)(AdminLevels);
