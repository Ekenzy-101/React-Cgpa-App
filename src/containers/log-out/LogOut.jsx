import { useEffect } from "react";
import { logout } from "../../services/authService";
import { TO_LOGIN } from "../../utils/constant";

const LogOut = () => {
  useEffect(() => {
    logout();
    window.location = TO_LOGIN;
  }, []);

  return null;
};

export default LogOut;
