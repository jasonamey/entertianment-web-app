export const isValidEmail = (submittedEmail: string): string => {
  console.log("email");
  if (submittedEmail.length === 0) {
    return "Can't be empty";
  } else if (!/\S+@\S+\.\S+/.test(submittedEmail)) {
    return "Email invalid";
  } else {
    return "";
  }
};

export const isValidPassword = (submittedPassword: string): string => {
  console.log("pwd");
  if (submittedPassword.length === 0) {
    return "Can't be empty";
  } else if (submittedPassword.length < 8) {
    return "Password must be 8 characters";
  } else {
    return "";
  }
};

export const passwordsBothMatch = (pwd1: string, pwd2: string): boolean => {
  if (pwd2.length === 0) {
    return true;
  } else {
    return pwd1.length > 7 && pwd1 === pwd2;
  }
};
