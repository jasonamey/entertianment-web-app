import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {BookmarkIcon, HomeIcon, MoviesIcon, TVIcon} from "./icons";
import SiteLogo from "../assets/logo.svg";
import {useUserAuth} from "../context/UserAuthContext";
import {device} from "../styles/devices";
import {useLocation} from "react-router-dom";

type NavbarProps = {
  path: string;
};

const Navbar = (props: NavbarProps) => {
  const location = useLocation();
  console.log("location", location);
  const {logOut, user} = useUserAuth();
  const userInitials =
    user.email.split("@")[0].length === 1
      ? user.email.slice(0, 1)
      : user.email.slice(0, 2);
  return (
    <NavbarWrapper>
      <nav>
        <Link to="/">
          <div className="logo-container">
            <img className="site-logo" src={SiteLogo} alt="Site Logo" />
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/">
            <HomeIcon />
          </Link>
          <Link to="/movies">
            <MoviesIcon />
          </Link>
          <Link to="/television">
            <TVIcon />
          </Link>
          <Link to="/bookmarks">
            <BookmarkIcon />
          </Link>
        </div>
        <button className="log-out" title="Log Out" onClick={() => logOut()}>
          {userInitials.toUpperCase()}
        </button>
      </nav>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div`
  margin-bottom: 34px;
  position: relative;
  nav {
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background-color: ${(props) => props.theme.darkBlue};
    .nav-links {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 138px;
      .site-logo {
        cursor: pointer;
      }
      .nav-icon {
        width: 14px;
        cursor: pointer;
        fill: #ffffff;
      }
    }
    .log-out {
      cursor: pointer;
      height: 42px;
      width: 42px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      border: none;
      outline: none;
      color: ${(props) => props.theme.white};
      background-color: ${(props) => props.theme.red};
      opacity: 0.3;
      &:hover {
        opacity: 1;
      }
    }
  }

  @media screen and ${device.mobileL} {
    nav {
      padding: 20px;
      .nav-links {
        width: 176px;
        .nav-icon {
          width: 19px;
        }
      }
    }
  }

  @media screen and ${device.laptop} {
    position: absolute;
    height: 100%;
    padding: 0 30px;
    width: ${(props) => props.theme.navbarWidth};
    nav {
      padding: 38px 0 0 0;
      display: block;
      height: 800px;
      border-radius: 14px;
      position: relative;
      .logo-container {
        width: 98px;
        height: auto;
        display: flex;
        justify-content: center;
        margin-bottom: 78px;
      }
      .nav-links {
        flex-direction: column;
        width: auto;
      }
      .log-out {
        position: absolute;
        bottom: 38px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
`;

export default Navbar;
