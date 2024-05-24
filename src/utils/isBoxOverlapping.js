const isBoxOverlapping = (box1, box2) => {
  const rect1 = box1.getBoundingClientRect();
  const rect2 = box2.getBoundingClientRect();
  const horizontalTouch = rect1.right >= rect2.left && rect1.left <= rect2.right;
  const verticalTouch = rect1.bottom >= rect2.top && rect1.top <= rect2.bottom;
  return horizontalTouch && verticalTouch;
};

export { isBoxOverlapping };
