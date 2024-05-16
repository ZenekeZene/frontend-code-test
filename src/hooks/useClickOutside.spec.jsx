import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useClickOutside } from './useClickOutside';

const DummyComponent = ({ onBlur }) => {
	useClickOutside({ onBlur });
	return <div>Dummy Component Text</div>;
};

describe('useClickOutside hook', () => {
	test('', () => {
		const user = userEvent.setup();
		const onBlur = vi.fn();
		render(<DummyComponent onBlur={onBlur}/>);
		const text = screen.getByText('Dummy Component Text');

		user.click(text);

		expect(onBlur).not.toHaveBeenCalled();
	});
});
