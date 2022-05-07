import * as React from "react";
import {MediaContent} from "../types/MediaContent";
import styled from "styled-components";
import BookmarkBadge from "./BookmarkBadge";
import TitleBadge from "./TitleBadge";

const TrendingMovie = (props: MediaContent) => {
  const {year, category, rating, title, id} = props;
  const {trending} = props.thumbnail;
  if (trending !== undefined) {
    const {small, large} = trending;
    return (
      <TrendingMovieWrapper largeImage={large} smallImage={small}>
        <TitleBadge
          position={"trending"}
          {...{year, category, rating, title}}
        />
        <BookmarkBadge id={id} />
        <div className="image-container"></div>
      </TrendingMovieWrapper>
    );
  } else {
    return <div>loading...</div>;
  }
};

const TrendingMovieWrapper = styled.div<{
  largeImage: string;
  smallImage: string;
}>`
  position: relative;
  overflow: hidden;
  margin-inline-end: 40px;
  min-width: 470px;
  border-radius: 10px;

  .image-container {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("${(props) => props.smallImage}");
    transition: all 1.4s;
    &:hover {
      transform: scale(1.1);
    }
  }
  @media screen and (min-width: 800px) {
    .image-container {
      background-image: url("${(props) => props.largeImage}");
    }
  }
`;

export default TrendingMovie;
