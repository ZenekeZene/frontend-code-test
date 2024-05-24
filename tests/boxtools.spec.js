import { test, expect } from "@playwright/test";

test.use({
  viewport: { width: 1600, height: 1000 },
});

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe.configure({ mode: "parallel" });

test.describe("Interacting with the tools of each box: ", () => {
  test(`It allows the user to double click on a box and insert text`, async ({
    page,
  }) => {
    const boxes = page.getByRole("button", { name: "Draggable box" });
    const firstBox = boxes.first();
    await firstBox.click();
    await expect(firstBox).toHaveAttribute("aria-pressed", "true");

    await firstBox.dblclick();
    await page.keyboard.type(" also known as Héctor Villar", { delay: 100 });

    await expect(firstBox).toHaveText(/Héctor Villar/);
  });

  test(`It allows the user to change the background color of a box`, async ({
    page,
  }) => {
    const boxes = page.getByRole("button", { name: "Draggable box" });
    const firstBox = boxes.first();
    await firstBox.click();
    await expect(firstBox).toHaveAttribute("aria-pressed", "true");

    const colorPicker = firstBox.getByLabel("change background color");
    await colorPicker.fill("#ff22aa");

    const style = await firstBox.getByLabel("Folder").getAttribute("style");
    expect(style).toContain("background-color: rgb(255, 34, 170)");
  });

  test(`It allows the user to change the text color of a box`, async ({
    page,
  }) => {
    const boxes = page.getByRole("button", { name: "Draggable box" });
    const secondBox = boxes.nth(1);
    await secondBox.click();
    await expect(secondBox).toHaveAttribute("aria-pressed", "true");

    const colorPicker = secondBox.getByLabel("change text color");
    await colorPicker.fill("#aa22ff");

    const style = await secondBox
      .getByRole("textbox", { name: /Edit the text/ })
      .getAttribute("style");
    expect(style).toContain("color: rgb(170, 34, 255)");
  });

  test(`It allows the user to delete a box`, async ({ page }) => {
    const boxes = page.getByRole("button", { name: "Draggable box" });
    const thirdBox = boxes.nth(2);
    await thirdBox.click();
    await expect(thirdBox).toHaveAttribute("aria-pressed", "true");

    const deleteButton = thirdBox.getByRole("menuitem", { name: "delete box" });
    await deleteButton.click();

    await expect(thirdBox).not.toBeVisible();
  });

  test(`It allows the user to edit the text of a box`, async ({ page }) => {
    const boxes = page.getByRole("button", { name: "Draggable box" });
    const firstBox = boxes.first();
    await firstBox.click();
    await expect(firstBox).toHaveAttribute("aria-pressed", "true");

    const editTextButton = firstBox.getByRole("menuitem", {
      name: "edit text",
    });
    await editTextButton.click();
    const textArea = firstBox.getByRole("textbox", { name: /Edit the text/ });
    await textArea.fill("Hi again, I am Zenekezene");

    await expect(firstBox).toHaveText(/Hi again, I am Zenekezene/);
  });
});
