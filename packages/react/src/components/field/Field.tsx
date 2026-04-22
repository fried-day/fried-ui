"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import { useMemo } from "react";

import {
  FieldError as AriaFieldError,
  Label as AriaLabel,
  Text as AriaText,
  TextField as AriaTextField,
} from "react-aria-components";

import { classes } from "../../utils/classes";
import { FieldContext } from "./field-context";
import { useFieldState } from "./use-field-state";

import type {
  FieldDescriptionVariantsProps,
  FieldErrorVariantsProps,
  FieldGroupVariantsProps,
  FieldLabelVariantsProps,
  FieldLegendVariantsProps,
  FieldSeparatorVariantsProps,
  FieldSetVariantsProps,
  FieldTitleVariantsProps,
  FieldVariantsProps,
} from "./field.variants";

type AriaTextFieldProps = Omit<ComponentPropsWithRef<typeof AriaTextField>, "className" | "children">;

export type FieldProps = FieldVariantsProps & {
  children: ReactNode;
  className?: string;
} & AriaTextFieldProps;

/**
 * A container for a single labeled form field. Wraps a React Aria TextField so child `FieldLabel`, `FieldDescription`, and `FieldError` slots pick up `isDisabled`/`isInvalid`/`isReadOnly`/`isRequired` via context.
 * Compose with standalone `Input`, `Textarea`, `Checkbox`, or `Select` children in the order you want them rendered.
 */
const Field = (props: Readonly<FieldProps>) => {
  const { children, className, isFullWidth, orientation, ref, size, ...rest } = props;

  const wrapperClassName = classes({
    block: "field",
    modifiers: {
      size,
      orientation,
      "full-width": isFullWidth,
    },
    className,
  });

  const { isDisabled, isInvalid, isReadOnly, isRequired } = props;

  const contextValue = useMemo(() => {
    return { isDisabled, isInvalid, isReadOnly, isRequired };
  }, [isDisabled, isInvalid, isReadOnly, isRequired]);

  return (
    <FieldContext.Provider value={contextValue}>
      <AriaTextField data-slot="field" className={wrapperClassName} ref={ref} {...rest}>
        {children}
      </AriaTextField>
    </FieldContext.Provider>
  );
};

Field.displayName = "Field";

/* FieldLabel */

export type FieldLabelProps = FieldLabelVariantsProps & {
  className?: string;
} & Omit<ComponentPropsWithRef<typeof AriaLabel>, "className">;

/**
 * A label identifying a form field, paired with `htmlFor` or auto-linked via `Field` slot context.
 * Use `isRequired` to show the asterisk or `optionalMessage` to mark optional fields.
 */
const FieldLabel = (props: Readonly<FieldLabelProps>) => {
  const { children, className, optionalMessage, ref, size, weight, ...rest } = props;
  const { isDisabled, isInvalid, isRequired } = useFieldState(props);

  const labelClassName = classes({
    block: "field-label",
    modifiers: {
      size,
      weight,
      invalid: isInvalid,
      disabled: isDisabled,
    },
    className,
  });

  return (
    <AriaLabel slot="label" data-slot="field-label" className={labelClassName} ref={ref} {...rest}>
      {children}

      {isRequired ? (
        <span className="field-label-required" aria-hidden="true">
          *
        </span>
      ) : (
        optionalMessage && <span className="field-label-optional">{optionalMessage}</span>
      )}
    </AriaLabel>
  );
};

FieldLabel.displayName = "FieldLabel";

/* FieldDescription */

export type FieldDescriptionProps = FieldDescriptionVariantsProps & {
  className?: string;
} & Omit<ComponentPropsWithRef<typeof AriaText>, "className" | "slot">;

/**
 * Helper text describing a form field, paired with a FieldLabel and input.
 */
const FieldDescription = (props: Readonly<FieldDescriptionProps>) => {
  const { children, className, ref, size, ...rest } = props;
  const { isDisabled } = useFieldState(props);

  const descriptionClassName = classes({
    block: "field-description",
    modifiers: {
      size,
      disabled: isDisabled,
    },
    className,
  });

  return (
    <AriaText slot="description" data-slot="field-description" className={descriptionClassName} ref={ref} {...rest}>
      {children}
    </AriaText>
  );
};

FieldDescription.displayName = "FieldDescription";

/* FieldError */

