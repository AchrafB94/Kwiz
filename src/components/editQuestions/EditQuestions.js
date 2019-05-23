import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getQuiz } from "../../redux/actions/quizActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class EditQuestions extends Component {

  componentDidMount() {
      const { id } = this.props.match.params;
      this.props.getQuiz(id);
  }


  render() {

    const { quiz } = this.props;
    const { questions } = quiz;

    
    if (questions == null) return null;
    

    return (
      <div className="container">
        <div className="row">
      
          <div className="jumbotron">
            <h1 className="display-6">
              Gestion des questions - {quiz.name}
            </h1>

        <button className="btn btn-primary float-right"> <FontAwesomeIcon icon="plus" /> Ajouter un question</button>

                Nombre de questions: {questions.length} 
      

            <h2>Les questions</h2>
            
            {questions.map((question,index) => {return (
            <div key={question.id} >
              
                <p className="lead"><button className="btn-sm btn-danger float-right"><FontAwesomeIcon icon="trash-alt" /></button>
            <button className="btn-sm btn-primary float-right"><FontAwesomeIcon icon="edit" /></button> {(index+1)+". "+question.text}</p>

                <hr />
                </div>
            )})}
            

</div></div></div>
              

       
      
    );
  }
}

EditQuestions.propTypes = {
  quiz: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  quiz: state.quiz.quiz,
});

export default connect(
  mapStateToProps,
  {
    getQuiz,
  }
)(EditQuestions);
