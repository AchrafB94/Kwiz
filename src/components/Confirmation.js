import React from 'react'
import { connect } from "react-redux";
import { confirmEmail } from "../redux/actions/userActions";
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from './login/Login';

class Confirmation extends React.Component{

    state = {
        message: "",
        confirmEmailAlert: false,
        confirmed: false,
    }

    componentDidMount() {
        const {token} = this.props.match.params
        this.props.confirmEmail(token).then(result => {
            
            if(result.code === 1013) {this.setState({confirmEmailAlert: true,message: "Votre compte a été vérifié.",confirmed: true})}
            if(result.code === 1014) {this.setState({confirmEmailAlert: true,message: "La vérification a échoué."}) }
            if(result.code === 1015) {this.setState({confirmEmailAlert: true,message: "Le jeton de verification a expiré."}) }
            if(result.code === 1016) {this.setState({confirmEmailAlert: true,message: "Erreur de confirmation."}) }

        })
    }


    render() {
        return(<div className="container" >
            <h2>Confirmation d'email</h2>

            <Alert show={this.state.confirmEmailAlert} variant="danger">
                    <Alert.Heading>
                      <FontAwesomeIcon icon="exclamation-triangle" /> {this.state.message}
                    </Alert.Heading>
                  </Alert>

                  {this.state.confirmed === true ? <Login /> : ""}
            
            </div>)
    }
}

const mapStateToProps = state => ({
  });


export default connect(
  mapStateToProps,
  { confirmEmail  }
)(Confirmation);