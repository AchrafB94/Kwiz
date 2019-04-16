import React from 'react'
import Alert from '../alert/Alert';


class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',

            
      showPasswordAlert: false
        }
        this.handleSumbit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

handleChange(e) {
    this.setState({
        [e.target.name] : e.target.value
    })
}
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.newPassword === this.state.newPasswordConfirm) {
        
    }else {
            this.setState({
              showPasswordAlert: true,
              password: "",
              passwordconfirm: ""
            });

    }
    }
    render() {
        return (<div className="container mt-5">
<div className="row">
<div className="col-6 bg-light">
<form onSubmit={this.handleSubmit}>
            <h3>Modifier votre mot de passe</h3>
            {this.state.showPasswordAlert ? <Alert color="info" header="Vous avez été déconnecté!" text="Wrong password" /> : ""}
            <div class="form-group ">
      <label for="exampleInputPassword1">Votre mot de passe courant</label>
      
      <input type="password" className="form-control" name="oldPassword" value={this.state.oldPassword} onChange={this.handleChange} required  />
    </div>
    <div className="form-group ">
      <label for="exampleInputPassword1">Votre nouveau mot de passe</label>
      <input type="password" className="form-control" name="newPassword" value={this.state.newPassword} onChange={this.handleChange} required/>
    </div>
    <div className="form-group ">
      <label for="exampleInputPassword1">Confirmez votre nouveau mot de passe</label>
      <input type="password" className="form-control" name="newPasswordConfirm" value={this.state.newPasswordConfirm} onChange={this.handleChange} required/>
    </div>
   
    <button type="submit" className="btn btn-primary">Enregistrez</button>
    </form>
    </div>
<div className="col-6">

<h3>Modifier votre adresse Email</h3></div>
</div>
       
        </div>)
    }

}

export default Settings