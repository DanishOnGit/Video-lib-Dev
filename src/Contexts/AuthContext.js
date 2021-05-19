import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../Utilities";
import { useVideo } from "./VideoContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useVideo();

  useEffect(() => {
    const result = JSON.parse(localStorage?.getItem("login"));
    result?.loginStatus && setIsLoggedIn(true);

    const currUser = JSON.parse(localStorage?.getItem("userId"));
    console.log({ currUser });

    currUser?.currentUserId && setCurrentUserId(currUser.currentUserId);
  }, []);

  const loginWithCredentials = async (email, password) => {
    try {
      console.log("Trying to log in...");
      const {
        data: { userId },
        status
      } = await axios({
        method: "POST",
        url: `${APIURL}/users/authenticate`,
        headers: { email: email, password: password }
      });
      console.log("Authentication response is...", userId);
      if (status === 200) {
        setIsLoggedIn(true);
        console.log(userId);
        setCurrentUserId(userId);
        localStorage?.setItem("login", JSON.stringify({ loginStatus: true }));
        localStorage?.setItem(
          "userId",
          JSON.stringify({ currentUserId: userId })
        );

        return status;
      }
    } catch (err) {
      console.log("error logging in...", err);
    }
  };

  const logoutHandler = () => {
    localStorage?.removeItem("login");
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{ loginWithCredentials, logoutHandler, isLoggedIn, currentUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
