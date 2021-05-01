import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {VideoProvider} from "./Contexts"
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <VideoProvider>
      <App />
      </VideoProvider>
    </Router>
  </StrictMode>,
  rootElement
);
