import React from 'react';

const useClickOutside = ({ onBlur = () => {} }) => {
	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (event.target !== event.currentTarget) return;
			onBlur();
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [onBlur]);
}

export { useClickOutside };
