import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import React from "react";

describe("Header", () => {
  test("должен рендерить логотип с правильным src и alt", () => {
    render(<Header />);

    const imgElement = screen.getByAltText("логотип VK");
    expect(imgElement).toBeInTheDocument();

    expect(imgElement).toHaveAttribute("src", "vk_logo.svg");
  });

  test("должен содержать правильную ссылку", () => {
    render(<Header />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      "https://github.com/wlladiisllaw/github-search",
    );
  });

  test('должен отображать заголовок с текстом "ГитГид"', () => {
    render(<Header />);

    expect(screen.getByText("ГитГид")).toBeInTheDocument();
  });

  test("должен иметь правильный класс у контейнера header", () => {
    const { container } = render(<Header />);

    expect(container.firstChild).toHaveClass("header");
  });

  test("должен иметь правильный класс у логотипа", () => {
    render(<Header />);

    const imgElement = screen.getByAltText("логотип VK");
    expect(imgElement).toHaveClass("logo");
  });

  test("должен иметь правильный класс у заголовка", () => {
    render(<Header />);

    const titleElement = screen.getByText("ГитГид");
    expect(titleElement).toHaveClass("title");
  });
});
