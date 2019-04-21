import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, withRouter } from 'react-router-dom'
import Alert from '../alert/Alert'
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
    this.props.history.push('/home')


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
                <FontAwesomeIcon icon="plus" size="lg" /> S'inscrire
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/" className="nav-link">
                <FontAwesomeIcon icon="sign-in-alt" size="lg"/> Se connecter
                </Link>
            </li>

        </ul>
    )
    const userLink = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <div className="nav-link"><FontAwesomeIcon icon="bell" size="lg"    /></div>
            </li>

            <li className="nav-item">
                <Link to="/profile" className="nav-link">
                <FontAwesomeIcon icon="user" /> Mon Profile
                </Link>
            </li>
            
            <li className="nav-item">
                <Link to="/settings" className="nav-link">
                <FontAwesomeIcon icon="cog" /> Paramètres
                </Link>
            </li>
            <li className="nav-item">
                <a href="/" onClick={this.logOut.bind(this)} className="nav-link">
                <FontAwesomeIcon icon="sign-out-alt" /> Se deconnecter
                </a>
            </li>
        </ul>
    )


        return(
<div>
<Navbar bg="light" expand="lg" className="border-bottom">
<a className="navbar-brand" href="/">KWIZ LOGO KWIZ</a>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Link to="/" className="nav-link"><FontAwesomeIcon icon="home" /> Accueil <span className="sr-only">(current)</span></Link>
      <Link to="/stats" className="nav-link"><FontAwesomeIcon icon="list-ol" /> Statistiques <span className="sr-only">(current)</span></Link>
      <Link to="/forum" className="nav-link"><FontAwesomeIcon icon="comments"/> 2K-PI <span className="sr-only">(current)</span></Link>
      </Nav>
    {localStorage.usertoken ? userLink : loginRegLink}
    
  
  </Navbar.Collapse>
</Navbar>
          {this.state.showAlert ? <Alert color="warning" header="Vous avez été déconnecté!" text="" link="/login" linktext="Reconnectez-vous à nouveau!" /> : ''}
</div>

        )

    }
    

}

export default withRouter(Header);