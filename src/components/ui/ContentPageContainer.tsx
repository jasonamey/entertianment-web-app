import * as React from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import {useLocation} from "react-router-dom";
import Searchbar from "../Searchbar";
import {useUserAuth} from "../../context/UserAuthContext";
import {collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {device} from "../../styles/devices";

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
  margin-right: 0;
  margin-inline-start: 0;
  padding: 24px;
  @media screen and ${device.laptop} {
    padding: 0;
    .right-desktop {
      margin-inline-start: ${(props) => props.theme.navbarWidth};
      display: flex;
      flex-direction: column;
    }
  }
`;

export default ContentPageContainer;
