import * as React from "react";
import styled from "styled-components";

type IconStylesProps = {
  children: JSX.Element | JSX.Element[];
};

const IconStyles = (props: IconStylesProps) => {
  const {children} = props;
  return <IconStylesWrapper>{children}</IconStylesWrapper>;
};

const IconStylesWrapper = styled.div`
  cursor: pointer;
  @media screen and (min-width: 800px) {
    margin-block-end: 40px;
  }
`;

export default IconStyles;
