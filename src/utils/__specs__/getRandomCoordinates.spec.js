import { describe } from 'vitest';
import { getRandomCoordinates } from '../getRandomCoordinates';

describe('getRandomCoordinates function (utils):', () => {
	test(`should return an object with the
		random coordinates for a box`, () => {
		Math.random = vi.fn().mockReturnValue(1);
		const canvasSize = {
			width: 1000,
			height: 1000,
		};
		const boxSize = {
			width: 100,
			height: 100,
		};
		const result = getRandomCoordinates(canvasSize, boxSize);

		expect(result).toEqual({
			left: 900,
			top: 900,
		});
	});
});
