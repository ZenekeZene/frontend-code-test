import React from "react";
import App from "../components/App";
import { render, screen } from '@testing-library/react';

test("Renders correctly the app", () => {
  render(<App />)
  expect(screen.getByText("Add Box")).toBeInTheDocument()
});

