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
        <div className="nav-links">
          <img className="site-logo" src={SiteLogo} alt="Site Logo" />
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
        <Avatar initials={"JA"} />
      </nav>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div`
  margin-bottom: 34px;
  position: relative;

  nav {
    padding: 16px;
    border-radius: 10px;
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
      .site-logo {
        cursor: pointer;
      }
      .nav-icon {
        width: 19px;
        cursor: pointer;
        fill: #ffffff;
      }
    }
  }
  @media screen and ${device.laptop} {
    position: absolute;
    height: 100%;
    padding: 0 30px;
    width: ${(props) => props.theme.navbarWidth};
    nav {
      flex-direction: column;
      height: 800px;
      padding: 38px;
      border-radius: 14px;
      .nav-links {
        flex-direction: column;
        .site-logo {
          margin-block-end: 78px;
          cursor: pointer;
        }
        .nav-icon {
          width: 19px;
          margin-block-end: 40px;
          cursor: pointer;
          fill: #ffffff;
        }
      }
    }
  }
`;

export default Navbar;
