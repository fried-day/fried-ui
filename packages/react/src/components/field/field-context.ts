import { createContext } from "react";

export interface FieldContextValue {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

export { FieldContext };
