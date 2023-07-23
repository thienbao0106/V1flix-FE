import React from "react";
import { useForm } from "react-hook-form";
const CSS = `w-full rounded-md h-12 border-2 bg-opacity-40 bg-gray-500 p-3 focus:outline-none focus:border-secondColorBrighter`;
const spanClass =
  "pointer-events-none font-bold absolute left-0 p-3 transition-transform";
interface Form {
  defaultValues?: any;
  children?: any;
  onSubmit?: any;
}

interface Input {
  register?: any;
  name?: any;
  rules?: any;
  errors?: any;
  type?: string;
}

interface Select extends Input {
  options?: any;
}

export const Form: React.FC<Form> = ({ children, onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    errors,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
};

export const Input: React.FC<Input> = ({
  register,
  rules,
  name,
  errors,
  type,
  ...rest
}) => {
  return (
    <>
      <div className="relative">
        <input
          id={type}
          type={type}
          className={`${
            errors[name] ? "border-red-500" : "border-secondColor"
          } ${CSS} `}
          {...register(name, rules)}
          {...rest}
        />
        <span className={`${spanClass}`}>{`${name
          .charAt(0)
          .toUpperCase()}${name.substr(1)}`}</span>
      </div>
      {errors[name] ? (
        <>
          <span className="mt-3 text-red-400 font-bold">{`* ${errors[name].message}`}</span>
        </>
      ) : null}
    </>
  );
};

export const Select: React.FC<Select | any> = ({
  register,
  options,
  name,
  rules,
  className,
  defaultValue,
  optionsClass,
  ...rest
}) => {
  return (
    <>
      {console.log(defaultValue)}
      <select
        defaultValue={defaultValue}
        className={className}
        {...register(name, rules)}
        {...rest}
      >
        {options.map((value: any) => (
          <option className={optionsClass} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};
