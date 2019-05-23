import React from 'react';
import { login } from '../../redux/actions/userActions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

class Login extends React.Component{
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            showAlert: false,
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.login(user).then(res => {
            
            window.location.replace('/')
           
            
        }).catch(err => {
            
            this.setState({
                showAlert: true
            })
        })
    }


    render() {
        const handleClose = () => this.setState({ showAlert: false });
        return(
            <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
           <form  onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Bienvenue sur KWIZ!</h1>
                        {this.state.showAlert ?  <Alert dismissible onClose={handleClose} variant="info">  <p>
  L'adresse Email ou le mot de passe est incorrect. Veuillez essayer à nouveau. 
  </p>
</Alert> : ""}
                       
         
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
                        <button type="submit"
                            className="btn btn-lg btn-info btn-block">
                            Connectez-vous
                        </button>
                        <div className="form-group">
                            <Link to="/oublie">Mot de passe oublié?</Link>{" - "} 
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