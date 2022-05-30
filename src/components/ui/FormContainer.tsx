import * as React from "react";
import styled from "styled-components";
import {device} from "../../styles/devices";

type FormContainerProps = {
  children: JSX.Element | JSX.Element[];
};

const FormContainer = ({children}: FormContainerProps) => {
  return <FormContainerWrapper>{children}</FormContainerWrapper>;
};

const FormContainerWrapper = styled.div`
  width: 90%;
  background-color: ${(props) => props.theme.darkBlue};
  padding: 30px;
  border-radius: 16px;
  @media screen and ${device.mobileL} {
    width: 400px;
  }
`;

export default FormContainer;
