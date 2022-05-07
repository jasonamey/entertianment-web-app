import * as React from "react";
import styled from "styled-components";
import MediaContentItem from "./MediaContentItem";
import {MediaContent} from "../types/MediaContent";

type MediaContentProps = {
  content: MediaContent[];
  headline: string;
};

const MediaContentDisplay = (props: MediaContentProps) => {
  const {content, headline} = props;

  return (
    <>
      <h2>{headline}</h2>
      <MediaContentDisplayWrapper>
        {Array.isArray(content) &&
          content.map((film: MediaContent) => {
            return <MediaContentItem key={film.id} {...film} />;
          })}
      </MediaContentDisplayWrapper>
    </>
  );
};

const MediaContentDisplayWrapper = styled.div`
  display: grid;

  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default MediaContentDisplay;
