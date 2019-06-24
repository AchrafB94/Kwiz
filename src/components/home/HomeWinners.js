import React from "react";
import gold from "../../images/gold.png";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLastThreeWinners } from "../../redux/actions/scoreActions";
import defaultPhoto from "../../images/default.png";

import "./HomeWinners.css";

class LastThree extends React.Component {

  

  componentDidMount() {
    this.props.getLastThreeWinners();
  }

  medalImage(number) {
    switch (number) {
      case 100:
        return gold;
      case 10:
        return silver;
      case 1:
        return bronze;
      default:
        return null;
    }
  }

  medalName(number) {
    switch (number) {
      case 100:
        return "Medaille d'or";
      case 10:
        return "Medaille d'argent";
      case 1:
        return "Medaille de bronze";
      default:
        return null;
    }
  }


  render() {

    
    return (
      <div>
      

        <h2>Derniers Vainqueurs</h2>
        <div>
          <div className="row">
          

            {this.props.threeWinners.map(winner => {
              return (
                <div key={winner.id} className="col-4">
                <div className={"card mb-3"} >
  <p className="card-header text-center">  {" "+this.medalName(winner.medal)} en <b>{winner.subject.name} </b></p>
  <div className="card-header">
    <h4 className="card-title">
    <img
  className="float-right"
                            src={this.medalImage(winner.medal)}
                            alt=""
                            height="50"
                            
                          /> <Link to={"/user/"+winner.user.id} >
      
      {winner.user.image === "" ?    <img
                              src={defaultPhoto}
                              height="50"
                              
                              className="thumbnail"
                              alt=""
                            />
: 
<img
                      src={`http://localhost/kwiz/public/images/${winner.user.image}`}
                      alt=""
                      height="50"
                      className="thumbnail"
                     
                    />}
 {" "+winner.user.firstname + " " + winner.user.lastname}</Link></h4>
    </div>
    <div className="card-body" >
    <table className="table table-borderless">
                    <tbody>
                    
                      <tr>
                        <td>Etablissement</td>
                        <td>
                          <strong>{winner.school ? <Link to={"/school/"+winner.school.id} >{winner.school.name}</Link> : "" }</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Classe</td>
                        <td>
                          <strong>{winner.user.classroom}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Score</td>
                        <td>
                          <strong>{winner.score} points</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Temps</td>
                        <td>
                          <strong>{winner.time} secondes</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
  </div>
</div>

                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
LastThree.propTypes = {
  threeWinners: PropTypes.array.isRequired,
  getLastThreeWinners: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  threeWinners: state.score.threeWinners
});

export default connect(
  mapStateToProps,
  { getLastThreeWinners }
)(LastThree);
