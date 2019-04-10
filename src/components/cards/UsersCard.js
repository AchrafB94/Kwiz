import React from 'react';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getNewestUser, usersCount
} from "../redux/actions/userActions";

class UserCard extends React.Component{

    componentDidMount() {
        this.props.usersCount()
        this.props.getNewestUser()
        
    }

    render() {

        
    if (this.props.count == null) return null;
    if (this.props.newestUser == null) return null;
        
        return(
            <div className="card">
            <div className="card-header">
              <small className="text-muted">
                Nouveau Membre: <b>{this.props.newestUser.map(user => user.firstname+" "+user.lastname)}</b>
              </small>
            </div>
            <div className="card-footer">
              <small className="text-muted">
                <b>{this.props.count}</b> utilisateurs inscrits - <b>?</b> utilisatuers connectés
              </small>
            </div>
          </div>
        )
    }
}

UserCard.propTypes = {
    count: PropTypes.number.isRequired,
    newestUser: PropTypes.array.isRequired,
    usersCount: PropTypes.func.isRequired,
    getNewestUser: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    count: state.user.count,
    newestUser: state.user.newestUser
  });
  
  export default connect(
    mapStateToProps,
    { getNewestUser,usersCount }
  )(UserCard);
  