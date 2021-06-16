import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../Utilities";
import { toast } from "react-toastify";
export const Signup = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [inputType, setInputType] = useState("password");

  const createUser = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${APIURL}/users`, {
        name: userName,
        email: userEmail,
        password: password
      });
      if (res.status === 201) {
        toast.success("Signup successfull !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError) {
        toast.error("Email already exists!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }

      console.log("error signing up...", err);
    }
  };

  function showHidePassword() {
    inputType === "password" ? setInputType("text") : setInputType("password");
  }

  return (
    <form className="login-form" onSubmit={createUser}>
      <h2 className="login-form__heading">Signup</h2>

      <div className="login-form__fields-wrapper">
        <label>Name</label>
        <div className="input-field-wrapper">
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="userEmail-input"
            type="text"
            placeholder="Your Name"
            required
          />
        </div>
        <br />
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
        <br />
        <label>Confirm Password</label>
        <div className="input-field-wrapper">
          <input
            className="input-field-2 plain-input"
            type="password"
            placeholder="Enter password"
            required
          />
        </div>

        <button className="btn btn-primary stretch"> Signup </button>
      </div>
    </form>
  );
};
