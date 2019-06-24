import React from 'react'
import PropTypes from "prop-types";
import './QuizCreate.css'
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { getSubjects } from "../../redux/actions/subjectActions";
import { getLevels } from "../../redux/actions/levelActions";
import { createQuiz } from "../../redux/actions/quizActions"

class QuizCreate extends React.Component{


    constructor(props) {
        super(props)
        this.state = {
            name: "",
            description: "",
            levelId: 1,
            subjectId: 1,
            userId: "",

            number: 1,
            defaultValue: "0"

            

        }
        this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    
  componentDidMount() {

    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    const userId = decoded.id;

    this.setState({userId: userId})
    
    this.props.getSubjects()
    this.props.getLevels()

  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const {name, description, levelId, subjectId, userId} = this.state
  
    
    

    var questionsData = []
    

    for (let q = 0; q < this.state.number; q++) {
      var minimum = 0
      var type = 'single'
      
      var answers = []
        for(let a = 0; a < this.state[`answers_number_${q+1}`]; a++){


          if(this.state[`answer_${q+1}_${a+1}`] !== undefined) {
            var isCorrect = ''
            

            if(this.state[`value_${q+1}_${a+1}`] === undefined) { isCorrect = "false"}
            else {isCorrect = this.state[`value_${q+1}_${a+1}`]
                  }
            
            var answer = {
              text: this.state[`answer_${q+1}_${a+1}`],
              value: isCorrect,
            }

            if(answer.value === "true") {minimum++}
         
            answers.push(answer)

          }
         
        }
        if(minimum > 1) { type = 'multiple'}
        var question = {
          text: this.state[`question_${q+1}`],
          answers: answers,
          type: type,
          minimum: minimum
        }

        questionsData.push(question)

    }

    const quizData = {
      name, description, levelId, subjectId, userId, questionsData
  }
   this.props.createQuiz(quizData)
   window.location.replace('/contrib')
}


    render() {
            let questions = [];
            
            for (let q = 0; q < this.state.number; q++) {
              let answers = [];
              
              for(let op = 0; op < this.state[`answers_number_${q+1}`]; op++) {
                answers.push(
                  <div class="input-group mb-3 col-5">
                  <label>Réponse {q+1}.{op+1}</label>
                  <input className="form-control" type="text" name={"answer_"+(q+1)+"_"+(op+1)} onChange={this.onChange} required />
            <div class="input-group-append">
            <select  className="form-control"  onChange={this.onChange} name={"value_"+(q+1)+"_"+(op+1)}>
                  <option value={false}>Faux</option>
                <option value={true}>Vrai</option>
            
              </select> 
            </div>
          </div>)
              }

              questions.push(<div key={q}>  <hr />
               <legend>Question {q+1}</legend> 
             
              <div className="form-row">
              <div className="form-group col-10" >   
               <label htmlFor={"question_"+(q+1)}>Texte de la question:</label>
        <input className="form-control" type="text" name={"question_"+(q+1)} required onChange={this.onChange}  maxLength="100" />
        </div>
        <div className="form-group col-2" >
        <label htmlFor="answers_number">Nombre des réponses:</label>
        <input className="form-control" type="number" name={"answers_number_"+(q+1)} defaultValue="2" min="2" max="6"  onChange={this.onChange} />
        </div>
<br />
        <div className="form-row">
        {answers}  </div>
         </div></div>);
            }
        return ( 
        <div className="container">
          <div className="card bg-light">
          <h2 className="card-header">Créer un quiz</h2>
       <div className="card-body">
        <form onSubmit={this.onSubmit}>

        <div className="form-group col-6">
        <label htmlFor="name">Titre du Quiz:</label>
        <input className="form-control" type="text" name="name" onChange={this.onChange} value={this.state.name}  maxLength="100" required />
        </div>

        <div className="form-group col-12">
        <label htmlFor="description">Description:</label>
        <textarea className="form-control"  type="text" name="description" onChange={this.onChange}  rows="5" value={this.state.description}/>
        </div>

        <div className="form-row">
        <div className="form-group col-3">
        <label htmlFor="levelId">
                  Niveau
                  <select
                    className="form-control"
                    name="levelId"
                    defaultValue={this.state.levelId}
                    onChange={this.onChange}
                  >
                    {this.props.levels.map(level => <option key={level.id} value={level.id}>{level.name}</option>)}
                  </select>
                </label>
        </div>

        <div className="form-group col-3">
        <label htmlFor="subjectId">Matiére

        <select className="form-control" name="subjectId" defaultValue={this.state.levelId} onChange={this.onChange} >
        {this.props.subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
        </select>
        
        </label>
        
      
      
        </div>
        <div className="form-group col-2">
        <label htmlFor="number">Nombre de questions:</label>
        <input className="form-control"  type="number" name="number" min="3" max="30" onChange={this.onChange}  value={this.state.number}/>
        </div>
        </div>
      {questions}

          <div className="form-inline float-right" >
      <input type="submit" className="btn btn-lg btn-info float-right" value="Enregistrer" />
          </div>
     
      </form></div> </div></div>)
    }
}
QuizCreate.propTypes = {
    subjects: PropTypes.array.isRequired,
    question: PropTypes.object,
    levels: PropTypes.array.isRequired
  };
  
  const mapStateToProps = state => ({
    subjects: state.subjects.subjects,
    question: state.quiz.question,
    levels: state.levels.levels
  });
  
  export default connect(
    mapStateToProps,
    {
  
      getSubjects,createQuiz, getLevels
  
  
    }
  )(QuizCreate);