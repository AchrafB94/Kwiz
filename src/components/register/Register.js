import React from "react";
import { Alert } from "react-bootstrap";
import Select from 'react-select';
import { getSchools } from "../../redux/actions/schoolActions";
import { register } from "../../redux/actions/userActions"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLevels } from "../../redux/actions/levelActions";


function isStrongPwd1(password) {
 
  var regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  var validPassword = regExp.test(password);

  return validPassword;

}


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
      levelId: 1,
      schoolId: 1,
      school: "",
      class: "",
      gender: "",


      showPasswordAlert: false,
      showRegisterAlert: false,
      showPasswordRules: false,

    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidMount() {
    this.props.getSchools()
    this.props.getLevels()
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

    if(!isStrongPwd1(this.state.password)) {
 
      this.setState({showPasswordRules: true})

  }

   else if (this.state.password === this.state.passwordconfirm) {
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
        gender: this.state.gender,
      };

      
      this.props.register(user).then(res => {
       
        if(res.code === 10) {
          this.setState({showRegisterAlert: true})
        } else {
          this.props.history.push(`/login`);
        }
        
        
      })
        
      
    } else {
      this.setState({
        showPasswordAlert: true,
        password: "",
        passwordconfirm: ""
      });
    }
  }
  handleSchoolChange = (newValue, actionMeta) => {

    if(newValue){
      this.setState({
        schoolId: newValue.value
      })
    }



  };
  handleSchoolInputChange = (inputValue, actionMeta) => {
  }

  render() {
    const handleClose = () => this.setState({ showPasswordAlert: false, showPasswordRules: false, showRegisterAlert: false });
   
       


    const registerAlert = (
      <Alert dismissible onClose={() => this.setState({ showRegisterAlert: false })} variant="danger">

<p>
Un compte avec cet email existe déjà.
</p>
</Alert>
     
  );
     
  const options = this.props.schools.map(school => {return {value: school.id, label: school.name}})
    
    return (
      <div className="container">
        <div className="col-md-8 mt-5 mx-auto">
          <form onSubmit={this.onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Inscription à KWIZ</h1>
            {this.state.showRegisterAlert ? registerAlert : ""}
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
              <div className="form-group col-5 ">
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
              <div className="form-group col-3">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  onChange={this.onChange}
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
            <Alert dismissible show={this.state.showPasswordAlert} onClose={handleClose} variant="info">
  <Alert.Heading>Oups, ces mots de passe ne correspondent pas!</Alert.Heading>
  <p>
  Assurez-vous de taper le mot de passe correct et essayez à nouveau!
  </p>
</Alert>
            <div className="row">
              
              <div className="form-group col-6">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  minLength="8"
                  maxLength="15"
                  name="password"
                  placeholder="Votre mot de passe"
                  onChange={this.onChange}
                  required
                />


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
                  maxLength="15"
                  placeholder="Confirmez votre mot de passe"
                  onChange={this.onChange}
                  required
                />
              </div>

              <Alert dismissible show={this.state.showPasswordRules} onClose={handleClose} variant="info">
  <Alert.Heading> Le mot de passe doit :</Alert.Heading>
  <p className="form-text text-muted">

    <ul>
    <li>avoir entre 8 et 15 caractères</li>
    <li>respecter les règles suivantes :</li>
    <ul>
    <li>avoir au moins une minuscule</li>
    <li>avoir au moins une majuscule</li>
    <li>avoir au moins un chiffre</li>
    <li>avoir au moins un caractère spécial (!@#$%*())</li>
    </ul>
    </ul>  
  </p>
</Alert>

      
            </div>
            <hr />
            <center>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="Homme"
                  value="Homme"
                  onChange={this.handleOptionChange}
                  checked={this.state.gender === "Homme"}
                />
                <label className="form-check-label" htmlFor="Homme">
                  <big>Homme</big>
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="Femme"
                  value="Femme"
                  onChange={this.handleOptionChange}
                  checked={this.state.gender === "Femme"}
                />
                <label className="form-check-label" htmlFor="Femme">
                  <big>Femme</big>
                </label>
              </div>
            </center>

         

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
                    {this.props.levels.map(level => <option key={level.id} value={level.id}>{level.name}</option>)}
                  </select>
                </label>
              </div>
              <div className="form-group  col-7">
                <label htmlFor="schoolId">Etablissement</label>
                
                <Select
        onChange={this.handleSchoolChange}
        onInputChange={this.handleSchoolInputChange}
        options={options}
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

            <button type="submit" className="btn btn-lg btn-info btn-block">
              S'incrire
            </button>
          </form>
        </div>
      </div>
    );
  }
}



Register.propTypes = {
  schools: PropTypes.array.isRequired,
  levels: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  schools: state.schools.schools,
  levels: state.levels.levels
  
});

export default connect(
  mapStateToProps,
  {
    getSchools, getLevels, register
   
  }
)(Register);

