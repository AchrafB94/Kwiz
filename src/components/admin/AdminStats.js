import React from "react";
import "./Admin.css";
import AdminCount from "./AdminCount";
import AdminActivity from "./AdminActivity";
import AdminCharts from "./AdminCharts";
import AdminTopSubjects from "./AdminTopSubjects";
import AdminTopQuizzes from "./AdminTopQuizzes";
import AdminNewUsers from "./AdminNewUsers";






class AdminStats extends React.Component {


  render() { 
    return (
      <div className="container-fluid">
         <AdminCount />
        <div className="row">
    
        <div className="col-6">
         
       
        <AdminActivity />
        </div>
        
        <div className="col-3">
          <AdminTopSubjects />
            <br />
          <AdminTopQuizzes />
          </div>
          <div className="col-3">
          <AdminNewUsers />
          </div>
          </div>
        <hr />
        <AdminCharts />
      </div>
    );
  }
}





export default AdminStats
