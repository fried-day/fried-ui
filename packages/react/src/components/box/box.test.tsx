import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Box } from "./Box";

describe("Box", () => {
  it("renders a div by default", () => {
    render(<Box data-testid="box">Hello</Box>);
    const el = screen.getByTestId("box");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveTextContent("Hello");
  });

  it("renders as a different element", () => {
    render(
      <Box as="section" data-testid="box">
        Hello
      </Box>,
    );

    expect(screen.getByTestId("box").tagName).toBe("SECTION");
  });

  it("applies className", () => {
    render(<Box className="bg-red-500 p-4" data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveClass("p-4", "bg-red-500");
  });

  it("merges conflicting Tailwind classes", () => {
    render(<Box className="p-4 p-8" data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveClass("p-8");
    expect(screen.getByTestId("box")).not.toHaveClass("p-4");
  });

  it("passes through additional props", () => {
    render(<Box id="test-id" role="banner" data-testid="box" />);
    const el = screen.getByTestId("box");
    expect(el).toHaveAttribute("id", "test-id");
    expect(el).toHaveAttribute("role", "banner");
  });
});
