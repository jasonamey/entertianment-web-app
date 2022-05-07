import * as React from "react";
import styled from "styled-components";
import {MediaContent} from "../types/MediaContent";
import BookmarkBadge from "./BookmarkBadge";
import TitleBadge from "./TitleBadge";

type MediaContentItemProps = MediaContent & {
  id: string;
};

const MediaContentItem = (props: MediaContentItemProps) => {
  const {year, category, rating, title, id} = props;

  const {regular} = props.thumbnail;
  if (regular !== undefined) {
    const {small, large} = regular;
    return (
      <>
        <MediaContentItemWrapper largeImage={large} smallImage={small}>
          <div className="image-wrapper">
            <BookmarkBadge id={id} />
            <div className="image-container"></div>
          </div>

          <TitleBadge position="feature" {...{year, category, rating, title}} />
        </MediaContentItemWrapper>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

const MediaContentItemWrapper = styled.div<{
  largeImage: string;
  smallImage: string;
}>`
  margin-block-end: 40px;
  width: 279px;
  .image-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 180px;
    border-radius: 10px;
    margin-block-end: 8px;
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
  }
`;

export default MediaContentItem;
