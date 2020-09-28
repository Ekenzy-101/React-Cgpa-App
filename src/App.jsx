import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/shared/NavBar";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Course from "./containers/add-new/Course";
import Home from "./containers/home/Home";
import LogOut from "./containers/log-out/LogOut";
import Login from "./containers/login/Login";
import NotFound from "./containers/not-found/NotFound";
import Signup from "./containers/signup/Signup";
import { getCurrentUser } from "./services/authService";
import {
  NOT_FOUND,
  TO_COURSE,
  TO_HOME,
  TO_LOGIN,
  TO_LOGOUT,
  TO_SIGNUP,
} from "./utils/constant";

class App extends Component {
  semesters = ["First", "Second"];
  levels = ["100", "200", "300", "400", "500", "600", "700"];
  units = ["1", "2", "3", "4", "5", "6"];

  state = {};

  async componentDidMount() {
    const user = await getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <ToastContainer />
        {user && <NavBar user={user} />}
        <Switch>
          <ProtectedRoute
            exact
            path={TO_HOME}
            component={Home}
            AppProps={{
              semesters: this.semesters,
              levels: this.levels,
              units: this.units,
            }}
          />
          <ProtectedRoute
            exact
            path={TO_COURSE + ":id"}
            component={Course}
            AppProps={{
              semesters: this.semesters,
              levels: this.levels,
              units: this.units,
            }}
          />
          <Route exact path={TO_SIGNUP} component={Signup} />
          <Route exact path={TO_LOGIN} component={Login} />
          <Route exact path={TO_LOGOUT} component={LogOut} />
          <ProtectedRoute exact path={NOT_FOUND} component={NotFound} />
          <Redirect to={NOT_FOUND} />
        </Switch>
      </div>
    );
  }
}

export default App;
