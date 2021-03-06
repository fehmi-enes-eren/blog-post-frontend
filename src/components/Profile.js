import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../actions/language";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  //const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setLanguage(currentUser.language));
    console.log(currentUser)
  },[])
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};
export default Profile;