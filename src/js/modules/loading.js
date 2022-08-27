export const loading = (ele, time) => {
  ele.style.transition = `opacity ${time}ms`;
  ele.style.opacity = "0";
  setTimeout(() => {
    ele.remove();
  }, time);
};
