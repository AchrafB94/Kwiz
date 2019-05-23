import React from "react";
import gold from "../../images/gold.png";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLastThreeWinners } from "../../redux/actions/scoreActions";

import "./LastThree.css";

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

  borderColor(number) {
    switch (number) {
      case 100:
        return "danger";
      case 10:
        return "primary";
      case 1:
        return "success";
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
                <div id="medal" key={winner.id} className="col-4">
                <div className={"card mb-3 border-"+this.borderColor(winner.medal)} >
  <h6 className="card-header ">  <img
                            src={this.medalImage(winner.medal)}
                            alt=""
                            height="30"
                            
                          />{" "+this.medalName(winner.medal)} en {winner.subject.name} </h6>
  <div className="card-body">
    <h4 className="card-title"> <Link to={"/user/"+winner.user.id} ><img
                            src={`http://localhost/kwiz/public/images/${winner.user.image}`}
                            alt=""
                            height="40"
                           
                          /> {winner.user.firstname + " " + winner.user.lastname}</Link></h4>
    
    <table className="table table-borderless">
                    <tbody>
                    
                      <tr>
                        <td>Etablissement</td>
                        <td>
                          <strong><Link to={"/school/"+winner.school.id} >{winner.school.name}</Link></strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Classe</td>
                        <td>
                          <strong>{winner.user.class}</strong>
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
