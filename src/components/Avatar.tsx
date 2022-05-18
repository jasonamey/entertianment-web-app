import * as React from "react";
import styled from "styled-components";

type AvatarProps = {
  initials: string;
};

const Avatar = (props: AvatarProps) => {
  const {initials} = props;
  return <AvatarWrapper>{initials}</AvatarWrapper>;
};

const AvatarWrapper = styled.div`
  height: 42px;
  width: 42px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.avatarColors[1]};
`;

export default Avatar;
