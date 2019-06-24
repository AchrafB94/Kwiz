import React from "react";
import QuizList from "./HomeQuizList";
import LastThree from "./HomeWinners";
import TopSchools from "../cards/TopSchools";
import TopUsers from "../cards/TopUsers";
import UserCard from "./HomeInfo";



import './Home.css'
import StatsButton from "../stats/StatsButton";

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
              <StatsButton />
                 </div>
              
           
          </div>
          
          </div>
    );
  }
}

export default Home;
