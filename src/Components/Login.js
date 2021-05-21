import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts";

export const Login = () => {
  const navigate = useNavigate();
  const state = useLocation();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");

  const { loginWithCredentials } = useAuth();

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log("state is..", state);
    const status = await loginWithCredentials(userEmail, password);
    console.log("login status is...", status);
    status && navigate(state?.from ? state.from : "/");
  };

  function showHidePassword() {
    inputType === "password" ? setInputType("text") : setInputType("password");
  }

  return (
    <div>
      <form className="login-form">
        <h2 className="login-form__heading">Login</h2>

        <div className="login-form__fields-wrapper">
          <label>userEmail</label>
          <div className="input-field-wrapper">
            <input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="userEmail-input"
              type="text"
              placeholder="userEmail"
              required
            />
          </div>
          <br />
          <label>Password</label>
          <div className="input-field-wrapper">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field-2"
              type={inputType}
              placeholder="Enter password"
              required
            />
            <button
              onClick={showHidePassword}
              className="btn btn-secondary basic-addon-2"
              type="button"
            >
              <i class="far fa-eye-slash"></i>
            </button>
          </div>

          <button
            type="submit"
            onClick={loginHandler}
            className="btn btn-primary stretch"
          >
            {" "}
            Login{" "}
          </button>
          <p className="small signup">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")} className="signup-link">
              {" "}
              Signup{" "}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};