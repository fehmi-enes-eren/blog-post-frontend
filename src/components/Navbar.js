import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../actions/auth";
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [navbarProps, setNavbarProps] = useState({});
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { language } = useSelector((state) => state.language);
    useEffect(() => {
        if (currentUser) {
          setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
          setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        }
    }, [currentUser]);
    const logOut = () => {
        dispatch(logout());
    };
    useEffect(()=>{
      if(language){
        const { navbar : myObject} = require(`../language/${language === "TR" ? "turkish" : "english"}.js`);
        setNavbarProps(myObject);
        console.log("myObject")
      };
    },[language])
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            MyImage
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                {navbarProps.home}
              </Link>
            </li>
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                {navbarProps.moderatorBoard}
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                {navbarProps.adminBoard}
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                {navbarProps.user}
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                {navbarProps.logOut}
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                {navbarProps.login}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                {navbarProps.signUp}
                </Link>
              </li>
            </div>
          )}
        </nav>
  )
}
