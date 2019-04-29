import React from "react";
import { Alert, Tab, Tabs } from "react-bootstrap";

import jwt_decode from "jwt-decode";
import axios from 'axios'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser, updateUser, updateImage } from "../../redux/actions/userActions";


class Settings extends React.Component {
  constructor(props) {
    super(props);
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
      gender: "",

      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",

      showPasswordAlert: false,
      
      file: null,
      showFileAlert: false,
      fileAlert: ""
    };
    this.handlePasswordSumbit = this.handlePasswordSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFile = this.onSubmitFile.bind(this)
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
      id,
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
      id,
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

  localStorage.setItem('userlevel',levelId)

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

  
  handlePasswordSubmit(e) {
    e.preventDefault()
    const { newPassword, newPasswordConfirm, oldPassword } = this.state

    if (newPassword !== newPasswordConfirm) {
      this.setState({
        showPasswordAlert: true,
        password: "",
        passwordconfirm: ""
      });
      

    } else {
      const passwordData = {
        oldPassword: oldPassword,
        newPassword: newPassword
      }
      this.props.updatePassword(passwordData)
     
    }
  }


  fileSelectedHandler(event) {
    if(this.checkMimeType(event) && this.checkFileSize(event)) {

      
      
    this.setState({
      file: event.target.files[0]
    })

    }
  }
  checkMimeType=(event)=>{
    //getting file object
    let file = event.target.files[0]
    //define message container
    let err = ''
    // list allow mime type
   const types = ['image/png', 'image/jpeg', 'image/gif']
   
     // compare file type find doesn't matach
         if (types.every(type => file.type !== type)) {
         // create error message and assign to container   
         err += 'Le format du fichier doit étre .png, .jpeg ou .gif\n';
     };
   if (err !== '') { // if message not same old that mean has error 
        event.target.value = null // discard selected file
    this.setState({
      showFileAlert: true,
      fileAlert: err
    })
         return false; 
    }
    this.setState({
      showFileAlert: false
    })
   return true;
  
  }

  checkFileSize=(event)=>{
    let file = event.target.files[0]
    let size = 150 * 150 
    let err = ""; 
    if (file.size > size) {
     err += 'la taille du '+file.name+' est trés large, veuillez choisir un fichier plus petit\n';
   
 };
 if (err !== '') {
    event.target.value = null
    this.setState({
      showFileAlert: true,
      fileAlert: err
    })
    return false
}

return true;

}


onSubmitFile(e) {

  e.preventDefault();
    
    if(this.state.file) {
      const filename = Date.now()+'-'+this.state.file.name
    const data = new FormData() 
    data.append('file', this.state.file, filename)
    
    axios.post("http://localhost:4000/users/upload", data, {
  })

  const {id} = this.state
  const updImage = {
    id,
    filename
  }
  this.props.updateImage(updImage)

}

this.setState({
  image: ""
})
this.props.history.push('/');

}
  

  render() {
    
    const fileAlert = (
      <Alert className="container" dismissible variant="info">
<Alert.Heading>Attention!</Alert.Heading>
<p>
{this.state.fileAlert}
</p>
</Alert>)

    const {
      firstname,
      lastname,
      birthdate,
      district,
      city,
      province,
      levelId,
      phone,
      oldPassword,
      newPassword,
      newPasswordConfirm,
    } = this.state;

    return (
      <div className="card container mt-5 mb-5">
        <Tabs fill defaultActiveKey={this.props.match.params.setting} id="uncontrolled-tab-example">
          <Tab eventKey="profile" id="profile" title="Profile">
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

                  </div>

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

                  <button
                    type="submit"
                    className="btn btn-lg btn-info btn-block"
                  >
                    Enregistrez
                  </button>
                </form>
              </div>
            </div>
          </Tab>
          <Tab eventKey="email" id="email" title="Email">
            <div className="col-6">
              <h3>Modifier votre adresse Email</h3>
            </div>
          </Tab>
          <Tab eventKey="password" title="Mot de passe">
            <div className="container mt-5 mb-5">
              <form onSubmit={this.handlePasswordSubmit}>
                <h3>Modifier votre mot de passe</h3>
                {this.state.showPasswordAlert ? (
                  <Alert dismissible variant="info">
                    <Alert.Heading>
                      Oups, ces mots de passe ne correspondent pas!
                    </Alert.Heading>
                    <p>
                      Assurez-vous de taper le mot de passe correct et essayez à
                      nouveau!
                    </p>
                  </Alert>
                ) : (
                  ""
                )}
                <div className="form-group ">
                  <label htmlFor="oldPassword">
                    Votre mot de passe courant
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="newPassword">
                    Votre nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={newPassword}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="newPasswordConfirm">
                    Confirmez votre nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPasswordConfirm"
                    value={newPasswordConfirm}
                    onChange={this.onChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-outline-info">
                  Enregistrez
                </button>
              </form>
            </div>
          </Tab>
          <Tab eventKey="level" title="Niveau des quizz">
          <div className=" container mt-5 mb-5">
          <form onSubmit={this.onSubmit}>
                <h3>Modifier le niveau des quizz</h3>
                <div className="input-group">
  <select className="custom-select" 
  id="inputLevelSelect"
  name="levelId"
                          defaultValue={levelId}
                          onChange={this.onChange}>
    <option defaultValue>Selectionnez un niveau</option>
    <option value="1">Primaire</option>
                          <option value="2">Secondaire</option>
                          <option value="3">Universitaire</option>
                          <option value="4">Tout Publique</option>
  </select>
  <div className="input-group-append">
    <button className="btn btn-outline-info" type="submit">Enregistrer</button>
  </div>
</div>
                    </form></div>
                  
          </Tab>
          
          <Tab eventKey="school" title="Etablissment">
            Assurez-vous de taper le mot de passe correct et essayez à nouveau!
          </Tab>
          <Tab eventKey="photo" title="Photo de profile">
          <div className=" container mt-5 mb-5">
          
          {this.state.showFileAlert ? fileAlert : ""}
          <form onSubmit={this.onSubmitFile}>
          <h3>Photo de profile</h3>
          <div className="input-group">
  <div className="custom-file">
    <input type="file" className="custom-file-input" name="file" id="file"  onChange={this.fileSelectedHandler.bind(this)} />
    <label className="custom-file-label" htmlFor="inputGroupFile04">Choisir une image</label>
  </div>
  <div className="input-group-append">
    <button className="btn btn-outline-info" type="submit">Enregistrer</button>
  </div>
  
</div>

<small id="fileHelp" className="form-text text-muted">
              La taille minimale de l'image doit être: 150 x 150 et son format doit être png, jpeg ou gif.
              </small>
            </form>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}


Settings.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { getUser, updateUser, updateImage }
)(Settings);