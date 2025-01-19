import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

jest.useFakeTimers();

describe("SearchBar", () => {
  const mockOnSearchChange = jest.fn();
  const mockOnSearch = jest.fn();

  it("должен корректно отображать компонент", () => {
    render(
      <SearchBar
        searchValue="React"
        onSearchChange={mockOnSearchChange}
        onSearch={mockOnSearch}
      />,
    );

    expect(
      screen.getByPlaceholderText("Поиск по технолиям"),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
  });

  it("должен вызывать onSearchChange при изменении значения в поле с дебаунсом", async () => {
    render(
      <SearchBar
        searchValue="React"
        onSearchChange={mockOnSearchChange}
        onSearch={mockOnSearch}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Поиск по технолиям"), {
      target: { value: "Vue" },
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(mockOnSearchChange).toHaveBeenCalledWith("Vue");
  });
});
