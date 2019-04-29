import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAvailableQuizzes } from "../../redux/actions/quizActions";
import { Link } from "react-router-dom";




class QuizList extends React.Component {
  componentDidMount() {

   const level = localStorage.userlevel
   this.props.getAvailableQuizzes(level);
  }
  quizCard(quiz) {
  
    return ( 
      <div key={quiz.id}>
        <div className="card ">
          <div className="row no-gutters">
            <div className="col-auto">
              <Link to={"/quiz/" + quiz.id}>
                <img
                  src={require(`../../images/${quiz.subject.image}.png`)}
                  alt=""
                  height="40"
                />
              </Link>
            </div>

            <div className="col">
              <div className="card-block">
                <h4>
                  
                  <Link to={"/quiz/" + quiz.id}>
                    <span className="badge float-right badge-info">
                    {" "}{quiz.subject.name}
                    </span>
                  </Link>{" "}
                  <Link to={"/quiz/" + quiz.id}>{quiz.name}</Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  

    renderHeader(length) {
      switch(length) {
        case 0: return "Aucun challenge n'est disponible pour le moment"
        case 1: return "Un seul challenge est disponible!"
        default: return length+" nouveaux challenges sont disponibles!"
      }
    }
  
    renderLevel(level) {
      switch(level) {
       
        case '1': return "Primaire"
        case '2': return "Secondaire"
        case '3': return "Universitaire"
        case '4': return "Tout Publique"
        default: return ""
       
      }
    }
  

  render() {


      return (
        <div>
            <h2>
          <span className="badge badge-secondary float-right">
                      Niveau {this.renderLevel(localStorage.userlevel)}
                    </span>
           {this.renderHeader(this.props.quizzes.length)}
</h2>
         
          
          {this.props.quizzes.map(quiz => this.quizCard(quiz))}
        </div>
      );
  }
}

QuizList.propTypes = {
  quizzes: PropTypes.array.isRequired,
  getAvailableQuizzes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quizzes: state.quiz.quizzes
});

export default connect(
  mapStateToProps,
  { getAvailableQuizzes }
)(QuizList);
