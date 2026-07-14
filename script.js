document.querySelectorAll("[data-year]").forEach((item) => { item.textContent = new Date().getFullYear(); });

const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
if (menu && navigation) {
  menu.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
}

const rail = document.querySelector(".project-rail");
if (rail) {
  rail.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      rail.scrollLeft += event.deltaY;
    }
  }, { passive: false });

  rail.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") rail.scrollBy({ left: window.innerWidth * 0.55, behavior: "smooth" });
    if (event.key === "ArrowLeft") rail.scrollBy({ left: -window.innerWidth * 0.55, behavior: "smooth" });
  });
}
