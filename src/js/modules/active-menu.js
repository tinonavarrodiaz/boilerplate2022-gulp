import {
  d,
  w,
  dd,
  c,
  log,
  dir,
  id,
  q,
  all,
  body,
  cssScrollBarWidth
} from "./initialVariables";

export const activeMenu = () => {
  const menu = document.getElementById("main-menu");
  if (menu) {
    const links = Array.from(menu.querySelectorAll("a"));
    links.map(link => {
      if (
        link.href === location.href ||
        link.href === location.href.slice(0, -1)
      )
        link.classList.add("active");
    });
  }
};

export const toggleMenu = (isMobile, toggleElement, mainMenu) => {
  const toggle = d.querySelector(toggleElement),
    menu = d.querySelector(mainMenu);
  if (!isMobile) {
    toggle.remove();
  } else {
    toggleMenuAction(toggle, menu);
  }
};

const toggleMenuAction = (toggle, menu) => {
  const links = Array.from(d.querySelectorAll("a"));
  toggle.addEventListener("click", e => {
    e.preventDefault();
    menu.classList.toggle("active");
  });
  menu.addEventListener("click", e => {
    let t = e.target;
    if (t.nodeName === "A") {
      menu.classList.remove("active");
    }
  });
};
