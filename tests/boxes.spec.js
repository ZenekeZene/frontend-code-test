import { test, expect } from '@playwright/test';

test.use({
	viewport: { width: 1600, height: 1000 },
});

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test.describe.configure({ mode: 'parallel' });

test.describe('Dragging the boxes and undo/redo actions: ', () => {
	test(`The canvas renders three boxes as default`, async ({ page }) => {
		const boxes = page.getByRole('button', { name: 'Draggable box' });

		await expect(boxes).toHaveCount(3);
	});

	test(`It allows drag the boxes with the mouse`, async ({ page }) => {
		const boxes = page.getByRole('button', { name: 'Draggable box' });
		const firstBox = boxes.first();
		await firstBox.click();
		await expect(firstBox).toHaveAttribute('aria-pressed', 'true');

		const expected = { x: 536, y: 467 };
		const move = { x: 100, y: 100 };
		const offset = { x: 10, y: 10 };
		const { x, y } = await firstBox.boundingBox();
		expect(x).toBe(expected.x);
		expect(y).toBe(expected.y);

		await page.mouse.move(x + offset.x, y + offset.y);
		await page.mouse.down();
		await page.mouse.move(x + move.x, y + move.y);
		await page.mouse.up();

		const newCoordinates = await firstBox.boundingBox()
		expect(newCoordinates.x).toBe(expected.x + move.x - offset.x);
		expect(newCoordinates.y).toBe(expected.y + move.y - offset.y);
	});

	test(`It allows the user to undo the last action`, async ({ page }) => {
		const boxes = page.getByRole('button', { name: 'Draggable box' });
		const lastBox = boxes.nth(2);
		await lastBox.click();
		await expect(lastBox).toHaveAttribute('aria-pressed', 'true');

		const deleteButton = lastBox.getByRole('menuitem', { name: 'delete box' });
		await deleteButton.click();
		await expect(lastBox).not.toBeVisible();

		const undoButton = page.getByRole('button', { name: 'Undo' });
		await undoButton.click();
		await expect(lastBox).toBeVisible();
	});

	test(`It allows the user to redo the last action`, async ({ page }) => {
		const boxes = page.getByRole('button', { name: 'Draggable box' });
		const lastBox = boxes.nth(2);
		await lastBox.click();
		await expect(lastBox).toHaveAttribute('aria-pressed', 'true');

		const deleteButton = lastBox.getByRole('menuitem', { name: 'delete box' });
		await deleteButton.click();
		await expect(lastBox).not.toBeVisible();

		const undoButton = page.getByRole('button', { name: 'Undo' });
		await undoButton.click();
		await expect(lastBox).toBeVisible();

		const redoButton = page.getByRole('button', { name: 'Redo' });
		await redoButton.click();
		await expect(lastBox).not.toBeVisible();
	});
});
