import * as React from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import {useLocation} from "react-router-dom";
import Searchbar from "../Searchbar";
import {useUserAuth} from "../../context/UserAuthContext";
import {collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";

type ContentPageContainerProps = {
  children: JSX.Element | JSX.Element[];
};

const ContentPageContainer = ({children}: ContentPageContainerProps) => {
  const location = useLocation();
  const {user, bookmarks} = useUserAuth();

  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <ContentPageContainerWrapper>
      <Navbar path={location.pathname} />
      <div className="right-desktop">
        <Searchbar />
        {children}
      </div>
    </ContentPageContainerWrapper>
  );
};

const ContentPageContainerWrapper = styled.div`
  @media screen and (min-width: 769px) {
    .right-desktop {
      margin-inline-start: ${(props) => props.theme.navbarWidth};
      display: flex;
      flex-direction: column;
    }
  }
`;

export default ContentPageContainer;
