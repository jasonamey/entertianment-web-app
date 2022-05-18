import React, {useState} from "react";
import styled from "styled-components";
import SearchIcon from "../assets/icon-search.svg";
import {useNavigate} from "react-router-dom";
import {device} from "../styles/devices";

const Searchbar = () => {
  const [inputTerm, setInputTerm] = useState("");
  const navigate = useNavigate();
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputTerm(e.target.value);
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    navigate(`/search/${inputTerm}`);
  };
  return (
    <SearchbarWrapper onSubmit={submitHandler}>
      <img className="search-icon" src={SearchIcon} alt="Search Icon" />
      <label htmlFor="search">Search for movies or TV series</label>
      <input
        id="search"
        placeholder="Search for movies or TV series"
        type="text"
        value={inputTerm}
        onChange={changeHandler}
      />
    </SearchbarWrapper>
  );
};

const SearchbarWrapper = styled.form`
  display: flex;
  align-items: center;
  padding-right: 30px;
  font-size: 24px;
  margin-block-end: 16px;
  position: relaive;

  .search-icon {
    width: 28px;
    margin-right: 22px;
  }
  label {
    position: absolute;
    margin: -1000px;
  }
  input {
    width: 100%;
    background: none;
    border: none;
    font-weight: 200;
    font-size: 20px;
    outline: none;
    color: white;
    &::placeholder {
      font-size: 20px;
    }
  }
  @media screen and ${device.laptop} {
    .search-icon {
      width: 19px;
      margin-right: 10px;
    }
    input {
      font-size: 15px;
      &::placeholder {
        font-size: 15px;
      }
    }
  }
`;

export default Searchbar;
