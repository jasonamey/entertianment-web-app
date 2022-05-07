import * as React from "react";
import styled from "styled-components";

type FormContainerProps = {
  children: JSX.Element | JSX.Element[];
};

const FormContainer = ({children}: FormContainerProps) => {
  return <FormContainerWrapper>{children}</FormContainerWrapper>;
};

const FormContainerWrapper = styled.div`
  width: 316px;
  background-color: ${(props) => props.theme.darkBlue};
  padding: 30px;
  border-radius: 16px;
`;

export default FormContainer;
