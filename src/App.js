import React, { Component } from "react";
import Loadable from "react-loadable";
import jwt_decode from "jwt-decode";
import Header from "./components/header/Header";
import './App.css'
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
import { Provider } from "react-redux";
import store from "./store";
import Footer from "./components/footer/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faIgloo,
  faBook,
  faBell,
  faQuestionCircle,
  faSchool,
  faUser,
  faPlus,
  faComments,
  faClipboardList,
  faListOl,
  faHome,
  faInfoCircle,
  faStopwatch,
  faTimes,
  faCircle,
  faSignInAlt,
  faSignOutAlt,
  faCog,
  faEnvelope,
  faBirthdayCake,
  faPhone,
  faLayerGroup,
  faMapMarker,
  faCalculator,
  faTrashAlt,
  faBan,
  faEdit,
  faUserEdit,
  faExclamationCircle,
  faExclamationTriangle,
  faCommentAlt,
  faGripHorizontal,
  faCogs,
  faSearch,
  faBars,
  faClipboardCheck,
  faAngleDown,
  faAngleUp,
  faMedal,
  faRedo,
  faInfo,
  faUnlockAlt,
  faDatabase
} from "@fortawesome/free-solid-svg-icons";

import "./bootstrap.min.css";
import AdminScores from "./components/admin/AdminScores";
import EditQuestions from "./components/contributor/EditQuestions";
import Confirmation from "./components/Confirmation";
import LoginPasswordReset from "./components/login/LoginPasswordReset";
import ConfirmationPassword from "./components/ConfirmationPassword";
import RegisterComplete from "./components/register/RegisterComplete";

library.add(faIgloo);
library.add(faHome);
library.add(faUser);
library.add(faClipboardList);
library.add(faComments);
library.add(faCircle);
library.add(faListOl);
library.add(faHome);
library.add(faInfoCircle);
library.add(faStopwatch);
library.add(faCheck);
library.add(faTimes);
library.add(faSignInAlt);
library.add(faSignOutAlt);
library.add(faCog);
library.add(faPlus);
library.add(faBook);
library.add(faQuestionCircle);
library.add(faSchool);
library.add(faBell);
library.add(faEnvelope);
library.add(faBirthdayCake);
library.add(faPhone);
library.add(faLayerGroup);
library.add(faMapMarker);
library.add(faCalculator);
library.add(faTrashAlt);
library.add(faBan);
library.add(faEdit);
library.add(faUserEdit);
library.add(faExclamationCircle);
library.add(faExclamationTriangle);
library.add(faCommentAlt);
library.add(faGripHorizontal);
library.add(faCogs);
library.add(faSearch);
library.add(faBars);
library.add(faClipboardCheck)
library.add(faMedal)
library.add(faAngleDown)
library.add(faAngleUp)
library.add(faRedo)
library.add(faInfo)
library.add(faUnlockAlt)
library.add(faDatabase)

function LoadingComponent() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

const Quiz = Loadable({
  loader: () => import("./components/quiz/Quiz"),
  loading: LoadingComponent
});

const Home = Loadable({
  loader: () => import("./components/home/Home"),
  loading: LoadingComponent
});

const Subject = Loadable({
  loader: () => import("./components/subject/Subject"),
  loading: LoadingComponent
});

