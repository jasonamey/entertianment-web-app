import * as React from "react";
import {useUserAuth} from "../context/UserAuthContext";
import ContentPageContainer from "../components/ui/ContentPageContainer";
import useFirebaseData from "../hooks/useFirebaseData";
import TrendingMovies from "../components/TrendingMovies";
import {MediaContent} from "../types/MediaContent";
import MediaContentDisplay from "../components/MediaContentDisplay";

type FirebaseData =
  | [isLoading: boolean, data: MediaContent[]]
  | [isLoading: boolean, data: []];

const Home = () => {
  const [isLoading = true, data = []] = useFirebaseData() as FirebaseData;
  let trendingData;
  let allContent;
  if (!isLoading) {
    if (Array.isArray(data)) {
      trendingData = data.filter((item) => item.isTrending === true);
    }
    allContent = data;
  }
  return (
    <ContentPageContainer>
      {isLoading ? (
        <div>Loading... </div>
      ) : (
        <>
          <TrendingMovies movies={trendingData as MediaContent[]} />
          <MediaContentDisplay
            content={allContent as MediaContent[]}
            headline={"Recommended for you"}
          />
        </>
      )}
    </ContentPageContainer>
  );
};

export default Home;
