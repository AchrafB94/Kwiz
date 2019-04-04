import React from 'react';

const TopElevesMatiere = (props) => {
    return(
            <div className="card bg-light">
  <div className="card-header">Top 5 élèves en {props.matiere}</div>
  <div className="card-body">
    <ol className="card-title">
      
            <li>Pia</li>
            <li>Tom</li>
            <li>Josylin</li>
            <li>Cordell</li>
            <li>Inger</li>
        </ol>
    
  </div>
</div>
    )

}


export default TopElevesMatiere;