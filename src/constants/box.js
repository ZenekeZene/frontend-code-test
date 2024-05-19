import { availableBackgroundColors, defaultFontColor } from './colors';

const widthInPixels = 136;
const heightInPixels = 66;

export const size = {
	width: widthInPixels,
	height: heightInPixels,
	get middleWidth() {
		return this.width / 2;
	},
	get middleHeight() {
		return this.height / 2;
	}
};

const boxConfigByDefault = {
	color: defaultFontColor,
	backgroundColor: availableBackgroundColors[0],
	width: size.width,
	height: size.height,
};

export default boxConfigByDefault;
