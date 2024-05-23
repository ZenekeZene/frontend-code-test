import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BoxText } from "./BoxText";

describe("BoxText component:", () => {
  test("if is in editing mode, the user can type on it", async () => {
    const user = userEvent.setup();
    render(<BoxText isEditing text="Hello" />);

    const boxText = screen.getByRole("textbox", { name: "Edit the text" });

    await user.type(boxText, "Hello, this is my first day at Genially.");

    const boxTextAfterTyping = screen.getByRole("textbox", {
      name: "Edit the text",
    });

    expect(boxTextAfterTyping).toHaveTextContent(
      "Hello, this is my first day at Genially.",
    );
  });

  test("if is not in editing mode, the user cannot type on it", async () => {
    const user = userEvent.setup();
    render(<BoxText text="I would like to write but..." />);

    const boxText = screen.getByRole("textbox", { name: "Edit the text" });

    await user.type(boxText, "Hello, this is my first day at Genially.");

    const boxTextAfterTyping = screen.getByRole("textbox", {
      name: "Edit the text",
    });

    expect(boxTextAfterTyping).toHaveTextContent(
      "I would like to write but...",
    );
  });
});
