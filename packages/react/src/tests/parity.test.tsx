import { TextField } from "react-aria-components";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar } from "../components/avatar";
import { AvatarGroup } from "../components/avatar-group";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { Description } from "../components/description";
import { FieldError } from "../components/field-error";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Surface } from "../components/surface";

describe("1:1 plain HTML parity — default props emit only base class", () => {
  it("Button: <Button>X</Button> → class='button'", () => {
    const { container } = render(<Button>X</Button>);
    const el = container.querySelector("button");
    expect(el?.className).toBe("button");
  });

  it("Badge: <Badge>X</Badge> → class='badge'", () => {
    const { container } = render(<Badge>X</Badge>);
    const el = container.querySelector("span");
    expect(el?.className).toBe("badge");
  });

  it("Surface: <Surface>X</Surface> → class='surface'", () => {
    const { container } = render(<Surface>X</Surface>);
    const el = container.querySelector('[data-slot="surface"]');
    expect(el?.className).toBe("surface");
  });

  it("Avatar: <Avatar /> → class='avatar'", () => {
    const { container } = render(<Avatar />);
    const el = container.querySelector('[data-slot="avatar"]');
    expect(el?.className).toBe("avatar");
  });

  it("AvatarGroup: <AvatarGroup /> → class='avatar-group'", () => {
    const { container } = render(<AvatarGroup />);
    const el = container.querySelector('[data-slot="avatar-group"]');
    expect(el?.className).toBe("avatar-group");
  });

  it("Input: <Input /> wrapper → class='input'", () => {
    const { container } = render(<Input />);
    const el = container.querySelector('[data-slot="input-wrapper"]');
    expect(el?.className).toBe("input");
  });

  it("Label: <Label>X</Label> → class='label'", () => {
    const { container } = render(<Label>X</Label>);
    const el = container.querySelector("label");
    expect(el?.className).toBe("label");
  });

  it("Description: <Description>X</Description> → class='description'", () => {
    const { container } = render(<Description>X</Description>);
    const el = container.querySelector('[data-slot="description"]');
    expect(el?.className).toBe("description");
  });

  it("FieldError: <FieldError>X</FieldError> → class='field-error'", () => {
    const { container } = render(
      <TextField isInvalid>
        <FieldError>X</FieldError>
      </TextField>,
    );

    const el = container.querySelector('[data-slot="field-error"]');
    expect(el?.className).toBe("field-error");
  });
});
