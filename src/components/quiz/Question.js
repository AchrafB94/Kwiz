import React from "react";

import './Question.css'

class Question extends React.Component {

  handleChange = (e) => {
    var option = e.target.value;
    this.props.onSelect(option);    
    
  }

  render() {
    return (
      <div>
        <h4 className="card-title">{this.props.data.text}</h4>

        




        {this.props.data.answers.map(answer => {
          return (
            <div key={answer.id} className="form-check">


<label>
						<input type="radio" name={this.props.data.id} value={answer.isCorrect} onChange={this.handleChange.bind(this)}/> <span className="label-text">{answer.text}</span>
					</label>
            </div>
          );
        })}
      </div>
    );
  }
}


export default Question;
