import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../userContext";

function NavBar({ logOut }) {
  const {user} = useContext(UserContext);
  
  if (user.username) {
    return (
      <nav className="NavBar">
        <NavLink exact to="/">Jobly
        </NavLink>
        <NavLink exact to="/companies">Companies
        </NavLink>
        <NavLink exact to="/jobs">Jobs
        </NavLink>
        <NavLink exact to="/profile">{user.username}</NavLink>
        <button onClickCapture={logOut}>Log out</button>
      </nav>)
  } else {
    return (
      <nav className="NavBar">
        <NavLink exact to="/">Jobly
        </NavLink>
        <NavLink exact to="/companies">Companies
        </NavLink>
        <NavLink exact to="/jobs">Jobs
        </NavLink>
        <NavLink exact to="/login">Log in</NavLink>
        <NavLink exact to="/signup">Sign up</NavLink>
      </nav>);
  }


}

export default NavBar;