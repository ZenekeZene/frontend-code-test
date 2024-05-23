import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BoxTools } from "./BoxTools";

const createBox = (props) => ({
  changeCurrentBackgroundColor: vi.fn(),
  changeCurrentColor: vi.fn(),
  setIsEditingBackgroundColor: vi.fn(),
  setIsEditingColor: vi.fn(),
  currentBackgroundColor: "#ffffff",
  backgroundColor: "#ffffff",
  ...props,
});

describe("BoxTools component:", () => {
  test(`does not render unless a box is passed to it `, () => {
    render(<BoxTools />);

    expect(() => screen.getByRole("menu")).toThrow();
  });

  test(`renders the menu and his four options if a box is passed`, () => {
    const box = createBox();
    render(<BoxTools box={box} />);

    expect(screen.getAllByRole("menuitem")).toHaveLength(4);
  });

  test(`the callback "onRemove" is called when the user
		clicks on delete option`, async () => {
    const box = createBox();
    const onRemove = vi.fn();
    render(<BoxTools box={box} onRemove={onRemove} />);

    const deleteOption = screen.getByRole("menuitem", { name: /delete/i });

    await userEvent.click(deleteOption);

    expect(onRemove).toHaveBeenCalled();
  });

  test(`the callback "changeCurrentColor" of the box is called when the user
		changes the color input`, () => {
    const changeCurrentColor = vi.fn();
    const box = createBox({ changeCurrentColor });
    render(<BoxTools box={box} />);

    const colorInput = screen.getByLabelText(/change text color/i);

    fireEvent.input(colorInput, { target: { value: "#000000" } });

    expect(changeCurrentColor).toHaveBeenCalledWith("#000000");
  });

  test(`the callback "changeCurrentBackgroundColor" of the box is called when the user
		changes the background color input`, () => {
    const changeCurrentBackgroundColor = vi.fn();
    const box = createBox({ changeCurrentBackgroundColor });
    render(<BoxTools box={box} />);

    const colorInput = screen.getByLabelText(/change background color/i);

    fireEvent.input(colorInput, { target: { value: "#000000" } });

    expect(changeCurrentBackgroundColor).toHaveBeenCalledWith("#000000");
  });

  test(`the callback "changeColor" of the box is called when the user
		leaves the color input`, () => {
    const changeColor = vi.fn();
    const box = createBox({ changeColor });
    render(<BoxTools box={box} />);

    const colorInput = screen.getByLabelText(/change text color/i);

    fireEvent.blur(colorInput, { target: { value: "#000000" } });

    expect(changeColor).toHaveBeenCalledWith("#000000");
  });

  test(`the callback "changeBackgroundColor" of the box is called when the user
		leaves the background color input`, () => {
    const changeBackgroundColor = vi.fn();
    const box = createBox({ changeBackgroundColor });
    render(<BoxTools box={box} />);

    const colorInput = screen.getByLabelText(/change background color/i);

    fireEvent.blur(colorInput, { target: { value: "#000000" } });

    expect(changeBackgroundColor).toHaveBeenCalledWith("#000000");
  });

  test(`the callback "setIsEditingColor" of the box is called when the user
		focus the color input`, () => {
    const setIsEditingColor = vi.fn();
    const box = createBox({ setIsEditingColor });
    render(<BoxTools box={box} />);

    const colorInput = screen.getByLabelText(/change text color/i);

    fireEvent.focus(colorInput);

    expect(setIsEditingColor).toHaveBeenCalledWith(true);
  });

  test(`the callback "setIsEditingBackgroundColor" of the box is called when the user
		focus the background color input`, () => {
    const setIsEditingBackgroundColor = vi.fn();
    const box = createBox({ setIsEditingBackgroundColor });
    render(<BoxTools box={box} />);

    const colorInput = screen.getByLabelText(/change background color/i);

    fireEvent.focus(colorInput);

    expect(setIsEditingBackgroundColor).toHaveBeenCalledWith(true);
  });

  test(`the callback "setIsEditingText" of the box is called when the user
		clicks on the text option`, async () => {
    const setIsEditingText = vi.fn();
    const box = createBox({ setIsEditingText });
    render(<BoxTools box={box} />);

    const textOption = screen.getByRole("menuitem", { name: /edit text/i });

    await userEvent.click(textOption);

    expect(setIsEditingText).toHaveBeenCalledWith(true);
  });
});
