import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSubjects } from "../../redux/actions/quizActions";
import "./Sidebar.css";

import { Link } from "react-router-dom";
class Sidebar extends React.Component {


  state = {
    selected: 2

  }

  

  componentDidMount() {

      this.props.getSubjects()
    
    
  }




  render() {
    return (
      <div className="border-right" id="sidebar-wrapper">
        <div className="list-group  list-group-flush" >
        {this.props.subjects.map((subject) => {
      return (
        <div key={subject.id} >
          <Link  to={"/subject/" + subject.id} className="list-group-item list-group-item-action" >{subject.name}</Link>
          </div>
      )})}
    </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  subjects: PropTypes.array.isRequired,
  getSubjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  subjects: state.quiz.subjects,
  loadSubjects: state.quiz.loadSubjects
});

export default connect(
  mapStateToProps,
  { getSubjects }
)(Sidebar);
