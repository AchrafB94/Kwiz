import React from "react";
import { register } from "../Functions";



class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    };

    register(user).then(res => {
      this.props.history.push(`/login`);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-6 mt-5 mx-auto">
          <form onSubmit={this.onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Isncription à KWIZ</h1>
            <div className="form-group">
              <label htmlFor="firstname">Prénom</label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                placeholder="Votre prénom"
                value={this.state.firstname}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Nom</label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                placeholder="Votre nom"
                value={this.state.lastname}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Votre Email"
                value={this.state.email}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Votre mot de passe"
                value={this.state.password}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordconfirm">Confirmez le mot de passe</label>
              <input
                type="password"
                className="form-control"
                name="passwordconfirm"
                placeholder="Confirmez votre mot de passe"
                value={this.state.password}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthdate">Date de naissance</label>
              <input
                type="date"
                className="form-control"
                name="birthdate"
                value={this.state.birthdate}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group">
            <div className="form-check-inline">
             
                <input className="form-check-input" type="radio" name="gender" value="Homme" />
                <label className="form-check-label">
                <h5>Homme</h5>
              </label>
                <input className="form-check-input" type="radio" name="gender" value="Femme" />
                <label className="form-check-label">
                <h5>Femme</h5>
              </label>
              </div>
            </div>

            <button type="submit" className="btn btn-lg btn-info btn-block">
              Continuer
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
