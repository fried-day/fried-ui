import { TextField as AriaTextField } from "react-aria-components";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar } from "../../components/avatar";
import { AvatarGroup } from "../../components/avatar-group";
import { Badge } from "../../components/badge";
import { Button } from "../../components/button";
import { Description } from "../../components/description";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "../../components/field";
import { FieldError } from "../../components/field-error";
import { Input } from "../../components/input";
import { InputGroup } from "../../components/input-group";
import { Label } from "../../components/label";
import { Surface } from "../../components/surface";
import { Textarea } from "../../components/textarea";

describe("1:1 plain HTML parity — default props emit only base class", () => {
  it("Button: <Button>X</Button> renders class='button'", () => {
    const { container } = render(<Button>X</Button>);
    const el = container.querySelector("button");
    expect(el?.className).toBe("button");
  });

  it("Badge: <Badge>X</Badge> renders class='badge'", () => {
    const { container } = render(<Badge>X</Badge>);
    const el = container.querySelector("span");
    expect(el?.className).toBe("badge");
  });

  it("Surface: <Surface>X</Surface> renders class='surface'", () => {
    const { container } = render(<Surface>X</Surface>);
    const el = container.querySelector('[data-slot="surface"]');
    expect(el?.className).toBe("surface");
  });

  it("Avatar: <Avatar /> renders class='avatar'", () => {
    const { container } = render(<Avatar />);
    const el = container.querySelector('[data-slot="avatar"]');
    expect(el?.className).toBe("avatar");
  });

  it("AvatarGroup: <AvatarGroup /> renders class='avatar-group'", () => {
    const { container } = render(<AvatarGroup />);
    const el = container.querySelector('[data-slot="avatar-group"]');
    expect(el?.className).toBe("avatar-group");
  });

  it("Input: <Input /> renders class='input' on input element", () => {
    const { container } = render(<Input />);
    const el = container.querySelector('[data-slot="input"]');
    expect(el?.className).toBe("input");
  });

  it("InputGroup: <InputGroup /> renders class='input-group'", () => {
    const { container } = render(<InputGroup />);
    const el = container.querySelector('[data-slot="input-group"]');
    expect(el?.className).toBe("input-group");
  });

  it("Textarea: <Textarea /> renders class='textarea' on textarea element", () => {
    const { container } = render(<Textarea />);
    const el = container.querySelector('[data-slot="textarea"]');
    expect(el?.className).toBe("textarea");
  });

  it("Label: <Label>X</Label> renders class='label'", () => {
    const { container } = render(<Label>X</Label>);
    const el = container.querySelector("label");
    expect(el?.className).toBe("label");
  });

  it("Description: <Description>X</Description> renders class='description'", () => {
    const { container } = render(<Description>X</Description>);
    const el = container.querySelector('[data-slot="description"]');
    expect(el?.className).toBe("description");
  });

  it("FieldError: <FieldError>X</FieldError> renders class='field-error'", () => {
    const { container } = render(
      <AriaTextField isInvalid>
        <FieldError>X</FieldError>
      </AriaTextField>,
    );

    const el = container.querySelector('[data-slot="field-error"]');
    expect(el?.className).toBe("field-error");
  });

  it("Field: <Field><Input/></Field> renders class='field'", () => {
    const { container } = render(
      <Field>
        <Input />
      </Field>,
    );

    const el = container.querySelector('[data-slot="field"]');
    expect(el?.className).toBe("field");
  });

  it("FieldLabel: <FieldLabel>X</FieldLabel> renders class='field-label'", () => {
    const { container } = render(<FieldLabel>X</FieldLabel>);
    const el = container.querySelector("label");
    expect(el?.className).toBe("field-label");
  });

  it("FieldDescription: <FieldDescription>X</FieldDescription> renders class='field-description'", () => {
    const { container } = render(<FieldDescription>X</FieldDescription>);
    const el = container.querySelector('[data-slot="field-description"]');
    expect(el?.className).toBe("field-description");
  });

  it("FieldSet: <FieldSet>X</FieldSet> renders class='field-set'", () => {
    const { container } = render(<FieldSet>X</FieldSet>);
    const el = container.querySelector('[data-slot="field-set"]');
    expect(el?.className).toBe("field-set");
  });

  it("FieldLegend: <FieldLegend>X</FieldLegend> renders class='field-legend'", () => {
    const { container } = render(
      <FieldSet>
        <FieldLegend>X</FieldLegend>
      </FieldSet>,
    );

    const el = container.querySelector("legend");
    expect(el?.className).toBe("field-legend");
  });

  it("FieldGroup: <FieldGroup>X</FieldGroup> renders class='field-group'", () => {
    const { container } = render(<FieldGroup>X</FieldGroup>);
    const el = container.querySelector('[data-slot="field-group"]');
    expect(el?.className).toBe("field-group");
  });

  it("FieldTitle: <FieldTitle>X</FieldTitle> renders class='field-title'", () => {
    const { container } = render(<FieldTitle>X</FieldTitle>);
    const el = container.querySelector("h3");
    expect(el?.className).toBe("field-title");
  });

  it("FieldSeparator: <FieldSeparator /> renders class='field-separator'", () => {
    const { container } = render(<FieldSeparator />);
    const el = container.querySelector("hr");
    expect(el?.className).toBe("field-separator");
  });
});
