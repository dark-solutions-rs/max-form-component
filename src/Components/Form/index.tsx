import { ChangeEvent, FC, FormEvent, createContext, useCallback, useContext, useState } from "react";
import { get, set } from 'lodash';
import { FormContextType, FormInputProps, FormProps, KeyValueObj } from "./Types";

const FormContext = createContext<FormContextType<KeyValueObj> | undefined>(undefined);

export const Form: FC<FormProps> = ({ initialValues, onSubmit, children }) => {
  const [value, setValue] = useState(initialValues);

  const contextValue = {
    value: value,
    setValue: (obj: KeyValueObj) => setValue(obj),
  };

  const onSubmitHandler = useCallback((ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    onSubmit(value);
    return false;
  }, [onSubmit, value]);

  return <FormContext.Provider value={contextValue}>
    <form onSubmit={onSubmitHandler}>
      {children}
    </form>
  </FormContext.Provider>
}

export const FormInput: FC<FormInputProps> = (props) => {
  const context = useContext(FormContext);
  const { name, type, onChange } = props;
  const value = name && get(context?.value, name, '');
  const isNumberOrString = typeof value === 'number' || typeof value === 'string';

  const onChangeHandler = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(ev);
    const inputValue = ev.target.value;
    const newValue = (inputValue) ? (type === 'number') ? parseFloat(inputValue) : inputValue : undefined;
    name && isNumberOrString && context?.setValue(set({ ...context?.value }, name, newValue));
  }, [onChange, type, isNumberOrString, context, name]);

  const inputProps = {
    ...props,
    value: isNumberOrString ? value : undefined,
    onChange: isNumberOrString ? onChangeHandler : undefined
  };

  return <input {...inputProps} />
}