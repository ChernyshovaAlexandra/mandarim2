import React from "react";
import IndexPage from "./IndexPage";
import "./assets/scss/main.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'animate.css';


export default function App() {
  const baseUrl = '' //'/mandarim2021'
  
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path={baseUrl + "/"} exact>  <IndexPage baseUrl={baseUrl} page='main' /></Route>
          <Route path={baseUrl + "/sponsory"} exact>  <IndexPage baseUrl={baseUrl} page='sponsory' /></Route>
        </Switch>
      </Router>
    </div>
  );

}
