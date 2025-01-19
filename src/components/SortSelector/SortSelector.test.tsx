import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SortSelector } from "./SortSelector";
import "@testing-library/jest-dom";

describe("SortSelector", () => {
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    mockOnSortChange.mockClear();
  });

  test("рендеринг SortSelector с начальными данными", () => {
    render(<SortSelector sortValue="stars" onSortChange={mockOnSortChange} />);

    expect(screen.getByText("Звезды")).toBeInTheDocument();
  });

  test("не вызывает onSortChange при выборе той же опции сортировки", () => {
    render(<SortSelector sortValue="stars" onSortChange={mockOnSortChange} />);

    const selectElement = screen.getByRole("combobox");
    fireEvent.click(selectElement);
    fireEvent.click(selectElement);

    const starsOption = screen.getByText("Звезды");
    fireEvent.click(starsOption);

    expect(mockOnSortChange).not.toHaveBeenCalled();
  });
});
