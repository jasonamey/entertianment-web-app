import * as React from "react";
import styled from "styled-components";
import TrendingMovie from "./TrendingMovie";
import {MediaContent} from "../types/MediaContent";

type TrendingMoviewsProps = {
  movies: MediaContent[];
};

const TrendingMovies = (props: TrendingMoviewsProps) => {
  const {movies} = props;
  return (
    <>
      <h2>Trending</h2>
      <TrendingMoviesWrapper>
        {Array.isArray(movies) &&
          movies.map((film: MediaContent) => (
            <TrendingMovie key={film.id} {...film} />
          ))}
      </TrendingMoviesWrapper>
    </>
  );
};

const TrendingMoviesWrapper = styled.div`
  display: flex;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: 230px;
  border-radius: 10px;
  margin-block-end: 50px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default TrendingMovies;
