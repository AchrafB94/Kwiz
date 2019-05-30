import React from "react";
import TopUsersBySubject from "../cards/TopUsersBySubject";
import TopSchoolsBySubject from "../cards/TopSchoolsBySubject";
import QuizBySubject from "./QuizBySubject";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getSubject} from '../../redux/actions/subjectActions'

import { Link } from "react-router-dom";


import {withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Subject extends React.Component {



  componentDidMount() {
    const { subjectId } = this.props.match.params
    this.props.getSubject(subjectId)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.subjectId !== prevProps.match.params.subjectId){
      const { subjectId } = this.props.match.params
      this.props.getSubject(subjectId)
    }
  }

  render() {


    const subjectId = this.props.subject.id;
    if (subjectId == null ) return null;

    return (
      <div className="row flex-xl-nowrap">
            <div className="col-lg-9 col-xl-9 col-md-12 col-sm-12 mt-4">
            
              
                <h1><span className="badge badge-info">
                   <FontAwesomeIcon icon="book" /> {" "}{this.props.subject.name}
                    </span></h1>
             

              <QuizBySubject subjectId={subjectId} />
            </div>
            <div className="col-lg-3 col-xl-3 col-md-12 col-sm-12 mt-4">
           
              <br />
              <TopUsersBySubject limit="5" subjectId={subjectId} name={this.props.subject.name} />
              <TopSchoolsBySubject limit="5" subjectId={subjectId} name={this.props.subject.name}/>
              <Link to="/stats" type="button" className="btn btn-info btn-block">Toutes les Statistiques</Link></div>
          </div>
    );
  }
}

Subject.propTypes = {
  subject: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  subject: state.subjects.subject
});

export default withRouter(connect(
  mapStateToProps,
  { getSubject }
)(Subject));
