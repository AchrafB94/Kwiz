import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import jwt_decode from "jwt-decode";
import gold from "../../images/gold.png";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";
import { getLevels } from "../../redux/actions/levelActions";
import {
   
    getQuizzesByUser, editQuiz
  } from "../../redux/actions/quizActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Modal, Button } from "react-bootstrap"
import { getWinnersByQuiz } from "../../redux/actions/scoreActions";
import { deleteQuiz, rankUp } from "../../redux/actions/quizActions";
import { getSubjects } from "../../redux/actions/subjectActions";
class Contributor extends React.Component {

constructor(props) {
    super(props)
    this.state = {
      showModify: false,
      showDelete: false,
      showMedalists: false,
      showOrganize: false,
      id: null,
      name: '',
      subjectId: null,
      levelId: null,
      description: '',
      userId: null,
      quizzes: [],
      rank: null,
      oldRank: null,
      items: []
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleModify = this.handleModify.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }


componentDidMount() {
  this.props.getSubjects()
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    const userId = decoded.id;
    this.setState({userId: userId})
    this.props.getQuizzesByUser(userId);
    this.props.getLevels()


  }




  handleChange(e) {
          
    this.setState({[e.target.name]: e.target.value });
  }

  

handleClose() {
    this.setState({ showDelete: false,showModify: false,showMedalists: false,showOrganize: false});
  }


onClickModify = (quiz) => {
    this.setState({
        showModify: true,
        id: quiz.id,
        name: quiz.name,
        description: quiz.description,
        levelId: quiz.levelId,
        subjectId: quiz.subjectId,
        rank: quiz.rank,
        oldRank: quiz.rank
    })
}

handleModify() {
    const quizData = {
        id: this.state.id,
        name: this.state.name,
        description: this.state.description,
        levelId: this.state.levelId,
        subjectId: this.state.subjectId,

        newRank: this.state.rank,
        oldRank: this.state.oldRank,
    }


    this.props.editQuiz(quizData)
    this.setState({showModify: false})
    window.location.reload()
}



onClickDelete = (id,rank) => {

    this.setState({
        showDelete: true,
        id: id,
        rank: rank
    })
}
  handleDelete = () => {
    this.props.deleteQuiz(this.state.id,this.state.userId,this.state.rank);
    this.setState({showDelete: false})
    window.location.reload()
  };


  onClickMedalists = (id) => {
    this.props.getWinnersByQuiz(id)
    this.setState({
      showMedalists: true
    })
    
}

medalImage(number) {
  switch (number) {
    case 100:
      return gold;
    case 10:
      return silver;
    case 1:
      return bronze;
    default:
      return null;
  }
}


  render() {

    return (
      <div className="container-fluid">

<Modal show={this.state.showOrganize} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Organizer le fil d'attente</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
      <Modal.Footer>
      <Button  variant="danger" onClick={this.handleOrganize} >
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
      <p>Êtes-vous vraiment sûr de vouloir supprimer ce quiz?</p>
      </Modal.Body>
      <Modal.Footer>
      <Button  variant="danger" onClick={this.handleDelete} >
          Oui
        </Button>
        <Button variant="secondary" onClick={this.handleClose}>
          Non
        </Button>
      </Modal.Footer>
    </Modal>


    <Modal show={this.state.showMedalists} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Liste des médaillées</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {this.props.winnersByQuiz.length > 0 ?  
      <table className="table table-borderless">
        <tbody>
            <tr>
                <th>Nom</th>
                <th>Etablissment</th>
                <th>Date</th>
                
            </tr>
        {this.props.winnersByQuiz.map(score => {return (
            <tr key={score.id}>
            <td><img src={this.medalImage(score.medal)} height="25" alt="medal" /> <Link to={"/user/"+score.userId} >{score.user.firstname+" "+score.user.lastname}</Link></td>
            <td> <Link to={"/school/"+score.schoolId} >{score.school.name}</Link></td>
            <td>{score.createdAt}</td>
            </tr>

        )
        })}
        </tbody>
          </table> : "Il n'y a pas de médaillés jusqu'à présent."}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>


    <Modal show={this.state.showModify} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Modifier le quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="form-group">
      <label htmlFor="rank">
                   Position dans le fil d'attente
                  <select className="form-control" 
                       
                          name="rank"
                          defaultValue={this.state.rank}
                          onChange={this.handleChange}>
    {this.props.quizzes.filter(quiz => quiz.rank > 0).map(quiz => { return   <option key={quiz.id} value={quiz.rank}>{quiz.rank}</option>})}
  </select>
                </label> <br />
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
                 <label htmlFor="description">Description</label>
                 <textarea className="form-control" name="description" rows="5" value={this.state.description} onChange={this.handleChange}></textarea>
                   

                   
                   <label htmlFor="levelId">
                  Niveau
                  <select className="form-control" 
                       
                          name="levelId"
                          defaultValue={this.state.levelId}
                          onChange={this.handleChange}>
   {this.props.levels.map(level => <option key={level.id} value={level.id}>{level.name}</option>)}
  </select>
                </label>
                
                <label htmlFor="subjectId">Matiére

<select className="form-control" name="subjectId" defaultValue={this.state.subjectId} onChange={this.handleChange} >
{this.props.subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
</select>

</label>
                
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

        <div className="row">
        <div className="col-12">
        <div className="card bg-light" >
        <div className="card-header">
        <Link to="/quiz-create">
        <button className="btn float-right btn-outline-primary">
              <FontAwesomeIcon icon="plus" /> Créer un nouveau Quiz
            </button></Link>
        <h3>Mes Quizz</h3>
            </div>
        <div className="card-body">
        {this.props.quizzes.filter(quiz => quiz.rank === 0).map(quiz => {return <div key={quiz.id}>
          <h3>Quiz disponible - {quiz.medals}/3 gagnants</h3>
          <table className="table" >
  <thead>
    <tr>
      <th scope="col">Nom du quiz</th>
      <th scope="col">Matiére</th>
      <th scope="col">Niveau</th>
      <th scope="col">Ajouté le</th>
      <th scope="col">Modifié le</th>
      <th scope="col">Actions</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><b>{quiz.name}</b> </td>
      <td>{quiz.subject.name}</td>
      <td>{quiz.level.name}</td>
      <td>{quiz.createdAt}</td>
      <td>{quiz.updatedAt}</td>
      <td><button className="btn-sm btn-primary" onClick={this.onClickModify.bind(this, quiz)}><FontAwesomeIcon icon="edit"  /> Modifier le quiz</button></td>
      <td><Link to={"/questions/"+quiz.id} ><button className="btn-sm btn-info"><FontAwesomeIcon icon="question-circle" /> Gérer les questions</button></Link></td>
      <td><button className="btn-sm btn-warning" onClick={this.onClickMedalists.bind(this,quiz.id)}><FontAwesomeIcon icon="medal" /> Les médaillées</button></td>
      <td> <button onClick={this.onClickDelete.bind(this, quiz.id,quiz.rank)} className="btn-sm btn-danger"><FontAwesomeIcon icon="trash-alt" /> Supprimer</button></td>
      </tr>
      </tbody></table>
   </div>})}
<hr />

    <h3>Les quizz en attente</h3>
        <table className="table  table-hover" >
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nom du quiz</th>
      <th scope="col">Matiére</th>
      <th scope="col">Niveau</th>
      <th scope="col">Ajouté le</th>
      <th scope="col">Modifié le</th>
      <th scope="col">Actions</th>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  {this.props.quizzes.filter(quiz => quiz.rank > 0).map(quiz => {return <tr key={quiz.id}>
    <td>{quiz.rank}</td>
    <td><b> {quiz.name}</b> </td>
      <td>{quiz.subject.name}</td>
      <td>{quiz.level.name}</td>
      <td>{quiz.createdAt}</td>
      <td>{quiz.updatedAt}</td>
      <td><button className="btn-sm btn-primary" onClick={this.onClickModify.bind(this, quiz)}><FontAwesomeIcon icon="edit"  /> Modifier le quiz</button></td>
      <td><Link to={"/questions/"+quiz.id} ><button className="btn-sm btn-info"><FontAwesomeIcon icon="question-circle" /> Gérer les questions</button></Link></td>
      <td><button className="btn-sm btn-warning" onClick={this.onClickMedalists.bind(this,quiz.id)}><FontAwesomeIcon icon="medal" /> Les médaillées</button></td>
      <td> <button onClick={this.onClickDelete.bind(this, quiz.id,quiz.rank)} className="btn-sm btn-danger"><FontAwesomeIcon icon="trash-alt" /> Supprimer</button></td>
    </tr>})}
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


Contributor.propTypes = {
  quizzes: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  winnersByQuiz: PropTypes.array,
  levels: PropTypes.array.isRequired
};

const mapStateToProps = state => ({

  quizzes: state.quiz.quizzes,
  subjects: state.subjects.subjects,
  winnersByQuiz: state.score.winnersByQuiz,
  levels: state.levels.levels
  
});

export default connect(
  mapStateToProps,
  {

    getQuizzesByUser,
    deleteQuiz,
    rankUp,
    editQuiz,
    getSubjects,
    getWinnersByQuiz,
    getLevels

  }
)(Contributor);

