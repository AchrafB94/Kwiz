import React from 'react';
import { login } from '../../redux/actions/userActions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Recaptcha from 'react-recaptcha'

class Login extends React.Component{
    constructor() {

        super()
        this.state = {
            email: '',
            password: '',
            showAlert: false,
            message: "",
            isVerified: false
        }
       

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.recaptchaLoaded = this.recaptchaLoaded.bind(this)
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        if(this.state.isVerified) {

            const user = {
                email: this.state.email,
                password: this.state.password
            }

            this.props.login(user).then(res => {

            
            
                if(res.code === 1001) {
                    this.setState({showAlert: true,
                    message: "L'adresse Email ou le mot de passe est incorrect. Veuillez essayer à nouveau." })
                }
                else if(res.code === 1002) {
                    this.setState({showAlert: true,
                        message: "L'adresse Email ou le mot de passe est incorrect. Veuillez essayer à nouveau." })
                }
                else if(res.code === 1003) {
                    this.setState({showAlert: true, message: "Erreur de connexion."})
                }
                else if(res.code === 1004) {
                    this.setState({showAlert: true, message: "Votre compte n'a pas encore été vérifié, vérifiez dans votre boîte de réception."})
                }
                else if(res.code === 1005) {
                    this.setState({showAlert: true, message: "Votre compte a été désactivé par l'administration."})
                }
                
                else {
                    localStorage.setItem('usertoken', res)
                     window.location.replace('/') }
                
               
                
            }).catch(err => {
                this.setState({showAlert: true, message: "Erreur de connexion."})
            })
            
        }else {
           
        }



    }

    recaptchaLoaded() {
        
    }
    verifyCallback(response) {
        if (response) {
          this.setState({
            isVerified: true
          })
        }
    }

    render() {
        const handleClose = () => this.setState({ showAlert: false });
        return(
            <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
           <form  onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Bienvenue sur KWIZ!</h1>
                      <Alert dismissible show={this.state.showAlert} onClose={handleClose} variant="info">  
                        <p> <FontAwesomeIcon icon="exclamation-triangle" /> {this.state.message}
   
  </p>
</Alert>
       
         
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                className="form-control"
                                name="email"
                                placeholder="Tapez votre Email"
                                value={this.state.email}
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Tapez votre mot de passe"
                                value={this.state.password}
                                onChange={this.onChange}
                                required
                            />
                        </div>
<center>
                        <Recaptcha
                        
    sitekey="6Lcc_6UUAAAAAN-RSROaUYNu71SM7bkQUzLW8sgE"
    render="explicit"
    onloadCallback={this.recaptchaLoaded}
   verifyCallback={this.verifyCallback}
  /></center>
                        <br />
          <button type="submit"
                            className="btn btn-lg btn-info btn-block">
                            Connectez-vous
                        </button>
                        <div className="form-group">
                            <Link to="/passwordreset">Mot de passe oublié?</Link>{" - "} 
                            <Link to="/register">Vous n'avez pas un compte encore?</Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>

        )
    }

}

export default connect(null,{login})(Login);