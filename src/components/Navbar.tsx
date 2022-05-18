import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import HomeIcon from "./icons/HomeIcon";
import BookmarkIcon from "./icons/BookmarkIcon";
import MoviesIcon from "./icons/MoviesIcon";
import TVIcon from "./icons/TvIcon";
import SiteLogo from "../assets/logo.svg";
import Avatar from "./Avatar";
import {device} from "../styles/devices";

type NavbarProps = {
  path: string;
};

const Navbar = (props: NavbarProps) => {
  const {path} = props;
  return (
    <NavbarWrapper>
      <nav>
        <div className="logo-container">
          <img className="site-logo" src={SiteLogo} alt="Site Logo" />
        </div>
        <div className="nav-links">
          {/* <img className="site-logo" src={SiteLogo} alt="Site Logo" /> */}
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
        <div className="avatar-container">
          <Avatar initials={"JA"} />
        </div>
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
      flex-direction: column;
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
      .avatar-container {
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 38px;
      }
    }
  }
`;

export default Navbar;
