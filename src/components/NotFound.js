import React from 'react';
class NotFound extends React.Component {



    render() {
      return (
          <div className="container">
              <h1>
                <span className="text-info">Page non trouvée</span>
              </h1>
              <p className="lead">Désolé, cette page n'existe pas</p>
            </div>
      );
}
 
  
};

export default NotFound;