import React from 'react';

const TopEtablissementMatiere = (props) => {
    return(
            <div className="card bg-light">
  <div className="card-header">Top 5 etablissements en {props.matiere}</div>
  <div className="card-body">
    <ol className="card-title">
      
            <li>LDD</li>
            <li>LEE</li>
            <li>LNLM</li>
            <li>Besseiux</li>
            <li>IMM</li>
        </ol>
    
  </div>
</div>
    )

}


export default TopEtablissementMatiere;