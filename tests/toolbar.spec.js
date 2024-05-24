import { test, expect } from '@playwright/test';

test.use({
	viewport: { width: 1600, height: 1000 },
});

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test.describe.configure({ mode: 'parallel' });

test.describe('Interacting with the toolbar: ', () => {
	test(`It allows the user to select multiple boxes`, async ({ page }) => {
		const boxes = page.getByRole('button', { name: 'Draggable box' });
		const firstBox = boxes.first();
		const secondBox = boxes.nth(1);
		const thirdBox = boxes.nth(2);

		await page.mouse.move(0, 0);
		await page.mouse.down();
		await page.mouse.move(0, 600);
		await page.mouse.move(1000, 600);
		await page.mouse.up();

		await expect(firstBox).toHaveAttribute('aria-pressed', 'true');
		await expect(secondBox).toHaveAttribute('aria-pressed', 'true');
		await expect(thirdBox).toHaveAttribute('aria-pressed', 'true');
	});

	test(`It allows the user to change the background
		color of multiple boxes`, async ({ page }) => {
		const boxes = page.getByRole('button', { name: 'Draggable box' });
		const firstBox = boxes.first();
		const secondBox = boxes.nth(1);
		const thirdBox = boxes.nth(2);

		await page.mouse.move(0, 0);
		await page.mouse.down();
		await page.mouse.move(0, 600);
		await page.mouse.move(1000, 600);
		await page.mouse.up();

		const colorPicker = page.getByLabel('Change background color of selected boxes');
		await colorPicker.fill('#ff22aa');

		const style = await firstBox.getByLabel('Folder').getAttribute('style');
		expect(style).toContain("background-color: rgb(255, 34, 170)");

		const style2 = await secondBox.getByLabel('Folder').getAttribute('style');
		expect(style2).toContain("background-color: rgb(255, 34, 170)");

		const style3 = await thirdBox.getByLabel('Folder').getAttribute('style');
		expect(style3).toContain("background-color: rgb(255, 34, 170)");
	});

	test(`It allows the user to delete multiple boxes`, async ({ page }) => {
		const boxes = page.getByRole('button', { name: 'Draggable box' });
		const firstBox = boxes.first();
		const secondBox = boxes.nth(1);
		const thirdBox = boxes.nth(2);

		await page.mouse.move(0, 0);
		await page.mouse.down();
		await page.mouse.move(0, 600);
		await page.mouse.move(1000, 600);
		await page.mouse.up();

		const deleteButton = page.getByRole('button', { name: 'Remove folders' });
		await deleteButton.click();

		await expect(firstBox).not.toBeVisible();
		await expect(secondBox).not.toBeVisible();
		await expect(thirdBox).not.toBeVisible();
	});

	test(`It allows the user add a new box`, async ({ page }) => {
		const addButton = page.getByRole('button', { name: 'Add folder' });
		await addButton.click();

		const boxes = page.getByRole('button', { name: 'Draggable box' });

		await expect(boxes).toHaveCount(4);
	});
});
