import React, { Component } from "react";
import Loadable from "react-loadable";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import { Provider } from "react-redux";
import store from "./store";
import NotFound from './components/pages/NotFound';
import Profile from './components/profile/Profile';

import Footer from "./components/footer/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faCheck, faIgloo, faUser, faComments, faClipboardList, faListOl, faHome, faInfoCircle, faStopwatch, faTimes, faCircle, faSignInAlt, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons'

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
  loader: () => import("./components/pages/Home"),
  loading: LoadingComponent
});

const Subject = Loadable({
  loader: () => import("./components/pages/Subject"),
  loading: LoadingComponent
});

class App extends Component {

  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="d-flex">
              <Sidebar />
            

            <div id="page-content-wrapper">
              <Header />

              <div className="container-fluid">
                <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/quiz/:id"
                  component={Quiz}
                />
                <Route exact path="/matieres/:subject_link" component={Subject} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route component={NotFound} />
              </Switch>
            
              </div>
              <Footer />
             
            </div>
            
            </div>
            
           
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
