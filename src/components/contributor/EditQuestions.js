import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getQuestions, addQuestion,getQuiz, getQuestion,renameQuestion, addAnswer ,editAnswer , deleteQuestion, deleteAnswer} from "../../redux/actions/quizActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Modal, Button } from "react-bootstrap"


class EditQuestions extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      showAdd: false,
      showModify: false,
      showDelete: false,
      showModifyAnswer: false,
      showDeleteAnswer: false,
      showAddAnswer: false,


      questionId: null,
      answerId: null,
      answerText: "",
      question_text: "",
      answers_number: 2,
      answers: [],
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleModifyAnswer = this.handleModifyAnswer.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteAnswer = this.handleDeleteAnswer.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
      const { id } = this.props.match.params;
      this.props.getQuestions(id);
      this.props.getQuiz(id)
  }

  handleClose() {
    this.setState({ showAdd: false, showModify: false, showDelete: false,showDeleteAnswer: false,showAddAnswer: false, showModifyAnswer: false});
  }

  onClickAdd() {
    this.setState({ showAdd: true });
  }

  handleAdd(e) {
    e.preventDefault();
    var questionData = {}
      var minimum = 0
      var type = 'single'
      var answers = []
        for(let a = 0; a < this.state.answers_number; a++){
          if(this.state[`answer_${a+1}`] !== undefined) {
            var isCorrect = ''
            if(this.state[`value_${a+1}`] === undefined) { isCorrect = "false"}
            else {isCorrect = this.state[`value_${a+1}`]
                  }
            var answer = {
              text: this.state[`answer_${a+1}`],
              value: isCorrect,
            }
            if(answer.value === "true") {minimum++}
            answers.push(answer)
          }
        }
        if(minimum > 1) { type = 'multiple'}
        questionData = {
          quizId: this.props.quiz.id,
          text: this.state.question_text,
          answers: answers,
          type: type,
          minimum: minimum
        }
     

        this.props.addQuestion(questionData)
        window.location.reload()
  }
  
  onClickAddAnswer(question) {
    this.setState({ showAddAnswer: true , questionId: question.id});
  }

  handleAddAnswer(e) {
    e.preventDefault();
    const answerData = {
      text: this.state.answerText,
      questionId: this.state.questionId,
      isCorrect: this.state.answerValue
    }

        this.props.addAnswer(answerData)
        window.location.reload()
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClickModify(question) {
    this.setState({ showModify: true, question_text: question.text, questionId: question.id });
  }


  handleModify(e) {
    e.preventDefault();
    const questionData = {
      text: this.state.question_text,
      id: this.state.questionId}
    this.props.renameQuestion(questionData)
    window.location.reload()
  }

  
  onClickModifyAnswer(answer,questionId) {
    this.setState({ showModifyAnswer: true, answerText: answer.text, answerId: answer.id, answerValue: answer.isCorrect, questionId: questionId });
  }


  handleModifyAnswer(e) {
    e.preventDefault();
    const answerData = {
      id: this.state.answerId,
      text: this.state.answerText,
      isCorrect: this.state.answerValue,
      questionId: this.state.questionId}

     
        
    this.props.editAnswer(answerData)
    window.location.reload()
  }


  onClickDelete = (question) => {

    this.setState({
        showDelete: true,
        questionId: question.id,
    })
}
  handleDelete = () => {
    this.props.deleteQuestion(this.state.questionId);
    this.setState({showDelete: false})
    window.location.reload()
  };

  onClickDeleteAnswer(answer,questionId) {
    this.setState({
      showDeleteAnswer: true,
      answerId: answer.id,
      questionId: questionId
  })
  }
  handleDeleteAnswer() {
    const answerData = {
      questionId: this.state.questionId,
      id: this.state.answerId
    }
    this.props.deleteAnswer(answerData);
    this.setState({showDeleteAnswer: false})
    window.location.reload()
  }



  render() {
    const { questions } = this.props;
    
    
    let answersArray = [];
    for(let op = 0; op < this.state.answers_number; op++) {
      answersArray.push(
        <div className="input-group mb-3 col-9" key={op}>
        <label>Réponse .{op+1}</label>
        <input className="form-control" type="text" name={"answer_"+(op+1)} onChange={this.onChange} required />
  <div className="input-group-append">
  <select  className="form-control"  onChange={this.onChange} name={"value_"+(op+1)}>
        <option value={false}>Faux</option>
      <option value={true}>Vrai</option>
  
    </select> 
  </div>
</div>)

      }

    return (
      <div className="container">

      <Modal show={this.state.showAdd} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Ajouter une question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
               <legend>Question </legend> 
             
              <div className="form-row">
              <div className="form-group col-12" >   
               <label htmlFor="questionId">Texte de la question:</label>
        <input className="form-control" type="text" name="question_text" required onChange={this.onChange}  maxLength="100" />
        </div>
        <div className="form-group col-4" >
        <label htmlFor="answers_number">Nombre des réponses:</label>
        <input className="form-control" type="number" name="answers_number" defaultValue="2" min="2" max="6"  onChange={this.onChange} />
        </div>
<br />
        <div className="form-row">
        {answersArray} </div>
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

    <Modal show={this.state.showAddAnswer} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Ajouter une réponse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="input-group mb-3 col-9">
        <label>Réponse</label>
        <input className="form-control" type="text" name="answerText" onChange={this.onChange} required />
  <div className="input-group-append">
  <select  className="form-control"  onChange={this.onChange} name="answerValue">
        <option value={false}>Faux</option>
      <option value={true}>Vrai</option>
  
    </select> 
  </div>
</div>
      </Modal.Body>
      <Modal.Footer>
      <Button  variant="primary" onClick={this.handleAddAnswer} >
          Enregistrer
        </Button>
        <Button variant="secondary" onClick={this.handleClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={this.state.showModify} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Modifier la question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
               <legend>Question</legend> 
             
              <div className="form-row">
              <div className="form-group col-12" >   
               <label htmlFor="question_text">Texte de la question:</label>
        <input className="form-control" type="text" name="question_text" required value={this.state.question_text} onChange={this.onChange}  maxLength="100" />
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


    <Modal show={this.state.showModifyAnswer} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Modifier la réponse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="input-group mb-3 col-9">
        <label>Réponse</label>
        <input className="form-control" type="text" name="answerText" value={this.state.answerText} onChange={this.onChange} required />
  <div className="input-group-append">
  <select  className="form-control"  onChange={this.onChange} defaultValue={this.state.answerValue} name="answerValue">
        <option value={false}>Faux</option>
      <option value={true}>Vrai</option>
  
    </select> 
  </div>
</div>
      </Modal.Body>
      <Modal.Footer>
      <Button  variant="primary" onClick={this.handleModifyAnswer} >
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
      <p>Êtes-vous vraiment sûr de vouloir supprimer cette question?</p>
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

    

<Modal show={this.state.showDeleteAnswer} onHide={this.handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Attention!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p>Êtes-vous vraiment sûr de vouloir supprimer cette réponse?</p>
      </Modal.Body>
      <Modal.Footer>
      <Button  variant="danger" onClick={this.handleDeleteAnswer} >
          Oui
        </Button>
        <Button variant="secondary" onClick={this.handleClose}>
          Non
        </Button>
      </Modal.Footer>
    </Modal>


          <div className="card bg-light">
            <div className="card-header">
        <button className="btn btn-primary float-right" onClick={this.onClickAdd.bind(this)}> <FontAwesomeIcon icon="plus" /> Ajouter une question</button>
            <h3 className="display-6">
             <b>{this.props.quiz.name} </b> 
            </h3>
            </div>
            <div className="card-body">
            {questions.map((question,index) => {return (
            <div key={question.id} >
              
                <p className="lead">
                  <button className="btn-sm btn-danger float-right" onClick={this.onClickDelete.bind(this,question)}><FontAwesomeIcon icon="trash-alt" /> Supprimer</button>
            <button className="btn-sm btn-info float-right" onClick={this.onClickModify.bind(this,question)}><FontAwesomeIcon icon="edit" /> Renommer</button> 
           
           
           {(index+1)+". "+question.text}</p>
         
            {question.answers.map(answer => {
             return <div key={answer.id}>
               <p><button className="btn-sm btn-danger" onClick={this.onClickDeleteAnswer.bind(this,answer,question.id)}><FontAwesomeIcon icon="trash-alt" /> </button>
            <button className="btn-sm btn-info" onClick={this.onClickModifyAnswer.bind(this,answer,question.id)}><FontAwesomeIcon icon="edit" /></button>
            ({answer.isCorrect ?  <i id="check-icon"><FontAwesomeIcon icon="check" /></i> : <i id="times-icon"><FontAwesomeIcon icon="times" /></i>}) {answer.text}  </p>
                </div>
           })}
           {question.answers.length < 6 ? 
            <button className="btn-sm btn-primary" onClick={this.onClickAddAnswer.bind(this,question)}><FontAwesomeIcon icon="plus" /></button>
               : ""} <hr />
                </div>
            )})}
            
</div>
</div></div>
              

       
      
    );
  }
}

EditQuestions.propTypes = {
  quiz: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  question: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  quiz: state.quiz.quiz,
  questions: state.quiz.questions,
  question: state.quiz.question
});

export default connect(
  mapStateToProps,
  {
   getQuiz, getQuestions,  addQuestion, getQuestion, renameQuestion, addAnswer,editAnswer,deleteQuestion,deleteAnswer
  }
)(EditQuestions);