import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";

const Input = ({
  label,
  placeholder,
  value,
  name,
  onChange,
  success,
  error,
  hint,
  Dummy,
  className,
  labelClass,
  inputClass,
  hintClass,
  errorMessage,
  type = "text",
  minlength,
  maxlength,
  style = {},
  ...prop
}) => {
  const textInput = useRef(null);
  const [validate, setValidValue] = useState(false);

  const handleValidity = () => {
    if (value && value.length > 1)
      setValidValue(
        textInput && textInput.current && !textInput.current.checkValidity()
      );
  };

  return (
    <div className={`${styles.input} ${className}`}>
      <label className={`${styles.input__label} ${labelClass}`}>
        {label && label}
      </label>
      {Dummy ? (
        <>
          {Dummy?.type === "reverse" ? (
            <div className={styles.input__dummy__reverse}>
              <span>{Dummy?.text}</span>
              {Dummy.Icon ? (
                <Dummy.Icon
                  onClick={Dummy?.onIconClick ? Dummy?.onIconClick : () => {}}
                  className={styles.input__dummy__reverse__icon}
                />
              ) : null}
            </div>
          ) : (
            <div className={styles.input__dummy}>
              {Dummy.Icon ? <Dummy.Icon /> : null}
              <span>{Dummy.text}</span>
            </div>
          )}
        </>
      ) : (
        <input
          value={value}
          onChange={(e) => {
            onChange(e);
            handleValidity();
          }}
          name={name}
          ref={textInput}
          type={type}
          minLength={minlength}
          maxLength={maxlength}
          style={style}
          {...prop}
          placeholder={placeholder ? placeholder : ""}
          className={`${
            value?.length < 1
              ? `${styles.input__input_placeholder}  ${styles.input__input}`
              : error
              ? styles.input__input_invalid
              : styles.input__input
          } ${inputClass || ""}`}
        />
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {validate && (
          <>
            <span className="ant-typography ant-typography-danger">
              {textInput.current.validationMessage}
            </span>
            <span className="ant-typography ant-typography-danger">
              {errorMessage}
            </span>
          </>
        )}
      </div>
      {hint && (
        <div className={`${styles.hint} ${hintClass}`}>
          <span>{hint}</span>
          {/* <div>?</div> */}
        </div>
      )}
    </div>
  );
};

export default Input;
