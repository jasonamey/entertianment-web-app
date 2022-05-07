import * as React from "react";
import {hot} from "react-hot-loader/root";
import {ThemeProvider} from "styled-components";
import {theme} from "./styles/themes";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MoviesPage from "./pages/MoviesPage";
import BookmarksPage from "./pages/BookmarksPage";
import SearchPage from "./pages/SearchPage";
import TVPage from "./pages/TVPage";
import RedirectRoute from "./components/RedirectRoute";
import {GlobalStyle} from "./styles/GlobalStyles";
import {useUserAuth} from "./context/UserAuthContext";

console.log("the variable ENV", process.env.VAR1);

const App = (): JSX.Element => {
  const {logOut} = useUserAuth();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <button className="big-auth" onClick={() => logOut()}>
          Sign Out
        </button>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/television" element={<TVPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/search/:id" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default hot(App);
