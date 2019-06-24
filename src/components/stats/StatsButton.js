import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";

class StatsButton extends React.Component {

    render() {
        return(<Link to="/stats/" ><button className="btn btn-info btn-block"> <FontAwesomeIcon icon="list-ol" /> Toutes les statistiques</button></Link>)
    }
}

export default StatsButton