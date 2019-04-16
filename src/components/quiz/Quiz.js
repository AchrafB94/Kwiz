import React from "react";
import Lots from "../cards/MedalCard";
import Question from "./Question";
import TopUsersBySubject from "../cards/TopUsersBySubject";
import TopSchoolsBySubject from "../cards/TopSchoolsBySubject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressBar } from "react-bootstrap";
import jwt_decode from 'jwt-decode'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getQuiz,
  saveAnswer,
  addScore
} from "../redux/actions/quizActions";

import "./Quiz.css";
import QuizSuggestions from "./QuizSuggestions";

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      score: 0,
      currentQuestion: 0,
      displayResults: false,
      option: ""
    };
  }
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getQuiz(id);
    
    
    



  }


  begin() {
    
    this.setState({ currentQuestion: this.state.currentQuestion + 1 });
    this.startTimer();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveAnswer(this.state.option);
    this.setState({ option: "" }); //To reset the state before next question

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });

    if (this.state.currentQuestion + 1 > this.props.quiz.questions.length) {
      this.setState({
        displayResults: true
      });
    }
  }

  handleSelection = optionValue => {
    this.setState({ option: optionValue });
  };

  showResults() {
    this.stopTimer();
    var correct = 0;
    var wrong = 0;
    const total = this.props.quiz.questions.length;
    this.props.choices.map(choice => {
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

    const score = Math.round(percentage * 100 / time);
    const medal = "none";

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

    return (
      <div className="popup-container">
        <div className="container">
          <div className="col-md-8 col-md-offset-2">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">
                  Score obtenu: <b>{score} points</b> - Bonne chance la prochaine fois!
                </h5>
              </div>

              <div className="card-body popup">
            
                <ProgressBar
                animated
                  variant="info"
                  now={percentage}
                  label={`${percentage}%`}
                />
                <hr />
                <p className="card-text">
                  Réponses correctes: {correct}{" "}
                  <i id="check-icon">
                    <FontAwesomeIcon icon="check" />
                  </i>{" "}
                </p>
                <hr />
                <p className="card-text">
                  Mauvaises réponses: {wrong}{" "}
                  <i id="times-icon">
                    <FontAwesomeIcon icon="times" />
                  </i>{" "}
                </p>
                <hr />
                <p className="card-text">Temps: {this.state.count} secondes</p>
                <hr />
                <button
                  className="btn btn-info"
                  onClick={this.restart.bind(this)}
                >
                  Essayez à nouveau
                </button>{" "}
                <button className="btn btn-dark" onClick={this.quit.bind(this)}>
                  Quitter
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  quit() {
    this.props.history.push("/");
    
  }

  restart() {
    window.location.reload();
  }

  componentWillUnmount() {
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
          Cliquez sur le bouton <i>"Démarrer"</i> pour lancer ce questionnaire.
          Bonne chance!
        </p>
        <p className="lead">
          <button
            className="btn btn-warning btn-lg"
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

            {questions.map((question, i) => {
              if (this.state.currentQuestion - 1 === i)
                return (
                  <Question
                    key={question.id}
                    data={question}
                    onSelect={this.handleSelection}
                  />
                );
              else return null;
            })}

            <div className="form-group">
              <button
                className="btn btn-info float-right"
                type="submit"
              >
                {this.state.currentQuestion ===
                questions.length
                  ? "Voir les resultats >"
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
            { }
            <p className="lead">
              Ce quiz contient <b>{questions.length} questions</b> et
              a été pris <b>{quiz.played} fois</b>, aucune médaille
              n'a encore été donnée. Cela pourrait être votre chance de gagner{" "}
              <b>une médaille d'or!</b>{" "}
            </p>
            <p className="lead">{quiz.description}</p>

            {this.state.currentQuestion === 0 ? (
              quizStart
            ) : this.state.displayResults ? (
              this.showResults(quiz)
            ) : quizDisplay }
          </div>

          <div>
            <h4>Autres quizz en {subject.name}:</h4>
                        <QuizSuggestions subjectId={subject.id}  currentId={quiz.id} />
          </div>
        </div>

        <div className="col-lg-3 col-xl-3 col-md-12 col-sm-12 mt-2 ">
          <div className="mb-2">
            <Lots />
          </div>
          
          <TopUsersBySubject limit="5" subjectId={subject.id} name={subject.name} />
              <TopSchoolsBySubject limit="5" subjectId={subject.id} name={subject.name}/>

          <div><button type="button" className="btn btn-info btn-block">Toutes les Statistiques</button></div>
        </div>
      </div>
    );
  }
}



Quiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  getQuiz: PropTypes.func.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  choices: PropTypes.array.isRequired,
  addScore: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quiz: state.quiz.quiz,
  choices: state.quiz.choices
});

export default connect(
  mapStateToProps,
  { getQuiz, saveAnswer, addScore }
)(Quiz);