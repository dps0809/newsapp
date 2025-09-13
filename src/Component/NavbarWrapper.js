import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const NavbarWrapper = (props) => {
  const navigate = useNavigate();
  return <Navbar {...props} navigate={navigate} />;
};

export default NavbarWrapper;