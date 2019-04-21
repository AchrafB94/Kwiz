import React from 'react';
import { login } from '../Functions'
import { Link } from 'react-router-dom'

class Login extends React.Component{
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
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

        login(user).then(res => {
            if (res) {
                this.props.history.push(`/`)
            }
        }).catch(err => {
            console.log(err)
        })
    }


    render() {
        return(
            <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form  onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Bienvenue sur KWIZ!</h1>
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

export default Login;