export type FieldErrorProps = FieldErrorVariantsProps & {
  className?: string;
} & Omit<ComponentPropsWithRef<typeof AriaFieldError>, "className">;

/**
 * An error message for a form field. Renders inside Field and auto-shows when the field is invalid.
 */
const FieldError = (props: Readonly<FieldErrorProps>) => {
  const { children, className, ref, size, ...rest } = props;
  const { isDisabled } = useFieldState(props);

  const fieldErrorClassName = classes({
    block: "field-error",
    modifiers: {
      size,
      disabled: isDisabled,
    },
    className,
  });

  return (
    <AriaFieldError data-slot="field-error" className={fieldErrorClassName} ref={ref} {...rest}>
      {children}
    </AriaFieldError>
  );
};

FieldError.displayName = "FieldError";

/* FieldSet */

export type FieldSetProps = FieldSetVariantsProps & {
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithRef<"fieldset">, "className" | "children">;

/**
 * A semantic grouping of related fields using the HTML `<fieldset>` element.
 * Pair with `FieldLegend` as the first child to announce the group name to assistive technology.
 */
const FieldSet = (props: Readonly<FieldSetProps>) => {
  const { children, className, ref, variant, ...rest } = props;

  const fieldSetClassName = classes({
    block: "field-set",
    modifiers: {
      variant,
    },
    className,
  });

  return (
    <fieldset data-slot="field-set" className={fieldSetClassName} ref={ref} {...rest}>
      {children}
    </fieldset>
  );
};

FieldSet.displayName = "FieldSet";

/* FieldLegend */

export type FieldLegendProps = FieldLegendVariantsProps & {
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithRef<"legend">, "className" | "children">;

/**
 * The accessible title for a `FieldSet`. Wraps the HTML `<legend>` element.
 */
const FieldLegend = (props: Readonly<FieldLegendProps>) => {
  const { children, className, ref, size, ...rest } = props;

  const legendClassName = classes({
    block: "field-legend",
    modifiers: {
      size,
    },
    className,
  });

  return (
    <legend data-slot="field-legend" className={legendClassName} ref={ref} {...rest}>
      {children}
    </legend>
  );
};

FieldLegend.displayName = "FieldLegend";

/* FieldGroup */

export type FieldGroupProps = FieldGroupVariantsProps & {
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithRef<"div">, "className" | "children">;

/**
 * A layout wrapper for stacking multiple `Field` children.
 * Use `orientation` to lay them out vertically (default), horizontally, or responsively (stacked on mobile, inline on md+).
 */
const FieldGroup = (props: Readonly<FieldGroupProps>) => {
  const { children, className, orientation, ref, size, ...rest } = props;

  const groupClassName = classes({
    block: "field-group",
    modifiers: {
      orientation,
      size,
    },
    className,
  });

  return (
    <div role="group" data-slot="field-group" className={groupClassName} ref={ref} {...rest}>
      {children}
    </div>
  );
};

FieldGroup.displayName = "FieldGroup";

/* FieldTitle */

export type FieldTitleProps = FieldTitleVariantsProps & {
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithRef<"h3">, "className" | "children">;

/**
 * A section heading for form groups. Wraps a configurable heading element (`h2`/`h3`/`h4`) for non-fieldset contexts where `FieldLegend` isn't appropriate.
 */
const FieldTitle = (props: Readonly<FieldTitleProps>) => {
  const { as = "h3", children, className, ref, size, ...rest } = props;

  const titleClassName = classes({
    block: "field-title",
    modifiers: {
      size,
    },
    className,
  });

  const Heading = as;

  return (
    <Heading data-slot="field-title" className={titleClassName} ref={ref} {...rest}>
      {children}
    </Heading>
  );
};

FieldTitle.displayName = "FieldTitle";

/* FieldSeparator */

export type FieldSeparatorProps = FieldSeparatorVariantsProps & {
  className?: string;
} & Omit<ComponentPropsWithRef<"hr">, "className" | "children">;

/**
 * A visual divider between form groups. Wraps a semantic `<hr>` element.
 */
const FieldSeparator = (props: Readonly<FieldSeparatorProps>) => {
  const { className, ref, variant, ...rest } = props;

  const separatorClassName = classes({
    block: "field-separator",
    modifiers: {
      variant,
    },
    className,
  });

  return <hr data-slot="field-separator" className={separatorClassName} ref={ref} {...rest} />;
};

FieldSeparator.displayName = "FieldSeparator";

export {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
};
