import * as React from "react";
import {Link, useNavigate} from "react-router-dom";
import FormContainer from "../components/ui/FormContainer";
import FormPageContainer from "../components/ui/FormPageContainer";
import styled from "styled-components";
import {useUserAuth} from "../context/UserAuthContext";

type InputState = {
  email: string;
  password: string;
};

type ErrorState = InputState & {login: string};

const initialInputs: InputState = {
  email: "",
  password: "",
};

const initialErrorState: ErrorState = {
  email: "",
  password: "",
  login: "",
};

const LoginPage = () => {
  const [inputs, setInputs] = React.useState(initialInputs);
  const [error, setError] = React.useState(initialErrorState);
  const navigate = useNavigate();
  const {logIn} = useUserAuth();
  const validate = (type: string, input: string) => {
    let error = false;
    if (input.length === 0) {
      setError((prev) => ({...prev, type: "Can't be empty"}));
      error = true;
    }
    return error;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(initialErrorState);
    const {email, password} = inputs;
    if (!validate("email", email) && !validate("password", password)) {
      try {
        await logIn(email, password);
        navigate("/");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError({email: "", password: "", login: "invalid login"});
        }
      }
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(initialErrorState);
    setInputs((prev) => ({...prev, [e.target.id]: e.target.value}));
  };

  return (
    <FormPageContainer>
      <FormContainer>
        <FormWrapper onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-group">
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={inputs.email}
              onChange={changeHandler}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={inputs.password}
              onChange={changeHandler}
            />
          </div>
          <button type="submit">Login to your account</button>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </p>
        </FormWrapper>
      </FormContainer>
    </FormPageContainer>
  );
};

const FormWrapper = styled.form`
  position: relative;
  overflow: hidden;
  h1 {
    font-size: 28px;
    font-weight: 200;
    margin-block-end: 40px;
  }

  .input-group {
    position: relative;
    width: 100%;
    margin: 0;
    label {
      position: absolute;
      left: -2000px;
    }
    input {
      display: block;
      width: 100%;
      border: none;
      border-block-end: 1px solid ${(props) => props.theme.lightBlue};
      padding-block-end: 12px;
      padding-inline-start: 12px;
      font-size: 14px;
      margin-block-end: 22px;
      background-color: transparent;
      color: ${(props) => props.theme.white};
      font-weight: 200;
      outline: none;
    }
    .error {
      position: absolute;
      right: 0;
      top: 0;
      font-weight: 200;
      font-size: 14px;
      color: ${(props) => props.theme.red};
    }
  }

  button {
    background-color: ${(props) => props.theme.red};
    color: ${(props) => props.theme.white};
    width: 100%;
    border: none;
    cursor: pointer;
    padding-block: 16px;
    border-radius: 6px;
    font-weight: 200;
    margin-block-start: 14px;
    margin-block-end: 20px;
    transition: 0.8s;
    &:hover {
      background: ${(props) => props.theme.white};
      color: ${(props) => props.theme.darkBlue};
    }
  }
  p {
    width: 100%;
    text-align: center;
    font-weight: 200;
    .link {
      color: ${(props) => props.theme.red};
      text-decoration: none;
      margin-inline-start: 8px;
    }
  }
`;

export default LoginPage;
