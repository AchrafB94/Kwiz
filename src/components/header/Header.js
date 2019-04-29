import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import {Navbar, Nav, OverlayTrigger, Popover} from 'react-bootstrap'
 

const popover = (
  <Popover id="popover-basic" title="Notifications">
    And here's some <strong>amazing</strong> content. It's very engaging. right?
  </Popover>
);

const Example = () => (
  <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
     <div className="nav-link"><FontAwesomeIcon icon="bell" size="lg"    /></div>
  </OverlayTrigger>
);

class Header extends React.Component{
 


  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    localStorage.removeItem('userlevel')
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
                <FontAwesomeIcon icon="plus" size="lg" /> S'inscrire
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
                <FontAwesomeIcon icon="user" /> Mon Profile
                </Link>
            </li>
            
            <li className="nav-item">
                <Link to="/settings/profile" className="nav-link">
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
</div>

        )

    }
    

}

export default withRouter(Header);