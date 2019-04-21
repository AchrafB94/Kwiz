import React from "react";

import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser, updateUser } from "../../redux/actions/userActions";

class ProfileModify extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      firstname: "",
      lastname: "",
      birthdate: "",
      phone: "",
      levelId: null,
      district: "",
      city: "",
      province: "",
      image: "",
      gender: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    const userId = decoded.id;
    this.props.getUser(userId);
    this.setState({
      gender: this.props.user.gender,
      id: userId
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    const {
      firstname,
      lastname,
      birthdate,
      district,
      city,
      province,
      levelId,
      phone,
      gender
    } = nextProps.user;
    this.setState({
      firstname,
      lastname,
      birthdate,
      district,
      city,
      province,
      levelId,
      phone,
      gender
    });
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleOptionChange(changeEvent) {
    this.setState({
      gender: changeEvent.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const {
      id,
      firstname,
      lastname,
      birthdate,
      district,
      city,
      province,
      levelId,
      phone
    } = this.state;

    const updUser = {
      id,
      firstname,
      lastname,
      birthdate,
      district,
      city,
      province,
      levelId,
      phone
    };
    
  this.props.updateUser(updUser);

  // Clear State
  this.setState({
      id: null,
      firstname: "",
      lastname: "",
      birthdate: "",
      phone: "",
      levelId: null,
      district: "",
      city: "",
      province: "",
      image: "",
      gender: ""
  });

  this.props.history.push('/');
  }

  

  render() {
    const {
      firstname,
      lastname,
      birthdate,
      district,
      city,
      province,
      levelId,
      phone,
    } = this.state;

    return (
      <div className="container">
        <div className="col-md-8 mt-5 mx-auto">
          <form onSubmit={this.onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">
              Modifier votre profile
            </h1>
            <div className="form-group row">
              <div className="form-group col-6">
                <label htmlFor="firstname">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  placeholder="Votre prénom"
                  value={firstname}
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
                  value={lastname}
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="form-group col-4">
                <label htmlFor="birthdate">Date de naissance</label>
                <input
                  type="date"
                  className="form-control"
                  name="birthdate"
                  onChange={this.onChange}
                  value={birthdate}
                  required
                />
              </div>
              <div className="form-group  col-3">
                <label htmlFor="levelId">
                  Niveau
                  <select
                    className="form-control"
                    name="levelId"
                    defaultValue={levelId}
                    onChange={this.onChange}
                  >
                    <option value="1">Primaire</option>
                    <option value="2">Secondaire</option>
                    <option value="3">Universitaire</option>
                    <option value="4">Tout Publique</option>
                  </select>
                </label>
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
                  value={phone}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group col-3">
                <label htmlFor="district">Quartier</label>
                <input
                  type="text"
                  className="form-control"
                  name="district"
                  value={district}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group col-3">
                <label htmlFor="city">Ville</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={city}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group col-3">
                <label htmlFor="province">Province</label>
                <input
                  type="text"
                  className="form-control"
                  name="province"
                  value={province}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div class="form-group">
              <label for="image">Changez votre photo de profile</label>
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
              Enregistrez
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ProfileModify.propTypes = {
  user: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { getUser, updateUser }
)(ProfileModify);