import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, withRouter } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Logo from "../../images/logo.png";

class Header extends React.Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    localStorage.removeItem("userlevel");
    window.location.replace("/login");
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
            <FontAwesomeIcon icon="sign-in-alt" size="lg" /> Se connecter
          </Link>
        </li>
      </ul>
    );
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
    );
    return (
      <div>
        <Navbar bg="light" expand="lg" className="border-bottom">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="logo" height="30" style={{ width: "10rem" }} />
          </Link>
          <ul className="navbar-nav "></ul>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {localStorage.usertoken ? userLink : loginRegLink}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);
