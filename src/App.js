import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import { clearMessage } from "./actions/message";
import { setLanguage } from "./actions/language";
import { history } from "./helpers/history";
import axios from "axios";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  useEffect(()=>{
    axios.get("http://ip-api.com/json") //    /109.234.72.0
    .then(res=>{
      if(res.data.countryCode === "TR"){
        dispatch(setLanguage("TR"));
      } else {
        dispatch(setLanguage("EN"));
      };
    }); 
  },[]);
  return (
    <HistoryRouter history={history} >
      <div>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route exact path={"/"} element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Routes>
        </div>
      </div>
    </HistoryRouter>
  );
};
export default App;