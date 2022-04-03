import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../actions/auth";
import { Link } from 'react-router-dom';
import Logo from "../images/logo.png"
import Button from './Button';
import "../styles/navbar.css";

export default function Navbar() {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [navbarProps, setNavbarProps] = useState({});
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { language } = useSelector((state) => state.language);
    const logoRef = useRef()
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
      };
    },[language]);
    useEffect(()=>{
      setTimeout(()=>{
        logoRef.current.classList.remove('fa-spin')
      },4000)
    },[]);

    window.addEventListener("resize", ()=>{
      const widthCheck = window.innerWidth;
      if(widthCheck>960)setClicked(false)

    });

    const HandleRespBar = () => {
      setClicked(!clicked)
    }
    
  return (
    <nav className="navItems">
          <Link to={"/"} className="navbarLogo">
            {/* <i ref={logoRef} className="fa-solid fa-cookie-bite fa-spin"></i> */}
            <img src={Logo} ref={logoRef} alt="logo-lavender" className='logo-lavender fa-spin'/>
          </Link>

          <div className='menu-icon' onClick={HandleRespBar}>
            <i className={clicked ? "fas fa-times respBar" : "fas fa-bars respBar"}></i>
          </div>
          
          <ul className={clicked ? "navMenu active" : "navMenu"}>
            <li className="navItem" onClick={HandleRespBar}>
              <Link to={"/"} className="navLink">
                {navbarProps.home}
              </Link>
              
            </li>
            <li className="navItem" onClick={HandleRespBar}>
              <Link to={"/"} className="navLink">
                {navbarProps.archive}
              </Link>
              
            </li>
            <li className="navItem" onClick={HandleRespBar}>
              <Link to={"/"} className="navLink">
                {navbarProps.travel}
              </Link>
              
            </li>
            {showModeratorBoard && (
              <li className="navItem" onClick={HandleRespBar}>
                <Link to={"/mod"} className="navLink">
                {navbarProps.moderatorBoard}
                </Link>
              </li>
            )}
            
            {currentUser ? (
              <>
                {showAdminBoard && (
                  <li className="navItem" onClick={HandleRespBar}>
                    <Link to={"/admin"} className="navLink">
                    {navbarProps.adminBoard}
                    </Link>
                  </li>
                )}
                <li className="navItem" onClick={HandleRespBar}>
                  <Link to={"/user"} className="navLink">
                  {navbarProps.user}
                  </Link>
                </li>
                <li className="navItem" onClick={HandleRespBar}>
                  <Link to={"/profile"} className="navLink">
                  {navbarProps.profile}
                  </Link>
                </li>
                <li className="navItem" onClick={HandleRespBar}>
                  <Link to={"/"} className="navLink" onClick={logOut}>
                  {navbarProps.logOut}
                  </Link>
                </li>
              </>
            ) : 
              <div className="">
                <Link to={"/login"} onClick={HandleRespBar}>
                  <Button>{navbarProps.login}</Button>
                </Link>{' '}
              </div>
            }
 
          </ul>
          
          
        </nav>
  )
}
