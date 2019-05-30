import React from 'react'
import { connect } from "react-redux";
import { confirmPassword } from "../redux/actions/userActions";
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ConfirmationPassword extends React.Component{

    state = {
        message: "",
        confirmPasswordAlert: false
    }

    componentDidMount() {
        const {token} = this.props.match.params
        const data = {token,
        newPassword: this.state.newPassword}
        this.props.confirmPassword(data).then(result => {
            
            if(result.code === 1013) {this.setState({confirmPasswordAlert: true,message: "Votre compte a été vérifié."}) }
            if(result.code === 1014) {this.setState({confirmPasswordAlert: true,message: "La vérification a échoué."}) }
            if(result.code === 1015) {this.setState({confirmPasswordAlert: true,message: "Le jeton de verification a expiré."}) }
            if(result.code === 1016) {this.setState({confirmPasswordAlert: true,message: "Le jeton de verification a expiré."}) }

        })
    }


    render() {
        return(<div className="container" >
            <h2>Réinitialiser votre mot de passe: </h2>

            <Alert show={this.state.confirmPasswordAlert} variant="danger">
                    <Alert.Heading>
                      <FontAwesomeIcon icon="exclamation-triangle" /> {this.state.message}
                    </Alert.Heading>
                  </Alert>
              <form >

                  <div className="row">

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
              <small id="fileHelp" className="form-text text-muted">
                  Le mot de passe doit :
    <ul>
    <li>avoir entre 8 et 15 caractères</li>
    <li>respecter les règles suivantes :</li>
    <ul>
    <li>avoir au moins une minuscule</li>
    <li>avoir au moins une majuscule</li>
    <li>avoir au moins un chiffre</li>
    <li>avoir au moins un caractère spécial (hors caractères alphabétiques et numériques)</li>
    </ul>
    </ul>  
        
        
        
                </small>
                <button type="submit"
                            className="btn btn-lg btn-info btn-block">
                            Réinitialiser votre mot de passe
                        </button>
            </div>
            </form>
            </div>)
    }
}

const mapStateToProps = state => ({
  });


export default connect(
  mapStateToProps,
  { confirmPassword  }
)(ConfirmationPassword);