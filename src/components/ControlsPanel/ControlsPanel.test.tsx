import { render, screen } from "@testing-library/react";
import { ControlsPanel } from "./ControlsPanel";
import React from "react";

describe("ControlsPanel", () => {
  test("должен корректно рендерить дочерние элементы внутри ControlsPanel", () => {
    const childText1 = "Child 1";
    const childText2 = "Child 2";

    render(
      <ControlsPanel>
        <div>{childText1}</div>
        <div>{childText2}</div>
      </ControlsPanel>,
    );

    expect(screen.getByText(childText1)).toBeInTheDocument();
    expect(screen.getByText(childText2)).toBeInTheDocument();
  });

  test("должен иметь правильный класс у контейнера", () => {
    const { container } = render(
      <ControlsPanel>
        <div>Child 1</div>
        <div>Child 2</div>
      </ControlsPanel>,
    );

    expect(container.firstChild).toHaveClass("controlsPanel");
  });
});
