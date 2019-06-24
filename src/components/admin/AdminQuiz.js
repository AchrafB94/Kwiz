import React from "react";
import './Admin.css'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Modal, Button } from "react-bootstrap"
import { getWinnersByQuiz } from "../../redux/actions/scoreActions";
import { deleteQuiz, getQuiz } from "../../redux/actions/quizActions";
import gold from "../../images/gold.png";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";
import {Link} from 'react-router-dom'
import { getAllQuizzes } from "../../redux/actions/quizActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AdminQuiz extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showDelete: false,
      showMedalists: false,
      showDetails: false,
      id: null,
      search: '',
      userId: null
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
 
  componentDidMount() {
    this.props.getAllQuizzes();
  }

  handleClose() {
    this.setState({ showDelete: false,showMedalists: false, showDetails: false});
  }

  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  
  onClickDelete = (id,rank,userId) => {

    this.setState({
        showDelete: true,
        id: id,
        rank: rank,
        userId: userId
    })
}
  handleDelete = () => {
    this.props.deleteQuiz(this.state.id,this.state.userId,this.state.rank);
    this.setState({showDelete: false})
    
  };

onClickMedalists = (id) => {
  this.props.getWinnersByQuiz(id)
  this.setState({
    showMedalists: true
  })
}

onClickDetails = (id) => {
  this.props.getQuiz(id)
  this.setState({showDetails: true})
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

    

    <Modal show={this.state.showDetails} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>{this.props.quiz.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {this.props.quiz.questions ? this.props.quiz.questions.map((question,index) => {
        return <div key={question.id}>
           <h5>{index +1}. {question.text}</h5>
           {question.answers.map(answer => {
             return <div key={answer.id}>
               <p>({answer.isCorrect ?  <i id="check-icon"><FontAwesomeIcon icon="check" /></i> : <i id="times-icon"><FontAwesomeIcon icon="times" /></i>}) {answer.text}  </p>
                </div>
           })}
           <hr />
        </div>
      }) : " "}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose}>
          Fermer
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
            </tr>)
        })}
          </table> : "Il n'y a pas de médaillés jusqu'à présent."}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>

        <div className="row">
        <div className="col-12">
        <div className="card bg-light" >
        <div className="card-header">
  <form className="form-inline float-right">
  <input className="form-control mr-sm-2" type="search" name="search" value={this.state.search} placeholder="Rechercher par nom" onChange={this.handleChange}  />
  </form>
        <h3>Gestion des Quizz</h3></div>
        <div className="card-body">
        <table className="table  table-hover" >
  <thead>
    <tr>
      <th scope="col">Nom du quiz</th>
      <th scope="col">Matiére</th>
      <th scope="col">Niveau</th>
      <th scope="col">Crée par</th>
      <th scope="col">Créé le</th>
      <th scope="col">Modifié le</th>
      <th scope="col">Etat</th>
      <th scope="col">Actions</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  {this.props.quizzes.filter(quiz => quiz.name.toLowerCase().match(this.state.search)).map(quiz => {return <tr key={quiz.id}>
      <th scope="row"><b><Link to="/admin/quiz/" onClick={this.onClickDetails.bind(this,quiz.id)}>{quiz.name}</Link></b> </th>
      <td>{quiz.subject.name}</td>
      <td>{quiz.level.name}</td>
      {quiz.user ? <td><Link to={"/user/"+quiz.user.id} >{quiz.user.firstname+" "+quiz.user.lastname}</Link></td> : <td></td>}
      <td>{quiz.createdAt}</td>
      <td>{quiz.updatedAt}</td>
      <td>{quiz.rank === 0 ? <b>Disponbile ({quiz.medals}/3 gagnants).</b>  : "Non jouable." }</td>
          <td><button className="btn-sm btn-warning" onClick={this.onClickMedalists.bind(this,quiz.id)}><FontAwesomeIcon icon="medal" /> Les médaillées</button></td>
     
          <td> <button className="btn-sm btn-danger" onClick={this.onClickDelete.bind(this,quiz.id,quiz.rank,quiz.userId)}><FontAwesomeIcon icon="trash-alt" /> Supprimer</button> </td>
    </tr>})}
    
  </tbody>
</table>
        </div>
        </div>
        </div>
</div></div>
    );
  }
}


AdminQuiz.propTypes = {
  quizzes: PropTypes.array.isRequired,
  winnersByQuiz: PropTypes.array,
  quiz: PropTypes.object
};

const mapStateToProps = state => ({

  quizzes: state.quiz.quizzes,
  quiz: state.quiz.quiz,
  winnersByQuiz: state.score.winnersByQuiz
  
});

export default connect(
  mapStateToProps,
  {

    getAllQuizzes,
    deleteQuiz,
    getQuiz,
    getWinnersByQuiz


  }
)(AdminQuiz);

