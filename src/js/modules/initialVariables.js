export const d = document,
  w = window,
  c = console,
  log = console.log,
  dir = console.dir,
  dd = document.documentElement,
  id = document.getElementById.bind(document),
  q = document.querySelector.bind(document),
  all = document.querySelectorAll.bind(document),
  body = document.body;

const getScrollBarWidth = () =>
  window.innerWidth - document.documentElement.getBoundingClientRect().width;

// funcion para asignar ese valor a una variable css
export const cssScrollBarWidth = () =>
  document.documentElement.style.setProperty(
    "--scrollbar",
    `${getScrollBarWidth()}px`
  );
