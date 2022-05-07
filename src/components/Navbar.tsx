import * as React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import HomeIcon from "./icons/HomeIcon";
import BookmarkIcon from "./icons/BookmarkIcon";
import MoviesIcon from "./icons/MoviesIcon";
import TVIcon from "./icons/TvIcon";
import SiteLogo from "../assets/logo.svg";
import Avatar from "./Avatar";

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
        <Avatar backgroundColor={"green"} initials={"JA"} />
      </nav>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div`
  height: 100%;
  width: ${(props) => props.theme.navbarWidth};
  padding-inline: 30px;
  position: absolute;

  nav {
    height: 800px;
    padding: 38px;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    background-color: ${(props) => props.theme.darkBlue};
    .nav-links {
      display: flex;
      flex-direction: column;
      align-items: center;
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
`;

export default Navbar;
