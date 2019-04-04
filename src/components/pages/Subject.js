import React from "react";
import QuizList from "../quiz/QuizList";
import TopEtablissement from "../cards/TopSchools";



class Home extends React.Component {
  render() {
    return (
      <div>
      <div className="row flex-xl-nowrap">

            <div className="col-9 mt-4">

              <QuizList link={this.props.match.params.subject_link} />
            </div>

            <div className="col-3">
              <br />
              <TopEtablissement />
              <br />
              <div className="card">
                <div className="card-header">
                  <small className="text-muted">
                    Nouveau Membre: <b>User</b>
                  </small>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    <b>5</b> utilisateurs connectés - <b>35</b> utilisatuers
                    inscrits
                  </small>
                </div>
              </div>
              <br />
              <div><button type="button" className="btn btn-info btn-block">Toutes les Statistiques</button></div>
            </div>
           
          </div>
          </div>
    );
  }
}

export default Home;
