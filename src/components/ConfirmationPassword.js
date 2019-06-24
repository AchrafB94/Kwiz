import React from 'react'
import { connect } from "react-redux";
import { confirmPassword } from "../redux/actions/userActions";
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function isStrongPwd1(password) {
 
  var regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  var validPassword = regExp.test(password);
  console.log(validPassword)

  return validPassword;

}

class ConfirmationPassword extends React.Component{

  constructor(props) {
    super(props) 
    this.state = {
      message: "",
      newPassword: "",
      newPasswordConfirm: "",
      confirmPasswordAlert: false,
      PasswordAlert: false,
      showPasswordRules: false,
  }
  this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this)
  this.onChange = this.onChange.bind(this)
  }



  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
    
  handlePasswordSubmit(e) {
    e.preventDefault()
    const { newPassword, newPasswordConfirm } = this.state

    if(isStrongPwd1(this.state.newPassword) === true) {
      if (newPassword !== newPasswordConfirm) {
        this.setState({
          confirmPasswordAlert: true,
          password: "",
          passwordconfirm: ""
        });
        
  
      } else {
        const passwordData = {
          token: this.props.match.params.token,
          password: newPassword
        }
        this.props.confirmPassword(passwordData).then(result => {
          
          if(result.code === 1019) {
  
            this.props.history.push('/login')
           
          }else if(result.code === 1020) {
            this.setState({PasswordAlert: true,message: "Le jeton de verification a expiré. Veuillez demander un nouvel email de réinitialisation."})
          }
          
        }).catch(error => console.log(error.message))
  } 
     
    } else {
      this.setState({showPasswordRules: true})
    }
  }
      render() {
        return(<div className="container" >
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
            <h2>Réinitialiser votre mot de passe: </h2>

            <Alert  dismissible onClose={() => this.setState({PasswordAlert: false})} show={this.state.PasswordAlert} variant="danger">
                    <Alert.Heading>
                      <FontAwesomeIcon icon="exclamation-triangle" /> {this.state.message}
                    </Alert.Heading>
                  </Alert>

                  <form onSubmit={this.handlePasswordSubmit}>
                
                  <Alert dismissible onClose={() => this.setState({confirmPasswordAlert: false})} show={this.state.confirmPasswordAlert} variant="info">
                    <Alert.Heading>
                      <FontAwesomeIcon icon="exclamation-triangle" /> Oups, ces mots de passe ne correspondent pas!
                    </Alert.Heading>
                    <p>
                      Assurez-vous de taper le mot de passe correct et essayez à
                      nouveau!
                    </p>
                  </Alert>

                  <Alert dismissible show={this.state.showPasswordRules} onClose={() => this.setState({showPasswordRules: false})} variant="info">
  <Alert.Heading> Le mot de passe doit :</Alert.Heading>
  <p className="form-text text-muted">

    <ul>
    <li>avoir entre 8 et 15 caractères</li>
    <li>respecter les règles suivantes :</li>
    <ul>
    <li>avoir au moins une minuscule</li>
    <li>avoir au moins une majuscule</li>
    <li>avoir au moins un chiffre</li>
    </ul>
    </ul>  
  </p>
</Alert>
              
                <div className="form-group">
                  <label htmlFor="newPassword">
                    Votre nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={this.state.newPassword}
                    onChange={this.onChange}
                    minLength='8'
                    maxLength='15'
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPasswordConfirm">
                    Confirmez votre nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPasswordConfirm"
                    value={this.state.newPasswordConfirm}
                    onChange={this.onChange}
                    minLength='8'
                    maxLength='15'
                    required
                  />
                </div>

                <button type="submit" className="btn btn-lg btn-info btn-block">
                  Enregistrez
                </button>
              </form>
              </div>
              </div>
              <br />
            </div>)
    }
}

const mapStateToProps = state => ({
  });


export default connect(
  mapStateToProps,
  { confirmPassword  }
)(ConfirmationPassword);