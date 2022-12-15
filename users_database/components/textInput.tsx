/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import "../styles/Home.module.scss";

type Props = {
  label: string;
  type: string;
  onChange: any;
  name: string;
  id: string;
  errors: any;
  ref: any;
  className: any;
  testid: string;
  defaultValue: string;
};

const TextInput: React.FC<Props> = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      type,
      onChange,
      id,
      testid,
      name,
      defaultValue,
      errors,
      className,
      ...rest
    },
    ref
  ) => {
    const ErrorTag =
      errors?.type === "pattern"
        ? "Enter only alphabets"
        : errors?.type == "required"
        ? `${label} is required`
        : errors?.message;

    const style = {
      color: "#555555",
      fontSize: "14px",
      fontWeight: "500",
    };
    return (
      <div>
        <label htmlFor={label} style={style}>
          {!errors ? (
            label
          ) : (
            <p style={{ color: "red", fontSize: "14px", fontWeight: 500 }}>
              {ErrorTag}
            </p>
          )}
        </label>
        <input
          className={className}
          data-testid={testid}
          type={type}
          id={id}
          {...rest}
          defaultValue={defaultValue}
          name={name}
          onChange={onChange}
          ref={ref}
        />
      </div>
    );
  }
);

export default TextInput;
