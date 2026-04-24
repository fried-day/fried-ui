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

export interface FieldProps extends Omit<ComponentPropsWithRef<typeof AriaTextField>, "className" | "children"> {
  children: ReactNode;
  className?: string;
  /** Whether the field stretches to fill its container width. @default false */
  isFullWidth?: boolean;
  /** Layout orientation of children. 'responsive' renders vertical on mobile, horizontal on md+. @default 'vertical' */
  orientation?: "vertical" | "horizontal" | "responsive";
  /** Wrapper gap scale between stacked slots. @default 'md' */
  size?: "sm" | "md" | "lg";
}

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

export interface FieldLabelProps extends ComponentPropsWithRef<typeof AriaLabel> {
  /** Whether the label is disabled (dims and removes pointer events). @default false */
  isDisabled?: boolean;
  /** Whether the label is in error state (text in danger color). @default false */
  isInvalid?: boolean;
  /** Whether the field is required (shows red asterisk). @default false */
  isRequired?: boolean;
  /** Text shown in muted gray when field is NOT required (e.g. '(Optional)'). Ignored when isRequired is true. @default undefined */
  optionalMessage?: string;
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
  /** Font weight. @default 'medium' */
  weight?: "normal" | "medium" | "semibold";
}

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

export interface FieldDescriptionProps extends Omit<ComponentPropsWithRef<typeof AriaText>, "slot"> {
  /** Whether the description is disabled (dims and removes pointer events). @default false */
  isDisabled?: boolean;
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
}

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

export interface FieldErrorProps extends Omit<ComponentPropsWithRef<typeof AriaFieldError>, "className"> {
  className?: string;
  /** Whether the field error is disabled. @default false */
  isDisabled?: boolean;
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
}

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

export interface FieldSetProps extends ComponentPropsWithRef<"fieldset"> {
  /** Visual style. @default 'default' */
  variant?: "default" | "bordered";
}

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

export interface FieldLegendProps extends ComponentPropsWithRef<"legend"> {
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
}

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

export interface FieldGroupProps extends ComponentPropsWithRef<"div"> {
  /** Layout orientation. 'responsive' renders vertical on mobile, horizontal on md+. @default 'vertical' */
  orientation?: "vertical" | "horizontal" | "responsive";
  /** Size scale (gap). @default 'md' */
  size?: "sm" | "md" | "lg";
}

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

export interface FieldTitleProps extends ComponentPropsWithRef<"h3"> {
  /** HTML heading level. @default 'h3' */
  as?: "h2" | "h3" | "h4";
  /** Size scale. @default 'md' */
  size?: "sm" | "md" | "lg";
}

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

export interface FieldSeparatorProps extends ComponentPropsWithRef<"hr"> {
  /** Line style. @default 'solid' */
  variant?: "solid" | "dashed" | "dotted";
}

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
