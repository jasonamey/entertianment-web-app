import * as React from "react";
import {Link, useNavigate} from "react-router-dom";
import FormContainer from "../components/ui/FormContainer";
import FormPageContainer from "../components/ui/FormPageContainer";
import InputField from "../components/InputField";
import styled from "styled-components";
import {useUserAuth} from "../context/UserAuthContext";
import {ValidationChecker} from "../utilities/helpers";

interface IInputState {
  email: string;
  password: string;
}

type ErrorState = IInputState & {login: string};

const LoginPage = () => {
  const [inputs, setInputs] = React.useState<IInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<ErrorState>({
    email: "",
    password: "",
    login: "",
  });
  const navigate = useNavigate();
  const {logIn} = useUserAuth();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrors({
      email: "",
      password: "",
      login: "",
    });
    const {email, password} = inputs;
    //utility class that checks all types of input validation
    const validationChecker = new ValidationChecker();
    const emailError = validationChecker.isValidEmail(email);
    const passwordError = validationChecker.isValidPassword(password);
    let errorCopy = {...errors};
    if (emailError.error) {
      errorCopy["email"] = emailError.errorMessage;
      setErrors(errorCopy);
    }
    if (passwordError.error) {
      errorCopy["password"] = passwordError.errorMessage;
      setErrors(errorCopy);
    }
    if (!emailError.error && !passwordError.error) {
      try {
        await logIn(email, password);
        return navigate("/");
      } catch (err: any) {
        if (err instanceof Error) {
          setErrors({email: "", password: "", login: "invalid login"});
        }
      }
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({
      email: "",
      password: "",
      login: "",
    });
    setInputs((prev) => ({...prev, [e.target.id]: e.target.value}));
  };

  return (
    <FormPageContainer>
      <FormContainer>
        <FormWrapper onSubmit={handleSubmit}>
          <form noValidate={true}>
            <h1>Login</h1>
            <InputField
              type="email"
              placeHolder="Email"
              id="email"
              value={inputs.email}
              error={errors.email}
              changeHandler={changeHandler}
            />
            <InputField
              type="password"
              placeHolder="Password"
              id="password"
              value={inputs.password}
              error={errors.password}
              changeHandler={changeHandler}
            />
            <button type="submit">Login to your account</button>
            <p>
              Don't have an account?
              <Link to="/signup" className="link">
                Sign Up
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
