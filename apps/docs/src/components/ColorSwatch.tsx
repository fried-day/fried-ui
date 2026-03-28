"use client";

interface ColorSwatchProps {
  colors: ColorItemProps[];
}

export interface ColorItemProps {
  name: string;
  token: string;
}

function SwatchItem(props: Readonly<ColorItemProps>): React.JSX.Element {
  const { name, token } = props;
  const label = `${name} color swatch`;
  const bgStyle = { backgroundColor: `var(--color-${token})` };

  return (
    <div className="flex flex-col items-center gap-2" role="listitem">
      <div
        className="size-23 rounded-lg outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/20 forced-colors:outline-[Highlight]"
        role="img"
        aria-label={label}
        style={bgStyle}
      />

      <span className="max-w-20 text-center text-[11px] leading-tight text-foreground-muted">{name}</span>
    </div>
  );
}

function ColorSwatch(props: Readonly<ColorSwatchProps>): React.JSX.Element {
  const { colors } = props;

  return (
    <div className="not-prose flex flex-wrap gap-8 py-4" role="list" aria-label="Color tokens">
      {colors.map((color) => (
        <SwatchItem name={color.name} token={color.token} key={color.name} />
      ))}
    </div>
  );
}

export { ColorSwatch };
