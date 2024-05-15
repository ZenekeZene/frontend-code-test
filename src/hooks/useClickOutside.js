import React from 'react';

const useClickOutside = ({ onClickOutside }) => {
	const ref = React.useRef(null);

	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				onClickOutside();
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [onClickOutside]);

	return ref;
}

export { useClickOutside };
