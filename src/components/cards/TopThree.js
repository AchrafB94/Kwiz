import React from 'react';
import goldmedal from '../../images/gold.png';
import profileicon from '../../images/user-male-icon.png';
import profile2 from '../../images/user-female-icon.png';
import profile3 from '../../images/user-2.png';


const TopThree = () => {
    return(
        <div>
        <h5>Top 3 des Derniers Vainqueurs</h5>
        <div >
      
      <div className="row">
      <div className="col-4">
      <table className="table table-bordered">
      <tbody>
     <tr>
     <th><img src={goldmedal} alt="" height="30" /></th>
       <th><img src={profileicon} alt="" height="30" /></th>
     </tr>
     <tr>
       <td>Nom</td>
       <td>Aiwa Audrey</td>
     </tr>
     <tr>
       <td>Lycée</td>
       <td>LDD</td>
     </tr>
     <tr>
       <td>Classe</td>
       <td>2nde L</td>
     </tr>
     </tbody>
   </table> 
   
      
      </div>
      <div className="col-4">
      
      
   <table className="table table-bordered">
   <tbody>
     <tr>
     <th><img src={goldmedal} alt="" height="30" /></th>
       <th><img src={profile2} alt="" height="30"/></th>
     </tr>
     <tr>
       <td>Nom</td>
       <td>Aiwa Audrey</td>
     </tr>
     <tr>
       <td>Lycée</td>
       <td>LDD</td>
     </tr>
     <tr>
       <td>Classe</td>
       <td>2nde L</td>
     </tr>
     </tbody>
   </table> 
      </div>
   
      <div className="col-4">
      
      
   
   <table className="table table-bordered">
   <tbody>
     <tr>
     <th><img src={goldmedal} alt="" height="30" /></th>
       <th><img src={profile3} alt="" height="30"/></th>
     </tr>
     <tr>
       <td>Nom</td>
       <td>Aiwa Audrey</td>
     </tr>
     <tr>
       <td>Lycée</td>
       <td>LDD</td>
     </tr>
     <tr>
       <td>Classe</td>
       <td>2nde L</td>
     </tr>
     </tbody>
   </table> 
   
      </div>
   
      </div>   
      </div>
      </div>
    )
}

export default TopThree;