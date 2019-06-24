import React from "react";
import "./Admin.css";
import { connect } from "react-redux";
import { topQuizzesByLevel,topQuizzesBySubject} from "../../redux/actions/quizActions";
import DonutChart from "react-donut-chart";





class AdminCharts extends React.Component {
  componentDidMount() {
    this.props.topQuizzesByLevel();
    this.props.topQuizzesBySubject();
    
  }


  render() {      
    const quizzesBySubjectData = [];
    this.props.quizzesBySubject.map(quiz =>
      quizzesBySubjectData.push({
        label: quiz.subject.name,
        value: quiz.subjectsCount
      })
    );

    const quizzesByLevelData = [];
    this.props.quizzesByLevel.map(quiz =>
      quizzesByLevelData.push({
        label: quiz.level.name,
        value: quiz.levelCount
      })
    );
    return (
        <div className="container-fluid card border-info">
            <div className="card-body">
              <div className="card-text">
              <div className="row">
              <div className="col-6">
              <h3>Distribution des Quizz selon les matiéres</h3>
                <DonutChart data={quizzesBySubjectData} width={500}   />
               
                </div>
                <div className="col-6">
                <h3>Distribution des Quizz selon les niveaux</h3>
                <DonutChart data={quizzesByLevelData}  width={500}  />
                </div>
                </div>
              </div>
            </div>
          </div>
    );
  }
}

const mapStateToProps = state => ({
    quizzesBySubject: state.quiz.quizzesBySubject,
    quizzesByLevel: state.quiz.quizzesByLevel,
  
});

export default connect(
  mapStateToProps,
  {
    topQuizzesByLevel,
    topQuizzesBySubject
  }
)(AdminCharts);
