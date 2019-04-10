import React from "react";
import TopEtablissement from "../cards/TopSchools";
import QuizBySubject from "../quiz/QuizBySubject";
import UserCard from "../cards/UsersCard";

import {Link} from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <div>
      <div className="row flex-xl-nowrap">

            <div className="col-lg-9 col-xl-9 col-md-12 col-sm-12 mt-4">

              <QuizBySubject subjectLink={this.props.match.params.subject_link} />
            </div>

            <div className="col-lg-3 col-xl-3 col-md-12 col-sm-12">
              <br />
              <TopEtablissement />
              <br />
              <UserCard />
              <br />
              <Link to="/stats" type="button" className="btn btn-info btn-block">Toutes les Statistiques</Link></div>
   
           
          </div>
          </div>
    );
  }
}

export default Home;
