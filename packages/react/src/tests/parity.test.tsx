import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar } from "../components/avatar";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { Description } from "../components/description";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Surface } from "../components/surface";

describe("1:1 plain HTML parity — default props emit only base class", () => {
  it("Button: <Button>X</Button> → class='fri-button'", () => {
    const { container } = render(<Button>X</Button>);
    const el = container.querySelector("button");
    expect(el?.className).toBe("fri-button");
  });

  it("Badge: <Badge>X</Badge> → class='fri-badge'", () => {
    const { container } = render(<Badge>X</Badge>);
    const el = container.querySelector("span");
    expect(el?.className).toBe("fri-badge");
  });

  it("Surface: <Surface>X</Surface> → class='fri-surface'", () => {
    const { container } = render(<Surface>X</Surface>);
    const el = container.querySelector('[data-slot="surface"]');
    expect(el?.className).toBe("fri-surface");
  });

  it("Avatar: <Avatar /> → class='fri-avatar'", () => {
    const { container } = render(<Avatar />);
    const el = container.querySelector('[data-slot="avatar"]');
    expect(el?.className).toBe("fri-avatar");
  });

  it("Input: <Input /> wrapper → class='fri-input'", () => {
    const { container } = render(<Input />);
    const el = container.querySelector('[data-slot="input-wrapper"]');
    expect(el?.className).toBe("fri-input");
  });

  it("Label: <Label>X</Label> → class='fri-label'", () => {
    const { container } = render(<Label>X</Label>);
    const el = container.querySelector("label");
    expect(el?.className).toBe("fri-label");
  });

  it("Description: <Description>X</Description> → class='fri-description'", () => {
    const { container } = render(<Description>X</Description>);
    const el = container.querySelector('[data-slot="description"]');
    expect(el?.className).toBe("fri-description");
  });
});
