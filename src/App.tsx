import React, {lazy} from "react";
import {hot} from "react-hot-loader/root";
import {ThemeProvider} from "styled-components";
import {theme} from "./styles/themes";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GlobalStyle} from "./styles/GlobalStyles";
import {useUserAuth} from "./context/UserAuthContext";
import RedirectRoute from "./components/RedirectRoute";

const Home = lazy(() => import("./pages/HomePage"));
const SignUp = lazy(() => import("./pages/SignUpPage"));
const LogIn = lazy(() => import("./pages/LoginPage"));
const Movies = lazy(() => import("./pages/MoviesPage"));
const Bookmarks = lazy(() => import("./pages/BookmarksPage"));
const Search = lazy(() => import("./pages/SearchPage"));
const TV = lazy(() => import("./pages/TVPage"));

const App = (): JSX.Element => {
  const {logOut} = useUserAuth();

  const auth = useUserAuth();
  const clickHandler = () => {
    logOut();
  };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <button className="big-auth" onClick={clickHandler}>
          Sign Out
        </button>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <RedirectRoute>
                  <Home />
                </RedirectRoute>
              }
            />
            <Route path="/login" element={<LogIn />} />
            <Route
              path="/movies"
              element={
                <RedirectRoute>
                  <Movies />
                </RedirectRoute>
              }
            />

            <Route
              path="/television"
              element={
                <RedirectRoute>
                  <TV />
                </RedirectRoute>
              }
            />

            <Route
              path="/bookmarks"
              element={
                <RedirectRoute>
                  <Bookmarks />
                </RedirectRoute>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/search/:id"
              element={
                <RedirectRoute>
                  <Search />
                </RedirectRoute>
              }
            />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default hot(App);
