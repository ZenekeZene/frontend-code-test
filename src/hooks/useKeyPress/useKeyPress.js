import React from "react";

const useKeyPress = ({ key, onDown, onUp }) => {
  const [keyPressed, setKeyPressed] = React.useState(false);

  const downHandler = React.useCallback((event) => {
    if (event.key === key) {
      setKeyPressed(true);
			onDown?.();
    }
  }, [key, onDown]);

  const upHandler = React.useCallback((event) => {
    if (event.key === key) {
      setKeyPressed(false);
			onUp?.();
    }
  }, [key, onUp]);

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
};

export { useKeyPress };
