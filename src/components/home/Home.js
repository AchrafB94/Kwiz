import React from "react";
import QuizList from "../quiz/QuizList";
import LastThree from "../cards/LastThree";
import TopSchools from "../cards/TopSchools";
import TopUsers from "../cards/TopUsers";
import UserCard from "../cards/UsersCard";

import {Link} from 'react-router-dom'

import './Home.css'

class Home extends React.Component {
  render() {
    return (
      <div>
      <div className="row flex-xl-nowrap mt-4">

            <div className="col-lg-9 col-xl-9 col-md-12 col-sm-12 ">
            <div>
              <QuizList link={this.props.match.params.subject_link} />
              </div>
              <br />
              <LastThree />
            </div>

            <div className="col-lg-3 col-xl-3 col-md-12 col-sm-12">
              <TopUsers limit="5" />
              <TopSchools limit="5" />
              <UserCard />
              <div><Link to="/stats" type="button" className="btn btn-info btn-block">Toutes les Statistiques</Link></div>
            </div>
           
          </div>
          
          </div>
    );
  }
}

export default Home;
