import React, { Component } from "react";
import Loadable from "react-loadable";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import { Provider } from "react-redux";
import store from "./store";
import NotFound from "./components/NotFound";
import Profile from "./components/profile/Profile";

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
} from "@fortawesome/free-solid-svg-icons";

import "./bootstrap.min.css";
import Settings from "./components/settings/Settings";

import Test from "./Test";

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

function LoadingComponent() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
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
                <div className="container-fluid">
                  .
                  <Switch>
                    <PublicRoute exact path="/login" component={Login} />
                    <PublicRoute exact path="/register" component={Register} />
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute exact path="/stats" component={Stats} />
                    <PrivateRoute
                      exact
                      path="/subject/:subjectId"
                      component={Subject}
                    />
                    <PrivateRoute exact path="/quiz/:id" component={Quiz} />
                    <PrivateRoute path="/settings/:setting" component={Settings} />
                  
                    <PrivateRoute path="/profile" component={Profile} />
                    <PrivateRoute path="/test" component={Test} />
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
