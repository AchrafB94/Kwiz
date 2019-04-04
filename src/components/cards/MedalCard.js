import React from 'react';
import goldmedal from '../../images/gold.png'
import './MedalCard.css'

class Lots extends React.Component {

    render() {
        return(
            <div className="card border-danger">
            <div className="card-body text-danger text-center">
              <h5 className="card-title">LOTS À GANGER</h5>
              <img src={goldmedal} alt="" ></img>
              <p className="card-text">Soyez le premier à compléter ce quiz et à remporter une médaille d'or!</p>
              
            </div>
                </div>
        )
    }
}

export default Lots;