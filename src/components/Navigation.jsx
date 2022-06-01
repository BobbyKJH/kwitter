import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Navigation
const Conainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: #fff;
`;

// Home Navigation
const HomeLink = styled.div`
  font-family: "Press Start 2P", cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  padding: 1.5rem;
  color: #ffff;
`;

// My Profile Navigation
const NavLink = styled.div`
  font-family: "Press Start 2P", cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.5rem;
  padding: 0 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

function Navigation() {
  return (
    <Conainer>
      <HomeLink>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          HOME
        </Link>
      </HomeLink>

      <NavLink>
        <Link to="/profile" style={{ color: "#fff", textDecoration: "none" }}>
          MY PROFILE
        </Link>
      </NavLink>
    </Conainer>
  );
}

export default Navigation;
