import React from 'react';
import { resetPassword } from '../../redux/actions/userActions'
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoginPasswordReset extends React.Component{
    constructor() {
        super()
        this.state = {
            email: "",
            showAlert: false,
            message: ""
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        const email = this.state.email
        

        this.props.resetPassword(email).then(res => {
            if(res.code === 1017) {
                this.setState({showAlert: true,message: "Un email a été envoyé pour cette adresse pour réinitialiser le mot de passe."})
            }
            if(res.code === 1018) {
                this.setState({showAlert: true,message: "Il n'y a pas de compte avec cette adresse email."})
            }
            
        })
    }


    render() {
        
        return(
            <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
           <form  onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Informations de connexion perdues </h1>
                        <Alert show={this.state.showAlert} variant="info">  <p>
  <FontAwesomeIcon icon="exclamation-triangle" /> {this.state.message}
  </p>
</Alert>
Si vous avez oublié votre mot de passe

Saisissez votre adresse électronique dans le champ ci-dessous et cliquer sur le bouton "Demander un nouveau mot de passe". Un email permettant de changer votre mot de passe vous sera envoyé.
         
                        <div className="form-group">
                            <input type="email"
                                className="form-control"
                                name="email"
                                placeholder="Tapez votre Email"
                                value={this.state.email}
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <button type="submit"
                            className="btn btn-lg btn-info btn-block">
                            Demander un nouveau mot de passe
                        </button>

                    </form>
                </div>
            </div>
            <br />
        </div>

        )
    }

}

export default connect(null,{resetPassword})(LoginPasswordReset);