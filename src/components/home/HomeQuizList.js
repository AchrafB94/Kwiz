import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAvailableQuizzes } from "../../redux/actions/quizActions";
import { Link } from "react-router-dom";



class QuizList extends React.Component {
  componentDidMount() {

   this.props.getAvailableQuizzes();
  }
  renderHeader(length) {
    switch(length) {
      case 0: return "Aucun challenge n'est disponible pour le moment"
      case 1: return "Un seul challenge est disponible!"
      default: return length+" challenges sont actuellement disponibles!"
    }
  }


  quizCard(quiz) {
  
    return ( 
      <div key={quiz.id}>
        <div className="card ">
          <div className="row no-gutters">
            <div className="col">
              <div className="card-block">
                <h3>
                <Link to={"/quiz/" + quiz.id} ><span className="badge badge-secondary">
          Niveau {quiz.level.name}
                    </span>
                    
                    </Link>{" "}
                  {quiz.subject ? <Link to={"/subject/" + quiz.subject.id}>
                    <span className="badge badge-info">
                    {" "}{quiz.subject.name}
                    </span>
                  </Link> : "" }{" "}
                  <Link to={"/quiz/" + quiz.id}>{quiz.name}</Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  


  

  render() {


      return (
        <div>
            <h2>

                      
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
