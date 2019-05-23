import React from "react";
import QuizList from "../quiz/QuizList";
import LastThree from "../cards/LastThree";
import TopSchools from "../cards/TopSchools";
import TopUsers from "../cards/TopUsers";
import UserCard from "../cards/UsersCard";
import {Link} from 'react-router-dom'



import './Home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Home extends React.Component {


  render() {
    return (
      <div>
      <div className="row flex-xl-nowrap mt-4">

            <div className="col-lg-9 col-xl-9 col-md-12 col-sm-12 ">
            <div>
            <div className="container">

              <QuizList />
              <br />
              <LastThree />
              </div>
              
             
            </div>
            </div>
            <div className="col-lg-3 col-xl-3 col-md-12 col-sm-12">
            <UserCard />
              <TopSchools limit="5" />
              <TopUsers limit="5" />
              <div><Link to="/stats" type="button" className="btn btn-info btn-block"><FontAwesomeIcon icon="list-ol" size="lg" /> Toutes les Statistiques</Link></div>
            </div>
           
          </div>
          
          </div>
    );
  }
}

export default Home;
