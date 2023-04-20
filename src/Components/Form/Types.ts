import { InputHTMLAttributes, ReactNode } from "react";

export type KeyValueObj = {
  [key: string]: number | string | KeyValueObj;
};

export type FormContextType<T> = {
  value: T;
  setValue: (newValue: T) => void;
};

export type FormProps = {
  children: ReactNode;
  initialValues: KeyValueObj;
  onSubmit: (newValue: KeyValueObj) => void;
};

export type FormInputProps = InputHTMLAttributes<HTMLInputElement>;
