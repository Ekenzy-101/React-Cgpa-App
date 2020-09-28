import { Component } from "react";
import { logout } from "../../services/authService";
import { TO_LOGIN } from "../../utils/constant";

class LogOut extends Component {
  componentDidMount() {
    logout();
    window.location = TO_LOGIN;
  }

  render() {
    return null;
  }
}

export default LogOut;
