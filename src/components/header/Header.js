import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, withRouter } from 'react-router-dom'
import Alert from './Alert'
import jwt_decode from 'jwt-decode'
import {Navbar, Nav} from 'react-bootstrap'

class Header extends React.Component{
 
  state = {
    showAlert: false
  }
 
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.setState({
      showAlert: true
    })
    this.props.history.push('/')


}

Username() {
  if(localStorage.usertoken) {
        const decoded = jwt_decode(localStorage.usertoken)
        const username = decoded.firstname+" "+decoded.lastname
        return username
}
}




    render() {
      const loginRegLink = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <Link to="/register" className="nav-link">
                <FontAwesomeIcon icon="clipboard-list" size="lg" /> S'inscrire
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">
                <FontAwesomeIcon icon="sign-in-alt" size="lg"/> Se connecter
                </Link>
            </li>

        </ul>
    )
    const userLink = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <Link to="/profile" className="nav-link">
                <FontAwesomeIcon icon="user" size="lg"/> {this.Username()}
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/settings" className="nav-link">
                <FontAwesomeIcon icon="cog" size="lg"/> Paramètres
                </Link>
            </li>
            <li className="nav-item">
                <a href="/" onClick={this.logOut.bind(this)} className="nav-link">
                <FontAwesomeIcon icon="sign-out-alt" size="lg"/> Se deconnecter
                </a>
            </li>
        </ul>
    )


        return(
<div>
<Navbar bg="light" expand="lg" className="border-bottom">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Link to="/" className="nav-link"><FontAwesomeIcon icon="home" size="lg"/> Accueil <span className="sr-only">(current)</span></Link>
      <Link to="/stats" className="nav-link"><FontAwesomeIcon icon="list-ol" size="lg"/> Statistiques <span className="sr-only">(current)</span></Link>
    </Nav>
    {localStorage.usertoken ? userLink : loginRegLink}
  </Navbar.Collapse>
</Navbar>
          {this.state.showAlert ? <Alert /> : ''}
</div>

        )

    }
    

}

export default withRouter(Header);