import { render, screen, fireEvent } from "@testing-library/react";
import { RepositoryCard } from "./RepositoryCard";
import { repositoryStore } from "../../store/repositoryStore";
import { Repository } from "../../store/repositoryStore";
import React from "react";

jest.mock("../../store/repositoryStore", () => ({
  repositoryStore: {
    data: [],
    updateRepository: jest.fn(),
    removeRepository: jest.fn(),
  },
}));

describe("RepositoryCard", () => {
  const repo: Repository = {
    name: "Test Repo",
    avatar: "https://example.com/avatar.jpg",
    html_url: "https://github.com/test-repo",
    stars: 10,
    stargazers_count: 10,
    forks: 5,
    created_at: "2025-01-01",
    owner: { avatar_url: "https://example.com/owner-avatar.jpg" },
  };

  const index = 0;

  test("корректное отображение данных репозитория", () => {
    render(<RepositoryCard repo={repo} index={index} />);

    expect(screen.getByText(/Test Repo/i)).toBeInTheDocument();
    expect(screen.getByText(/Звёзды: 10/i)).toBeInTheDocument();
    expect(screen.getByText(/Форки: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Дата: 2025-01-01/i)).toBeInTheDocument();
  });

  test("переключение режима редактирования и сохранение изменений", () => {
    render(<RepositoryCard repo={repo} index={index} />);

    const editButton = screen.getByText("Редактировать");
    fireEvent.click(editButton);

    expect(editButton.textContent).toBe("Сохранить");

    const dateInput = screen.getByDisplayValue("2025-01-01");
    fireEvent.change(dateInput, { target: { value: "2024-01-01" } });

    const starsInput = screen.getByDisplayValue("10");
    fireEvent.change(starsInput, { target: { value: "20" } });

    const forksInput = screen.getByDisplayValue("5");
    fireEvent.change(forksInput, { target: { value: "15" } });

    fireEvent.click(editButton);

    expect(repositoryStore.updateRepository).toHaveBeenCalledWith(index, {
      created_at: "2024-01-01",
      stars: 20,
      forks: 15,
    });
  });

  test("удаление репозитория", () => {
    render(<RepositoryCard repo={repo} index={index} />);

    const deleteButton = screen.getByText("Удалить");
    fireEvent.click(deleteButton);

    expect(repositoryStore.removeRepository).toHaveBeenCalledWith(index);
  });
});
