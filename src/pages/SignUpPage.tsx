import * as React from "react";
import styled from "styled-components";
import FormContainer from "../components/ui/FormContainer";
import FormPageContainer from "../components/ui/FormPageContainer";
import InputField from "../components/InputField";
import {Link, useNavigate} from "react-router-dom";
import {useUserAuth} from "../context/UserAuthContext";
import {ValidationChecker} from "../utilities/helpers";

type ErrorState = {
  email: string;
  password: string;
  passwordRepeat: string;
  login: string;
};

type InputState = {
  email: string;
  password: string;
  passwordRepeat: string;
};

const LoginPage = () => {
  const [inputs, setInputs] = React.useState<InputState>({
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [errors, setErrors] = React.useState<ErrorState>({
    email: "",
    password: "",
    passwordRepeat: "",
    login: "",
  });
  const {signUp} = useUserAuth();
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({...prev, [e.target.id]: e.target.value}));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrors({
      email: "",
      password: "",
      passwordRepeat: "",
      login: "",
    });
    const {email, password, passwordRepeat} = inputs;
    const validationChecker = new ValidationChecker();
    const emailError = validationChecker.isValidEmail(email);
    const passwordError = validationChecker.isValidPassword(password);
    const passwordRepeatError = validationChecker.passwordsBothMatch(
      password,
      passwordRepeat
    );

    let errorsCopy = {...errors};
    if (emailError.error) {
      errorsCopy["email"] = emailError.errorMessage;
      setErrors(errorsCopy);
    }
    if (passwordError.error) {
      errorsCopy["password"] = passwordError.errorMessage;
      setErrors(errorsCopy);
    }
    if (passwordRepeatError.error) {
      errorsCopy["passwordRepeat"] = passwordRepeatError.errorMessage;
      setErrors(errorsCopy);
    }
    if (
      !emailError.error &&
      !passwordError.error &&
      !passwordRepeatError.error
    ) {
      try {
        await signUp(email, password);
        navigate("/");
      } catch (err: any) {
        if (err instanceof Error) {
          setErrors({
            email: "",
            password: "",
            passwordRepeat: "",
            login: "invalid login",
          });
        }
      }
    }
  };
  return (
    <FormPageContainer>
      <FormContainer>
        <FormWrapper></FormWrapper>
        <FormWrapper>
          <form onSubmit={handleSubmit} noValidate={true}>
            <h1>Sign Up</h1>
            <InputField
              type="email"
              id="email"
              value={inputs.email}
              changeHandler={changeHandler}
              placeHolder="Email"
              error={errors.email}
            />
            <InputField
              type="password"
              id="password"
              value={inputs.password}
              changeHandler={changeHandler}
              placeHolder="Password"
              error={errors.password}
            />
            <InputField
              type="password"
              id="passwordRepeat"
              value={inputs.passwordRepeat}
              changeHandler={changeHandler}
              placeHolder="Password Repeat"
              error={errors.passwordRepeat}
            />
            <button type="submit">Sign Up</button>
            <p>
              Have an account?
              <Link to="/login" className="link">
                Login
              </Link>
            </p>
          </form>
        </FormWrapper>
      </FormContainer>
    </FormPageContainer>
  );
};

const FormWrapper = styled.div`
  position: relative;
  overflow: hidden;
  h1 {
    font-size: 28px;
    font-weight: 200;
    margin-block-end: 40px;
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
