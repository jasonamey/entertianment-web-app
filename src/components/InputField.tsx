import * as React from "react";

type InputFieldProps = {
  type: string;
  value: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({type, value, changeHandler}: InputFieldProps) => {
  return (
    <>
      <label htmlFor={type}>{type}</label>
      <input
        type={type}
        id={type}
        placeholder={type[0].toUpperCase() + type.substring(1)}
        value={value}
        onChange={changeHandler}
      />
    </>
  );
};

export default InputField;
