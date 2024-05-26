const applyDelay = (callback, timeout = 0) => {
  setTimeout(() => {
    callback();
  }, timeout);
};

export { applyDelay };
