import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

window.matchMedia = jest.fn().mockImplementation(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));
