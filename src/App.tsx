import React, {lazy} from "react";
import {hot} from "react-hot-loader/root";
import {ThemeProvider} from "styled-components";
import {theme} from "./styles/themes";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GlobalStyle} from "./styles/GlobalStyles";
import {useUserAuth} from "./context/UserAuthContext";

const Home = lazy(() => import("./pages/HomePage"));
const SignUp = lazy(() => import("./pages/SignUpPage"));
const LogIn = lazy(() => import("./pages/LoginPage"));
const Movies = lazy(() => import("./pages/MoviesPage"));
const Bookmarks = lazy(() => import("./pages/BookmarksPage"));
const Search = lazy(() => import("./pages/SearchPage"));
const TV = lazy(() => import("./pages/TVPage"));

const App = (): JSX.Element => {
  const {logOut} = useUserAuth();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        {/* <button className="big-auth" onClick={() => logOut()}>
          Sign Out
        </button> */}
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/television" element={<TV />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search/:id" element={<Search />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default hot(App);
