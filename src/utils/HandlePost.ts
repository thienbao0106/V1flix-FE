export const checkVisibility = (itemRef: any) => {
  const position = itemRef?.current?.getBoundingClientRect();
  const { top, left, bottom, right } = position;
  const visibleTop = 0;
  const visibleLeft = 0;
  const visibleBottom = window.innerHeight;
  const visibleRight = window.innerWidth;

  if (
    top >= visibleTop &&
    left >= visibleLeft &&
    bottom <= visibleBottom &&
    right <= visibleRight
  ) {
    return true;
  } else {
    return false;
  }
};
