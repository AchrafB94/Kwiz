import React from "react";
import "./Admin.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNewMembers } from "../../redux/actions/userActions"
import defaultPhoto from '../../images/default.png'
import {Link} from 'react-router-dom'






class AdminNewUsers extends React.Component {
  componentDidMount() {
    this.props.getNewMembers()
    
  }


  render() { 
    return (
          <div className="card bg-light">
              <div className="card-header">Nouveaux membres</div>
              <div className="card-text">
              <table className="table table-hover">
              <tbody>
              {this.props.users.map(user => <tr key={user.id}>
              <td>{user.image ? <img src={"http://localhost/kwiz/public/images/"+user.image} height="25" width="25" className="thumbnail" alt="" /> 
                : <img src={defaultPhoto} height="25" width="25" className="thumbnail" alt="" />}</td>
                <td><Link to={"/user/"+user.id}>{user.firstname+" "+user.lastname}</Link></td>
                <td>{user.school ? <Link to={"/school/"+user.school.id}>{user.school ? user.school.name : ''}</Link> : " "}</td>
                </tr>
                )}</tbody>
               </table>
              </div>
            </div>
    );
  }
}

AdminNewUsers.propTypes = {
    users: PropTypes.array.isRequired,
  
};

const mapStateToProps = state => ({
    users: state.user.users,
  
});

export default connect(
  mapStateToProps,
  {
    getNewMembers
  }
)(AdminNewUsers);
