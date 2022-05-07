import * as React from "react";
import styled from "styled-components";
import FormContainer from "../components/ui/FormContainer";
import FormPageContainer from "../components/ui/FormPageContainer";
import {Link, useNavigate} from "react-router-dom";
import {useUserAuth} from "../context/UserAuthContext";
import {
  isValidEmail,
  isValidPassword,
  passwordsBothMatch,
} from "../utilities/helpers";

type ErrorState = {
  email: string;
  password: string;
  login: string;
};

type InputState = {
  email: string;
  password: string;
  passwordMatch: string;
};

const initialErrorState: ErrorState = {
  email: "",
  password: "",
  login: "",
};

const initialInputs: InputState = {
  email: "",
  password: "",
  passwordMatch: "",
};

const doValidationErrorsExist = (errors: ErrorState): boolean => {
  return errors.email.length > 0 && errors.password.length > 0;
};

const LoginPage = () => {
  const [inputs, setInputs] = React.useState(initialInputs);
  const [errors, setError] = React.useState(initialErrorState);
  const {signUp} = useUserAuth();
  const navigate = useNavigate();

  const validateCheck = (
    validationChoice: "email" | "password",
    validationInput: string
  ): boolean => {
    const validateFuncs = {email: isValidEmail, password: isValidPassword};
    let error = false;
    let result = validateFuncs[validationChoice](validationInput);
    if (result.length > 0) {
      setError((prev) => ({...prev, validationChoice: result}));
      error = true;
    }
    return error;
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({...prev, [e.target.id]: e.target.value}));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(initialErrorState);
    const {email, password} = inputs;
    if (
      !validateCheck("email", email) &&
      !validateCheck("password", password)
    ) {
      try {
        await signUp(email, password);
        navigate("/");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError({email: "", password: "", login: "invalid login"});
        }
      }
    }
  };
  return (
    <FormPageContainer>
      <FormContainer>
        <FormWrapper onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="input-group">
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={inputs.email}
              onChange={changeHandler}
            />
            <span className="error">{errors.email}</span>
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
            <span className="error">{errors.password}</span>
          </div>
          <div className="input-group">
            <label htmlFor="passwordMatch">password match</label>
            <input
              type="password"
              id="passwordMatch"
              placeholder="Repeat password"
              value={inputs.passwordMatch}
              onChange={changeHandler}
            />
            {inputs.password.length === inputs.passwordMatch.length &&
              !passwordsBothMatch(inputs.password, inputs.passwordMatch) && (
                <span className="error pwd-match">Passwords must match</span>
              )}
          </div>
          <button
            type="submit"
            disabled={
              !passwordsBothMatch(inputs.password, inputs.passwordMatch) ||
              doValidationErrorsExist(errors)
            }
          >
            Sign Up
          </button>
          <p>
            Have an account?
            <Link to="/login" className="link">
              Login
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
