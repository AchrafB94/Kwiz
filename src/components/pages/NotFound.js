import React from 'react';
class NotFound extends React.Component {



    render() {
      return (
        <div>

          <div>
              <h1 className="display-4">
                <span className="text-danger">Page non trouvée</span>
              </h1>
              <p className="lead">Désolé, cette page n'existe pas</p>
            </div>

        </div>
      );
}
 
  
};

export default NotFound;