import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  APIURL,
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls
} from "../Utilities";
import { useVideo } from "./VideoContext";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = JSON.parse(localStorage?.getItem("userToken")) || {
    authToken: null
  };

  setupAuthHeaderForServiceCalls(token?.authToken);

  const [userToken, setUserToken] = useState(token?.authToken);

  const navigate = useNavigate();
  const { dispatch } = useVideo();

  useEffect(() => {
    setupAuthExceptionHandler(logoutHandler, navigate);
  }, []);

  const loginWithCredentials = async (email, password) => {
    try {
      console.log("Trying to log in...");
      const {
        data: { token },
        status
      } = await axios({
        method: "POST",
        url: `${APIURL}/users/authenticate`,
        headers: { email: email, password: password }
      });
      console.log({ token });
      if (status === 200) {
        setUserToken(token);
        setupAuthHeaderForServiceCalls(token);
        toast.success("Login successfull !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });

        localStorage?.setItem(
          "userToken",
          JSON.stringify({ authToken: token })
        );

        return status;
      }
    } catch (err) {
      toast.error("Error logging In!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      console.log("error logging in...", err);
    }
  };

  const logoutHandler = () => {
    localStorage?.removeItem("userToken");
    setupAuthHeaderForServiceCalls(null);
    dispatch({ type: "RESET_STATES" });
    toast.info("Logged out successfully !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{
        loginWithCredentials,
        logoutHandler,
        userToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
