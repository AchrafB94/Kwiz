import React from 'react';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
   
    getQuizzesByUser
  } from "../../redux/actions/quizActions";
import RLDD from 'react-list-drag-and-drop/lib/RLDD';


class Organize extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.itemRenderer = this.itemRenderer.bind(this);
    this.handleRLDDChange = this.handleRLDDChange.bind(this);
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      items: nextProps.quizzes
    });
  }

  render() {
    const items = this.state.items;
    return (
      <div>
        <h1>react-list-drag-and-drop</h1>
        <h2>Javascript Example 1: Draggable List of Bananas</h2>
        <p>Drag and drop items to re-order the list.</p>
        <RLDD
          cssClasses="example"
          items={items}
          itemRenderer={this.itemRenderer}
          onChange={this.handleRLDDChange}
        />
      </div>
    );
  }

  itemRenderer(item, index) {
    return (
      <div className="item">
        <p className="title">{item.title}</p>
        <p className="body">{item.body}</p>
        <div className="small">
          item.id: {item.id} - index: {index}
        </div>
      </div>
    );
  }

  handleRLDDChange(reorderedItems) {
    this.setState({ items: reorderedItems });
  }
}


Organize.propTypes = {
    quizzes: PropTypes.array.isRequired,
    subjects: PropTypes.array.isRequired,
    winnersByQuiz: PropTypes.array,
    levels: PropTypes.array.isRequired
  };
  
  const mapStateToProps = state => ({
  
    quizzes: state.quiz.quizzes,
    subjects: state.subjects.subjects,
    winnersByQuiz: state.score.winnersByQuiz,
    levels: state.levels.levels
    
  });
  
  export default connect(
    mapStateToProps,
    {
  
      getQuizzesByUser,
  
    }
  )(Organize);