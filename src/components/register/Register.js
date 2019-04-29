import React from "react";
import { register } from "../Functions";
import axios from 'axios'
import { Alert } from "react-bootstrap";


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
      levelId: 4,
      schoolId: 1,
      class: "",
      district: "",
      city: "",
      province: "",
      imageName: "",
      gender: "",

      file: null,

      showPasswordAlert: false,
      showFileAlert: false,
      fileAlert: ""

    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOptionChange(changeEvent) {
   
    this.setState({
      gender: changeEvent.target.value
    });
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


  onSubmit(e) {
    e.preventDefault();

   


    if (this.state.password === this.state.passwordconfirm) {

      
      
      if(this.state.file) {
        const filename = Date.now()+'-'+this.state.file.name
        this.setState({
          imageName: filename
        })
      const data = new FormData() 
      data.append('file', this.state.file, filename)
      
  
      axios.post("http://localhost:4000/users/upload", data, {
    })
  }
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
        district: this.state.district,
        city: this.state.city,
        province: this.state.province,
        imageName: this.state.imageName,
        gender: this.state.gender,
        
      };

      register(user).then(res => {
        this.props.history.push(`/login`);
      });
    } else {
      this.setState({
        showPasswordAlert: true,
        password: "",
        passwordconfirm: ""
      });
    }
  }

  render() {
    const passwordAlert = (
        <Alert dismissible variant="info">
  <Alert.Heading>Oups, ces mots de passe ne correspondent pas!</Alert.Heading>
  <p>
  Assurez-vous de taper le mot de passe correct et essayez à nouveau!
  </p>
</Alert>
       
    );

    const fileAlert = (
      <Alert dismissible variant="info">
<Alert.Heading>Attention!</Alert.Heading>
<p>
{this.state.fileAlert}
</p>
</Alert>
     
  );

    return (
      <div className="container">
        <div className="col-md-8 mt-5 mx-auto">
          <form onSubmit={this.onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Inscription à KWIZ</h1>
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
              <div className="form-group col-8 ">
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
            <div className="row">
              {this.state.showPasswordAlert ? passwordAlert : ""}
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

                <small id="fileHelp" className="form-text text-muted">
                  Minimum 8 caractéres.
                </small>
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
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group col-3">
                <label htmlFor="district">Quartier</label>
                <input
                  type="text"
                  className="form-control"
                  name="district"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group col-3">
                <label htmlFor="city">Ville</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group col-3">
                <label htmlFor="province">Province</label>
                <input
                  type="text"
                  className="form-control"
                  name="province"
                  onChange={this.onChange}
                />
              </div>
            </div>
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
                    <option value="1">Primaire</option>
                    <option value="2">Secondaire</option>
                    <option value="3">Universitaire</option>
                    <option value="4">Tout Publique</option>
                  </select>
                </label>
              </div>
              <div className="form-group  col-7">
                <label htmlFor="schoolId">Etablissement</label>
                <input
                  type="text"
                  className="form-control"
                  name="schoolId"
                  onChange={this.onSchoolChange}
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
            {this.state.showFileAlert ? fileAlert : ""}
            <div className="form-group">
              <label htmlFor="file">Photo de profile</label>
              <input
                type="file"
                name="file"
                className="form-control-file"
                id="file"
                aria-describedby="fileHelp"
                onChange={this.fileSelectedHandler.bind(this)}
              />
              <small id="fileHelp" className="form-text text-muted">
              La taille minimale de l'image doit être: 150 x 150 et son format doit être png, jpeg ou gif.
              </small>
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

export default Register;
