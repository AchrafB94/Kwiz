import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt_decode from 'jwt-decode'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Modal, Button, ProgressBar} from 'react-bootstrap'
import gold from './images/gold.png'
import silver from './images/silver.png'


class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.choices = []
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      count: 0,
      score: 0,
      currentQuestion: 0,
      displayResults: false,
      option: "",

      

      show: false,
    };
  }
  


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  begin() {
    this.setState({ currentQuestion: this.state.currentQuestion + 1 });
    this.startTimer();
  }

  handleSubmit(event) {
    event.preventDefault();
    


    const {option} = this.state


    // this.props.saveAnswer(option);
    this.choices.push(option)

    this.setState({ option: "" }); //To reset the state before next question
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });

    if (this.state.currentQuestion + 1 > this.props.quiz.questions.length) {
      this.finishQuiz()
    }
  }

  finishQuiz() {
    
    this.stopTimer();
    var correct = 0;
    var wrong = 0;
    const total = this.props.quiz.questions.length;
    this.choices.map(choice => {
      switch (choice) {
        case 'true':
          return correct++; 
        case 'false':
          return wrong++;
        default:
          return null;
      }
      
    });

    const percentage = Math.round( (correct * 100) / total);
    const time = this.state.count;

    const score = Math.round(percentage * 50 / time);

    //MEDAL
    const medal = 0;

    const decoded = jwt_decode(localStorage.usertoken)
    const UserId = decoded.id
    const scoreData = {
      quizId: this.props.quiz.id,
      userId: UserId,
      schoolId: 1,
      levelId: this.props.quiz.levelId,
      subjectId: this.props.quiz.subjectId,
      score,
      percentage,
      time: this.state.count,
      medal,

    };

    this.props.addScore(scoreData);

    this.setState({
      score: score,
      percentage: percentage,
      correct: correct,
      wrong: wrong,
    })

    this.setState({
      show: true
    });

    //this.props.resetChoices()
  }

  resultsModal() {
    return(
      
      <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Score obtenu: <b>{this.state.score} points</b></Modal.Title>
      </Modal.Header>
      <Modal.Body>
      Bonne chance la prochaine fois!
      <ProgressBar
            animated
              variant="info"
              now={this.state.percentage}
              label={`${this.state.percentage}%`}
            />
            <hr />
            
            <p className="card-text">
              Réponses correctes: {this.state.correct}{" "}
              <i id="check-icon">
                <FontAwesomeIcon icon="check" />
              </i>{" "}
            </p>
            <hr />
            <p className="card-text">
              Mauvaises réponses: {this.state.wrong}{" "}
              <i id="times-icon">
                <FontAwesomeIcon icon="times" />
              </i>{" "}
            </p>
            <hr />
            <p className="card-text">Temps: {this.state.count} secondes</p>
           
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.quit.bind(this)}>
          Quitter
        </Button>
        <Button variant="primary"onClick={this.restart.bind(this)}>
        Essayez à nouveau 
        </Button>
      </Modal.Footer>
    </Modal>
    )
  }

  handleSelection = optionValue => {
    this.setState({ option: optionValue });
  };


  quit() {
    this.props.history.push("/");
    
  }

  restart() {
    window.location.reload();
  }

  

  componentWillUnmount() {
    //this.props.resetChoices()
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ count: this.state.count + 1 });
  }
  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(this.tick.bind(this), 1000);
  }
  stopTimer() {
    clearInterval(this.timer);
  }


  message(medal) {
    
    switch(medal) {
      case 0: return ( <div>
      Aucune médaille n'a encore été donnée. Cela pourrait être votre chance de gagner{" "}
      <b >une médaille d'or!</b>{" "}
      </div>)

case 1: return ( <div>
 <img  src={gold} alt="" height="20px" />  Médaillé d'or: USER avec un temps de 25 secondes. <br />
Cela pourrait être votre chance d'obtenir la deuxième place et remporter une médaille d'argent!
  </div>)

case 2: return ( <div>
 <img  src={gold} alt="" height={20} width="20px" /> Médaillé d'or: USER avec un temps de 25 secondes.  <br />
 <img  src={silver} alt="" height="20px" /> Médaillé d'argent: USER avec un temps de 25 secondes.  <br />

C'est votre dernière chance de réussir ce quiz et d'obtenir une médaille de bronze!
  </div>)

default: return ( <div>
  Ce quiz est fermé. </div>)

  
    }
      
      
    


  }
  render() {
    
    const quiz = this.props.quiz;

    const subject = quiz.subject;
    if (subject == null) return null;
    
    const level = quiz.level;
    if (level == null) return null;

    const questions = quiz.questions;
    if (questions == null) return null;

    
   const quizStart = (
      <div>
        <hr className="my-4" />
        <p>
      Ce quiz contient <b>{questions.length} questions</b> et a été pris <b>{quiz.played} fois</b>. <br />

              {this.message(quiz.medals)}
             </p>

        <p>
          Cliquez sur le bouton <i>"Démarrer"</i> pour lancer ce questionnaire.
          Bonne chance!
        </p>
        <p className="lead">
          <button
            className="btn float-right btn-warning btn-lg"
            onClick={this.begin.bind(this)}
          >
            Démarrer
          </button>
        </p>
      </div>
    );


    const quizDisplay = (
      <div className="card">
        <div className="card-body">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h5 className="text-muted">
              Question {this.state.currentQuestion}/
              {questions.length} -{" "}
              <FontAwesomeIcon icon="stopwatch" /> {this.state.count}{" "}
              sec
            </h5>

           

            <div className="form-group">
              <button
                className="btn btn-lg btn-info float-right"
                type="submit"
              >
                {this.state.currentQuestion ===
                questions.length
                  ? "Voir les résultats >"
                  : "Suivant >"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
    




    return (
      <div className="row">
        <div className="col-lg-9 col-xl-9 col-md-12 col-sm-12 mt-2">
          <div className="jumbotron">
            <h1 className="display-6">
              <span className="badge badge-info">
              {subject.name}</span>{" "}
              <span className="badge badge-secondary">
                Niveau {level.name} {" "}
              </span>{" "} {quiz.name}
             
            </h1>
           
            <p className="lead">{quiz.description}</p>

            {this.state.currentQuestion === 0 ? 
    
              quizStart
            : (this.state.show ? this.resultsModal() : quizDisplay)}
          </div>

          <div>
            <h4>Autres quizz en {subject.name}:</h4>
          </div>
        </div>



        <div className="col-lg-3 col-xl-3 col-md-12 col-sm-12 mt-2 ">
          <div className="mb-2">
          </div>
          
        

          <div><button type="button" className="btn btn-info btn-block">Toutes les Statistiques</button></div>
        </div>
      </div>
    );

  }

}



Quiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  //choices: PropTypes.array.isRequired,
  addScore: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quiz: state.quiz.quiz,
  //choices: state.quiz.choices
});

export default connect(
  mapStateToProps,
  {  }
)(Quiz);