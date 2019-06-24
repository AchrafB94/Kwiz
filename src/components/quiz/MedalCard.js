import React from 'react';
import gold from '../../images/gold.png'
import silver from '../../images/silver.png'
import bronze from '../../images/bronze.png'
import './MedalCard.css'

class MedalCard extends React.Component {

    render() {
        if (this.props.medals === 0) {

        
        return(
            <div className="card" id="goldcard">
            <div className="card-body text-danger text-center">
              <h2 className="card-title text-danger">LOTS À GANGER</h2>
              <img src={gold} alt="" height="150"></img>
              <p className="card-text text-danger">Soyez le premier à compléter ce quiz et à remporter une médaille d'or!</p>
              
            </div>
                </div>
        )
        }

        if (this.props.medals === 1) {

        
            return(
                <div className="card" id="silvercard">
                <div className="card-body text-primary text-center">
                  <h2 className="card-title">LOTS À GANGER</h2>
                  <img src={silver} alt="" height="150"></img>
                  <p className="card-text">Cela pourrait être votre chance d'obtenir la deuxième place et remporter une médaille d'argent!</p>
                  
                </div>
                    </div>
            )
            }


            if (this.props.medals === 2) {

        
                return(
                    <div className="card" id="bronzecard">
                    <div className="card-body text-success text-center">
                      <h2 className="card-title">LOTS À GANGER</h2>
                      <img src={bronze} alt="" height="150"></img>
                      <p className="card-text ">Une médaille de bronze à 100% sur ce quiz.</p>
                      
                    </div>
                        </div>
                )
                }

                else return (<div></div>)
                  
                
    }
}

export default MedalCard;