import { render, screen } from "@testing-library/react";
import { ErrorNotification } from "./ErrorNotification";
import React from "react";

describe("ErrorNotification", () => {
  test("должен корректно рендерить сообщение об ошибке", () => {
    render(<ErrorNotification />);

    expect(screen.getByText("Упс! Ошибка!")).toBeInTheDocument();
  });

  test("должен отображать картинку ошибки с правильным атрибутом alt", () => {
    render(<ErrorNotification />);

    const imgElement = screen.getByAltText("картинка ошибки");
    expect(imgElement).toBeInTheDocument();

    expect(imgElement).toHaveAttribute("src", "error_dog_vk.jpg");
  });

  test("должен иметь правильный класс у контейнера", () => {
    const { container } = render(<ErrorNotification />);

    expect(container.firstChild).toHaveClass("errorNotification");
  });

  test("должен иметь правильный класс у изображения", () => {
    render(<ErrorNotification />);

    const imgElement = screen.getByAltText("картинка ошибки");
    expect(imgElement).toHaveClass("errorImg");
  });
});
