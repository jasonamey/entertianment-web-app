import * as React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.svg";

type FormPageContainerProps = {
  children: JSX.Element | JSX.Element[];
};

const FormPageContainer = ({children}: FormPageContainerProps) => {
  return (
    <FormPageContainerWrapper>
      <img src={logo} alt="App Logo" className="logo" />
      {children}
    </FormPageContainerWrapper>
  );
};

const FormPageContainerWrapper = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .logo {
    position: absolute;
    top: 8%;
  }
  @media only screen and (max-height: 530px) {
    .logo {
      display: none;
    }
  }
`;

export default FormPageContainer;
