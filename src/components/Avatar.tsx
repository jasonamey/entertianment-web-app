import * as React from "react";
import styled from "styled-components";

type AvatarProps = {
  initials: string;
  backgroundColor: string;
};

type AvatarWrapperProps = {
  backgroundColor?: string;
};

const Avatar = (props: AvatarProps) => {
  const {backgroundColor, initials} = props;
  return (
    <AvatarWrapper backgroundColor={backgroundColor}>{initials}</AvatarWrapper>
  );
};

const AvatarWrapper = styled.div<AvatarWrapperProps>`
  height: 42px;
  width: 42px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.theme.avatarColors[Math.floor(Math.random() * 4)]};
`;

export default Avatar;
