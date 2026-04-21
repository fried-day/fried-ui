import { createContext } from "react";

export interface TextFieldContextValue {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
}

const TextFieldContext = createContext<TextFieldContextValue | null>(null);

export { TextFieldContext };
