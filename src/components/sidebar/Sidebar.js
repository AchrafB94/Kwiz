import React from 'react';
import SideBarLink from './SideBarLink';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSubjects } from "../redux/actions/quizActions";
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
                to={"/subject/" + m.id}
                label={m.name}
              />
            );
          });
    }

    render() {
        return (
        
        
        <div className=" border-right" id="sidebar-wrapper">
        <div className="list-group list-group-flush">
        {this.mapSubjects()}
        
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
  