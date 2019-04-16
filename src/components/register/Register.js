import React from "react";
import { register } from "../Functions";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordconfirm: "",
      birthdate: "",
      phone: "",
      levelId: 4,
      schoolId: 1,
      class: "",
      district: "",
      city: "",
      province: "",
      image: "",
      gender: "",

      showPasswordAlert: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOptionChange(changeEvent) {
    this.setState({
      gender: changeEvent.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.password === this.state.passwordconfirm) {
      const user = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        birthdate: this.state.birthdate,
        phone: this.state.phone,
        levelId: this.state.levelId,
        schoolId: this.state.schoolId,
        class: this.state.class,
        district: this.state.district,
        city: this.state.city,
        province: this.state.province,
        image: this.state.image,
        gender: this.state.gender
      };

      register(user).then(res => {
        this.props.history.push(`/login`);
      });
    } else {
      this.setState({
        showPasswordAlert: true,
        password: "",
        passwordconfirm: ""
      });
    }
  }

  render() {
    const passwordAlert = (
      <div>
        {" "}
        <br />
        <div
          className="container alert alert-info alert-dismissible"
          role="alert"
        >
          Oups, ces mots de passe ne correspondent pas.
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );

    return (
      <div className="container">
        <div className="col-md-8 mt-5 mx-auto">
          <form onSubmit={this.onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Inscription à KWIZ</h1>
            <div className="form-group row">
              <div className="form-group col-6">
                <label htmlFor="firstname">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  placeholder="Votre prénom"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="lastname">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  placeholder="Votre nom"
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="form-group col-8 ">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Votre Email"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor="birthdate">Date de naissance</label>
                <input
                  type="date"
                  className="form-control"
                  name="birthdate"
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              {this.state.showPasswordAlert ? passwordAlert : ""}
              <div className="form-group col-6">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  minLength="8"
                  name="password"
                  placeholder="Votre mot de passe"
                  onChange={this.onChange}
                  required
                />

                <small id="fileHelp" class="form-text text-muted">
                  Minimum 8 caractéres.
                </small>
              </div>

              <div className="form-group col-6">
                <label htmlFor="passwordconfirm">
                  Confirmez le mot de passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="passwordconfirm"
                  minLength="8"
                  placeholder="Confirmez votre mot de passe"
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>

            <center>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="Homme"
                  value="Homme"
                  onChange={this.handleOptionChange}
                  checked={this.state.gender === "Homme"}
                />
                <label class="form-check-label" htmlFor="Homme">
                  <big>Homme</big>
                </label>
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="Femme"
                  value="Femme"
                  onChange={this.handleOptionChange}
                  checked={this.state.gender === "Femme"}
                />
                <label class="form-check-label" htmlFor="Femme">
                  <big>Femme</big>
                </label>
              </div>
            </center>

            <hr />
            <div className="row">
              <div className="form-group col-3">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group col-3">
                <label htmlFor="district">Quartier</label>
                <input
                  type="text"
                  className="form-control"
                  name="district"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group col-3">
                <label htmlFor="city">Ville</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group col-3">
                <label htmlFor="province">Province</label>
                <input
                  type="text"
                  className="form-control"
                  name="province"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group  col-3">
                <label htmlFor="levelId">
                  Niveau
                  <select
                    className="form-control"
                    name="levelId"
                    defaultValue={this.state.levelId}
                    onChange={this.onChange}
                  >
                    <option value="1">Primaire</option>
                    <option value="2">Secondaire</option>
                    <option value="3">Universitaire</option>
                    <option value="4">Tout Publique</option>
                  </select>
                </label>
              </div>
              <div className="form-group  col-7">
                <label htmlFor="schoolId">Etablissement</label>
                <input
                  type="text"
                  className="form-control"
                  name="schoolId"
                  onChange={this.onSchoolChange}
                />
              </div>

              <div className="form-group  col-2">
                <label htmlFor="class">Classe</label>
                <input
                  type="text"
                  className="form-control"
                  name="class"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div class="form-group">
              <label for="image">Photo de profile</label>
              <input
                type="file"
                class="form-control-file"
                id="image"
                aria-describedby="fileHelp"
                onChange={this.onChange}
              />
              <small id="fileHelp" class="form-text text-muted">
                This is some placeholder block-level help text for the above
                input. It's a bit lighter and easily wraps to a new line.
              </small>
            </div>

            <button type="submit" className="btn btn-lg btn-info btn-block">
              S'incrire
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
