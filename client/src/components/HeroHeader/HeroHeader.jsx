import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/logo1.png";
import "./HeroHeader.scss";

const HeroHeader = () => {
  return (
  <nav className="nav" >
    <div className="header">
    <Link to="/" ><img src={Logo} alt="instock logo two arrows" />
    </Link>
    <div className="header-container">
      <Link to="/warehouses" className="header-container__link">
      Warehouses
      </Link>
      <Link to="/inventory" className="header-container__link">
      Inventory
      </Link>
    </div>
    </div>
  </nav>
  );
};

export default HeroHeader;
