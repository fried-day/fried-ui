import { useContext } from "react";

import { FieldContext } from "./field-context";

export interface FieldStateInput {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
}

export interface FieldState {
  isDisabled: boolean | undefined;
  isInvalid: boolean | undefined;
  isReadOnly: boolean | undefined;
  isRequired: boolean | undefined;
}

function useFieldState(props: Readonly<FieldStateInput>): FieldState {
  const ctx = useContext(FieldContext);
  const isDisabled = props.isDisabled ?? ctx?.isDisabled;
  const isInvalid = props.isInvalid ?? ctx?.isInvalid;
  const isReadOnly = props.isReadOnly ?? ctx?.isReadOnly;
  const isRequired = props.isRequired ?? ctx?.isRequired;

  return { isDisabled, isInvalid, isReadOnly, isRequired };
}

export { useFieldState };
