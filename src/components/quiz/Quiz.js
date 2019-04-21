import React from "react";
import MedalCard from "../cards/MedalCard";
import Question from "./Question";
import TopUsersBySubject from "../cards/TopUsersBySubject";
import TopSchoolsBySubject from "../cards/TopSchoolsBySubject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getQuiz, saveAnswer, addScore } from "../../redux/actions/quizActions";
import { checkWinner } from "../../redux/actions/scoreActions";
import "./Quiz.css";
import QuizSuggestions from "./QuizSuggestions";
import { Modal, Button, ProgressBar, Alert } from "react-bootstrap";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.choices = [];
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      count: 0,
      score: 0,
      currentQuestion: 0,
      displayResults: false,
      option: "",

      userId: 0,

      show: false,
      modalTitle: "Bonne chance la prochaine fois!",
      medal: ""
    };
  }
  componentDidMount() {
    const decoded = jwt_decode(localStorage.usertoken);
    this.setState({
      userId: decoded.id
    });

    const { id } = this.props.match.params;
    this.props.getQuiz(id);

    this.props.checkWinner(id,this.state.userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const { id } = this.props.match.params;
      this.props.getQuiz(id);
    }
  }

  handleClose() {
    this.setState({ show: false });
    window.location.reload();
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

    const { option } = this.state;

    // this.props.saveAnswer(option);
    this.choices.push(option);

    this.setState({ option: "" }); //To reset the state before next question
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });

    if (this.state.currentQuestion + 1 > this.props.quiz.questions.length) {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    this.stopTimer();
    var correct = 0;
    var wrong = 0;
    const total = this.props.quiz.questions.length;
    this.choices.map(choice => {
      switch (choice) {
        case "true":
          return correct++;
        case "false":
          return wrong++;
        default:
          return null;
      }
    });

    const percentage = Math.round((correct * 100) / total);
    const time = this.state.count;

    var score = Math.round((percentage * 50) / time);
    var medal = 0;

    //MEDAL
    if (percentage === 100) {
      if (this.props.quiz.medals === 0) {
        medal = 100;
        score = score + 100;
        this.setState({
          modalTitle:
            "Félicitations! Vous êtes le premier participant à remporter ce quiz. Vous avez reçu une médaille d'or!",
          medal: "gold"
        });
      } else if (this.props.quiz.medals === 1) {
        medal = 10;
        score = score + 80;
        this.setState({
          modalTitle:
            "Félicitations! Vous êtes le deuxième participant à réussir ce quiz! Vous avez gagné une médaille d'argent!",
          medal: "silver"
        });
      } else if (this.props.quiz.medals === 2) {
        medal = 1;
        score = score + 50;
        this.setState({
          modalTitle:
            "Félicitations! vous êtes le troisième participant à réussir ce quiz, vous avez remporté une médaille de bronze!",
          medal: "bronze"
        });
      }
    }

    const scoreData = {
      quizId: this.props.quiz.id,
      userId: this.state.userId,
      schoolId: 1,
      levelId: this.props.quiz.levelId,
      subjectId: this.props.quiz.subjectId,
      score,
      percentage,
      time: this.state.count,
      medal
    };

    this.props.addScore(scoreData);

    this.setState({
      score: score,
      percentage: percentage,
      correct: correct,
      wrong: wrong
    });

    this.setState({
      show: true
    });
  }

  medalImage(medal) {
    switch (medal) {
      case "gold":
        return require(`../../images/${medal}.png`);
      case "silver":
        return require(`../../images/${medal}.png`);
      case "bronze":
        return require(`../../images/${medal}.png`);
      default:
        return null;
    }
  }

  resultsModal() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <img src={this.medalImage(this.state.medal)} alt="" />
          </center>
          <br />
          {this.state.modalImage}
          Score obtenu: <b>{this.state.score} points</b>
          <ProgressBar
            animated
            variant="info"
            now={this.state.percentage}
            label={`${this.state.percentage}%`}
          />
          <hr />
          <p className="card-text text-center">
            Réponses correctes: {this.state.correct}{" "}
            <i id="check-icon">
              <FontAwesomeIcon icon="check" />
            </i>{" "}
          </p>
          <hr />
          <p className="card-text text-center">
            Mauvaises réponses: {this.state.wrong}{" "}
            <i id="times-icon">
              <FontAwesomeIcon icon="times" />
            </i>{" "}
          </p>
          <hr />
          <p className="card-text text-center">
            Temps: {this.state.count} secondes
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.quit.bind(this)}>
            Quitter
          </Button>
          {this.medal ? (
            ""
          ) : (
            <Button variant="primary" onClick={this.restart.bind(this)}>
              Essayez à nouveau
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
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

  render() {
    console.log(this.props.winner);

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
        <p className="lead">
          {" "}
          Ce quiz contient <b>{questions.length} questions</b> et a été pris{" "}
          <b>{quiz.played} fois</b>.{" "}
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
              Question {this.state.currentQuestion}/{questions.length} -{" "}
              <FontAwesomeIcon icon="stopwatch" /> {this.state.count} sec
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
              <button className="btn btn-lg btn-info float-right" type="submit">
                {this.state.currentQuestion === questions.length
                  ? "Voir les résultats >"
                  : "Suivant >"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );

    return (
      <div className="row">
        <div className="col-lg-9 col-xl-9 col-md-12 col-sm-12 mt-2">
          <div className="jumbotron">
            <h1 className="display-6">
              <span className="badge badge-info">{subject.name}</span>{" "}
              <span className="badge badge-secondary">
                Niveau {level.name}{" "}
              </span>{" "}
              {quiz.name}
            </h1>

            <p className="lead">{quiz.description}</p>
            <br />
            {quiz.rank === 1 ? (
              this.state.currentQuestion === 0 ? (
                quizStart
              ) : this.state.show ? (
                this.resultsModal()
              ) : (
                quizDisplay
              )
            ) : (
              <Alert variant="dark">
                <Alert.Heading>Ce quiz est fermé!</Alert.Heading>
                <p>Vous ne pouvez plus jouer à ce quiz.</p>
              </Alert>
            )}
          </div>

          <div>
            <h4>Autres quizz en {subject.name}:</h4>
            <QuizSuggestions subjectId={subject.id} currentId={quiz.id} />
          </div>
        </div>

        <div className="col-lg-3 col-xl-3 col-md-12 col-sm-12 mt-2 ">
          <div className="mb-2">
            <MedalCard medals={quiz.medals} />
          </div>

          <TopUsersBySubject
            limit="5"
            subjectId={subject.id}
            name={subject.name}
          />
          <TopSchoolsBySubject
            limit="5"
            subjectId={subject.id}
            name={subject.name}
          />

          <div>
            <button type="button" className="btn btn-info btn-block">
              Toutes les Statistiques
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Quiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  getQuiz: PropTypes.func.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
  winner: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  quiz: state.quiz.quiz,
  winner: state.score.winner
});

export default connect(
  mapStateToProps,
  { getQuiz, saveAnswer, addScore, checkWinner }
)(Quiz);
