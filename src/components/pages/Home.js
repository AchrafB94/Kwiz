import React from "react";
import QuizList from "../quiz/QuizList";
import TopThree from "../cards/TopThree";
import TopEtablissement from "../cards/TopSchools";
import UserCard from "../cards/UsersCard";

import {Link} from 'react-router-dom'

import './Home.css'

class Home extends React.Component {
  render() {
    return (
      <div>
      <div className="row flex-xl-nowrap mt-4">

            <div className="col-lg-9 col-xl-9 col-md-12 col-sm-12">
            <div id="quizlist">
              <QuizList link={this.props.match.params.subject_link} />
              </div>
              <br />
              <TopThree />
            </div>

            <div className="col-lg-3 col-xl-3 col-md-12 col-sm-12">
              <br />
              <TopEtablissement />
              <br />
              <UserCard />
              <br />
              <div><Link to="/stats" type="button" className="btn btn-info btn-block">Toutes les Statistiques</Link></div>
            </div>
           
          </div>
          
          </div>
    );
  }
}

export default Home;
