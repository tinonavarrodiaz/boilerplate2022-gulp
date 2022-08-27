const scrollAnchors = (e, respond = null, history, hh) => {
  const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
  e.preventDefault();
  var targetID = respond
    ? respond.getAttribute("href")
    : e.target.getAttribute("href");
  const targetAnchor = document.querySelector(targetID);
  if (!targetAnchor) return;
  const originalTop = distanceToTop(targetAnchor);
  window.scrollBy({ top: originalTop - hh, left: 0, behavior: "smooth" });
  if (history) window.history.pushState("", "", targetID);
  const checkIfDone = setInterval(function() {
    const atBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      // targetAnchor.tabIndex = "-1";
      targetAnchor.focus();
      clearInterval(checkIfDone);
    }
  }, 100);
};

export const scrollTo = (scrollEle, history = true, elementOffSetId = null) => {
  const links = [...document.querySelectorAll(scrollEle)];
  const elementOffSetHeight = elementOffSetId
    ? document.querySelector(elementOffSetId).clientHeight
    : 0;
  if (elementOffSetHeight !== 0)
    document.documentElement.style.setProperty(
      "--header-height",
      `${elementOffSetHeight}px`
    );
  links.map(each =>
    each.addEventListener("click", e => {
      e.preventDefault();
      scrollAnchors(e, each, history, elementOffSetHeight);
    })
  );
};
