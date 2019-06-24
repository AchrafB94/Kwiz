import React from "react";

import "./Question.css";

var multipleOptions = {}

function allTrue(obj)
{
  for(var o in obj)
      if(obj[o] === 'false') return false;
    
  return true;
}


class Question extends React.Component {

  state = {
    isChecked: false
  }

  handleChange = e => {
    var option = e.target.value;
    this.props.onSelect(option);
  };

  handleMultipleChange = e => {

    var answer = 'false'

    
    if(!e.target.checked && multipleOptions.hasOwnProperty(e.target.name)) {
      delete multipleOptions[e.target.name];}
      else{
    multipleOptions = {...multipleOptions, [e.target.name]: e.target.value}
    }

    
    if(allTrue(multipleOptions)) {
      answer = 'true';

    }
    
    this.props.onSelect(answer)




  }



    
  
  
  render() {
    return (
      <div>
        <h4 className="card-title">{this.props.data.text}</h4>

        {this.props.data.answers.map(answer => {
          return (
            this.props.data.type === 'multiple' ? 
            <div key={answer.id} className="form-check">
            <label>
              <input
                type="checkbox"
                name={answer.id}
                value={answer.isCorrect}
                onChange={this.handleMultipleChange.bind(this)}
                />{" "}
              <span className="label-text"> {answer.text} </span>
            </label>
          </div>
                 
                 : <div key={answer.id} className="form-check">
              <label>
                <input
                  type="radio"
                  name={this.props.data.id}
                  value={answer.isCorrect}
                  onChange={this.handleChange.bind(this)}
                />{" "}
                <span className="label-text">{answer.text}</span>
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Question;
