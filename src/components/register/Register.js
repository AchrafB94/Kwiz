import React from 'react';
import { register } from '../user/UserFunctions'

class Register extends React.Component{
  constructor() {
    super()
    this.state = {
        firstname: '',
        lastname: '',
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
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        email: this.state.email,
        password: this.state.password
    }

    register(user).then(res => {
        this.props.history.push(`/login`)
    })
}


    render() {
        return(
          
         
<div className="container">
              <div className="col-md-6 mt-5 mx-auto">
                  <form  onSubmit={this.onSubmit}>
                      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                      <div className="form-group">
                          <label htmlFor="firstname">First Name</label>
                          <input type="text"
                              className="form-control"
                              name="firstname"
                              placeholder="Enter Fist Name"
                              value={this.state.firstname}
                              onChange={this.onChange}
                              required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="lastname">Last Name</label>
                          <input type="text"
                              className="form-control"
                              name="lastname"
                              placeholder="Enter Last Name"
                              value={this.state.lastname}
                              onChange={this.onChange}
                              required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="email">Email Address</label>
                          <input type="email"
                              className="form-control"
                              name="email"
                              placeholder="Enter Email"
                              value={this.state.email}
                              onChange={this.onChange}
                              required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input type="password"
                              className="form-control"
                              name="password"
                              placeholder="Enter Password"
                              value={this.state.password}
                              onChange={this.onChange}
                              required
                          />
                      </div>
                      <button type="submit"
                          className="btn btn-lg btn-info btn-block">
                          Register
                      </button>
                  </form>
              </div>
          </div>
      

        )
    }

}

export default Register;