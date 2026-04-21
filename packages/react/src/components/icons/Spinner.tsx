import { type ComponentPropsWithRef, useId } from "react";

const Spinner = (props: Readonly<ComponentPropsWithRef<"svg"> & { slot?: string }>) => {
  const id = useId();
  const grad1 = `spinner-grad-1-${id}`;
  const grad2 = `spinner-grad-2-${id}`;
  const fillGrad1 = `url(#${grad1})`;
  const fillGrad2 = `url(#${grad2})`;

  return (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" aria-label="Loading" {...props}>
      <defs>
        <linearGradient x1="50%" x2="50%" y1="5.271%" y2="91.793%" id={grad1}>
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>

        <linearGradient x1="50%" x2="50%" y1="15.24%" y2="87.15%" id={grad2}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <g fill="none">
        <path
          d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021"
          transform="translate(1.5 1.625)"
          fill={fillGrad1}
        />

        <path
          d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118"
          transform="translate(1.5 1.625)"
          fill={fillGrad2}
        />
      </g>
    </svg>
  );
};

Spinner.displayName = "Spinner";

export { Spinner };
