"use client";

import type { ComponentPropsWithRef, ReactNode, Ref } from "react";

import { Button as AriaButton, type ButtonProps as AriaButtonProps, type PressEvent } from "react-aria-components";

import { XIcon } from "../icons";
import { classes } from "../../utils/classes";

import type { ChipVariantsProps } from "./chip.variants";

export type ChipProps = ChipVariantsProps & {
  children?: ReactNode;
  className?: string;
  /** Accessible label for the dismiss button. @default 'Dismiss' */
  dismissLabel?: string;
  /** Whether the chip is disabled (dims and removes interactions). @default false */
  isDisabled?: boolean;
  /** Callback fired when the dismiss (×) button is clicked. Renders a dismiss button when provided. */
  onDismiss?: () => void;
  /** Click handler for the whole chip (assist/suggestion chip pattern). When provided, chip renders as a button. */
  onPress?: (event: PressEvent) => void;
} & Omit<ComponentPropsWithRef<"span">, "className" | "children" | "onClick">;

/**
 * A chip displays a compact data status, category, or tag. Non-interactive by default.
 * Provide `onPress` to make the whole chip clickable (assist/suggestion pattern).
 * Provide `onDismiss` to render a dismiss button (filter/input pattern).
 * Children with `slot="avatar" | "icon-start" | "icon-end" | "icon"` render as leading/trailing elements.
 */
const Chip = (props: Readonly<ChipProps>) => {
  const {
    children,
    className,
    dismissLabel,
    isDisabled,
    isIconOnly,
    isSelected,
    onDismiss,
    onPress,
    radius,
    ref,
    size,
    variant,
    ...rest
  } = props;

  const isInteractive = onPress !== undefined;
  const ariaDisabled = isDisabled === true ? true : undefined;
  const ariaPressed = isInteractive && isSelected !== undefined ? isSelected : undefined;
  const buttonRef = ref as Ref<HTMLButtonElement>;
  const dismissAriaLabel = dismissLabel ?? "Dismiss";
  const handleDismiss = (): void => onDismiss?.();

  const chipClassName = classes({
    block: "chip",
    modifiers: {
      variant,
      size,
      radius,
      "icon-only": isIconOnly,
      selected: isSelected,
      disabled: isDisabled,
      interactive: isInteractive,
    },
    className,
  });

  const dismissButton =
    onDismiss === undefined ? null : (
      <AriaButton
        className="chip-dismiss"
        slot="dismiss"
        aria-label={dismissAriaLabel}
        isDisabled={isDisabled}
        onPress={handleDismiss}
      >
        <XIcon slot="icon" />
      </AriaButton>
    );

  const content = (
    <>
      {children}
      {dismissButton}
    </>
  );

  if (isInteractive) {
    const buttonRest = rest as unknown as Omit<AriaButtonProps, "className" | "children" | "isDisabled" | "onPress">;

    return (
      <AriaButton
        {...buttonRest}
        data-slot="chip"
        aria-pressed={ariaPressed}
        className={chipClassName}
        isDisabled={isDisabled}
        onPress={onPress}
        ref={buttonRef}
      >
        {content}
      </AriaButton>
    );
  }

  const role = isIconOnly ? "img" : undefined;

  return (
    <span {...rest} data-slot="chip" aria-disabled={ariaDisabled} className={chipClassName} ref={ref} role={role}>
      {content}
    </span>
  );
};

Chip.displayName = "Chip";

export { Chip };
