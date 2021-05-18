import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const result = JSON.parse(localStorage?.getItem("login"));
    result?.loginStatus && setIsLoggedIn(true);
  }, []);

  const loginWithCredentials = async (email, password) => {
    try {
      console.log("Trying to log in...");
      const res = await axios({
        method: "POST",
        url: "http://localhost:3000/users/authenticate",
        headers: { email: email, password: password }
      });
      console.log("Authentication response is...", res);
      if (res.status === 200) {
        setIsLoggedIn(true);
        console.log(res.data.userId);
        setCurrentUserId(res.data.userId);
        localStorage?.setItem("login", JSON.stringify({ loginStatus: true }));
        return res;
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
