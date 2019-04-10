import React from 'react';
import SideBarLink from './SideBarLink';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSubjects } from "../redux/actions/quizActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends React.Component {

    componentDidMount() {
        this.props.getSubjects();
      }
    

    mapSubjects() {
        return this.props.subjects.map((m,i) => {
            return (
              <SideBarLink
                key={i}
                activeOnlyWhenExact={true}
                to={"/matieres/" + m.link}
                label={m.name}
              />
            );
          });
    }

    render() {
        return (<div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">KWIZ LOGO </div>
        <div className="list-group list-group-flush">
        {this.mapSubjects()}
        </div>
        
        <div className="list-group list-group-flush">
          <Link to="/forum" id="forum" className="list-group-item list-group-item-action bg-light"><FontAwesomeIcon icon="comments" size="lg" />{" "} <b>2K-PI</b></Link>
          </div>
      </div>)
    }
}


Sidebar.propTypes = {
    subjects: PropTypes.array.isRequired,
    getSubjects: PropTypes.func.isRequired
  };
  



  const mapStateToProps = state => ({
    subjects: state.quiz.subjects
  });
  
  export default connect(
    mapStateToProps,
    { getSubjects }
  )(Sidebar);
  