const Stats = Loadable({
  loader: () => import("./components/stats/Stats"),
  loading: LoadingComponent
});
const AdminLevels = Loadable({
  loader: () => import("./components/admin/AdminLevels"),
  loading: LoadingComponent
});
const Login = Loadable({
  loader: () => import("./components/login/Login"),
  loading: LoadingComponent
});
const AdminQuiz = Loadable({
  loader: () => import("./components/admin/AdminQuiz"),
  loading: LoadingComponent
});
const AdminSchools = Loadable({
  loader: () => import("./components/admin/AdminSchools"),
  loading: LoadingComponent
});
const AdminStats = Loadable({
  loader: () => import("./components/admin/AdminStats"),
  loading: LoadingComponent
});
const AdminSubjects = Loadable({
  loader: () => import("./components/admin/AdminSubjects"),
  loading: LoadingComponent
});
const AdminUsers = Loadable({
  loader: () => import("./components/admin/AdminUsers"),
  loading: LoadingComponent
});
const Settings = Loadable({
  loader: () => import("./components/settings/Settings"),
  loading: LoadingComponent
});
const PublicProfile = Loadable({
  loader: () => import("./components/profile/PublicProfile"),
  loading: LoadingComponent
});
const Profile = Loadable({
  loader: () => import("./components/profile/Profile"),
  loading: LoadingComponent
});
const Contributor = Loadable({
  loader: () => import("./components/contributor/Contributor"),
  loading: LoadingComponent
});
const QuizCreate = Loadable({
  loader: () => import("./components/contributor/QuizCreate"),
  loading: LoadingComponent
});
const School = Loadable({
  loader: () => import("./components/school/School"),
  loading: LoadingComponent
});
const NotFound = Loadable({
  loader: () => import("./components/NotFound"),
  loading: LoadingComponent
});
const Register = Loadable({
  loader: () => import("./components/register/Register"),
  loading: LoadingComponent
});




class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <div className="d-flex">
              <Sidebar />

              <div id="page-content-wrapper">
                <div className="container-fluid mt-4">
                  <Switch>
                    <PublicRoute exact path="/login" component={Login} />
                    <PublicRoute exact path="/register" component={Register} />
                    <PublicRoute exact path="/passwordreset/" component={LoginPasswordReset} />
                    <PublicRoute exact path="/confirm/:token" component={Confirmation} />
                    <PublicRoute exact path="/confirmpassword/:token" component={ConfirmationPassword} />
                    <PublicRoute exact path="/registered" component={RegisterComplete} />

                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute exact path="/stats" component={Stats} />

                    <AdminRoute exact path="/admin/" component={AdminStats} ruleId={5} />
                    <AdminRoute exact path="/contrib/questions/:id" component={EditQuestions} ruleId={4} />
                    <AdminRoute
                    ruleId={4}
                      exact
                      path="/contrib/"
                      component={Contributor}
                    />
                    <AdminRoute
                      exact
                      path="/contrib/create"
                      component={QuizCreate}
                      ruleId={4}
                    />
                    <AdminRoute
                      exact
                      path="/admin/quiz"
                      component={AdminQuiz}
                      ruleId={3}
                    />
                    <AdminRoute
                      exact
                      path="/admin/schools"
                      component={AdminSchools}
                      ruleId={9}
                    />
                    <AdminRoute
                      exact
                      path="/admin/subjects"
                      component={AdminSubjects}
                      ruleId={2}
                    />
                    <AdminRoute
                      exact
                      path="/admin/users"
                      component={AdminUsers}
                      ruleId={7}
                    />
                    <AdminRoute
                      exact
                      path="/admin/scores"
                      component={AdminScores}
                      ruleId={6}
                    />
                    <AdminRoute
                      exact
                      path="/admin/levels"
                      component={AdminLevels}
                      ruleId={1}
                    />
                    <PrivateRoute
                      exact
                      path="/subject/:subjectId"
                      component={Subject}
                    />
                    <PrivateRoute exact path="/quiz/:id" component={Quiz} />
                    <PrivateRoute
                      path="/settings/:setting"
                      component={Settings}
                    />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute
                      exact
                      path="/user/:id"
                      component={PublicProfile}
                    />
                    <PrivateRoute exact path="/school/:id" component={School} />

                    <Route component={NotFound} />
                  </Switch>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.usertoken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
function checkPermission(permissions,ruleId) {
  const found = permissions.some(el => el.ruleId === ruleId);
  if (found) return true
  else return false
}

function AdminRoute({ component: Component, ruleId, ...rest }) {
  
    const decoded = jwt_decode(localStorage.usertoken);
  const permissions = decoded.role.permissions;
  
  return (
    <Route
      {...rest}
      render={props =>
        checkPermission(permissions,ruleId) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !localStorage.usertoken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default App;
