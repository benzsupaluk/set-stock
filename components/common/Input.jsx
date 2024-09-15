import React from "react";
import clsx from "clsx";
import { INPUT_SIZE } from "@/constants";

const Input = ({
  type,
  value,
  label,
  prefix,
  suffix,
  error,
  id,
  disabled = false,
  placeholder = "",
  inputRef = null,
  className = "",
  containerClassName = "",
  size = INPUT_SIZE.SM,
  onBlur = () => {},
  onFocus = () => {},
  onChange = () => {},
  ...rest
}) => {
  return (
    <div
      className={clsx("flex flex-col gap-1.5 text-left", containerClassName)}
    >
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div
        className={clsx(
          "flex relative rounded-lg border shadow-xs focus-within:border-primary-300 focus-within:ring-4 ring-primary-300/25 border-gray-300",
          className
        )}
      >
        {prefix && <>{prefix}</>}
        <input
          id={id}
          value={value}
          ref={inputRef}
          type={type}
          className={clsx(
            "w-full focus:outline-none rounded-lg text-base placeholder:text-gray-500 disabled:bg-gray-50 disabled:text-gray-500",
            size === INPUT_SIZE.SM && "py-2 px-3",
            size === INPUT_SIZE.MD && "py-2.5 px-3.5",
            prefix && "!pl-10",
            suffix && "!pr-10",
            className
          )}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
          {...rest}
        />
        {suffix && <>{suffix}</>}
      </div>
      {error && (
        <span className="text-left text-error-600 text-sm">{error}</span>
      )}
    </div>
  );
};

export default Input;
