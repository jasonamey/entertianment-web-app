import React from "react";
import styled from "styled-components";
import logo from "../assets/icon-nav-movies.svg";

type TitleBadgeProps = {
  position: "trending" | "feature";
  category: string;
  year: number;
  rating: string;
  title: string;
};

const TitleBadge = (props: TitleBadgeProps) => {
  const {year, category, position, rating, title} = props;
  return (
    <TitleBadgeWrapper position={position}>
      <div className="film-info-container">
        <h4>
          <span>{`${year}`}</span>
          <span>&middot;</span>
          <span>{`${category}`}</span>
          <span>&middot;</span>
          <span>{`${rating}`}</span>
        </h4>
      </div>
      <h3>{title}</h3>
    </TitleBadgeWrapper>
  );
};

const TitleBadgeWrapper = styled.div<{position: string}>`
  position: ${(props) =>
    props.position === "trending" ? "absolute" : "static"};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  bottom: ${(props) => (props.position === "trending" ? "24px" : "0")};
  left: ${(props) => (props.position === "trending" ? "24px" : "0")};
  .film-info-container {
    opacity: 0.6;
    font-weight: 200;
    span {
      margin-inline-end: 8px;
    }
  }
  h3 {
    font-size: ${(props) => (props.position === "trending" ? "24px" : "18px")};
    letter-spacing: 1px;
  }
`;

export default TitleBadge;
