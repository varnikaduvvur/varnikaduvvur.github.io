const galleries = {
  liberty: { title: "Liberty Rail Gardens", items: [
    ["liberty-hero", "Project overview"], ["liberty-concept", "Concept and site analysis"],
    ["liberty-precedents", "Precedent studies"], ["liberty-process", "Design development"],
    ["liberty-plan", "Floor plan"], ["liberty-environment", "Environmental and daylighting studies"]
  ]},
  branch: { title: "Branch Brook Park Modern Art Gallery", items: [
    ["branch-hero", "Project overview"], ["branch-analysis", "Site and circulation analysis"],
    ["branch-plans", "Floor plans"], ["branch-sections", "Building sections"], ["branch-elevations", "Elevations and interior views"]
  ]},
  terra: { title: "The Terra Hotel", items: [
    ["terra-hero", "Project overview"], ["terra-process", "Massing development"],
    ["terra-section", "Building section"], ["terra-details", "Technical details"],
    ["terra-plans", "Floor plans"], ["terra-elevation", "Elevation and street views"]
  ]},
  masp: { title: "Flexible Spaces at MASP", items: [
    ["masp-hero", "Project overview"], ["masp-exploded", "Exploded assembly"],
    ["masp-walls", "Foldable and modular wall systems"], ["masp-softwall", "Softwall accordion system"],
    ["masp-configurations", "Spatial configurations"], ["masp-section-a", "Longitudinal section"], ["masp-section-b", "Building section"]
  ]}
};

const dialog = document.querySelector(".lightbox");
const image = document.querySelector(".lightbox-image");
const title = document.querySelector(".lightbox-title");
const count = document.querySelector(".lightbox-count");
const caption = document.querySelector(".lightbox-caption");
let activeGallery;
let activeIndex = 0;

function renderGallery() {
  const gallery = galleries[activeGallery];
  const [file, label] = gallery.items[activeIndex];
  image.src = `assets/portfolio/${file}.webp`;
  image.alt = `${gallery.title} — ${label}`;
  title.textContent = gallery.title;
  count.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(gallery.items.length).padStart(2, "0")}`;
  caption.textContent = label;
}

document.querySelectorAll("[data-gallery]").forEach((button) => button.addEventListener("click", () => {
  activeGallery = button.dataset.gallery;
  activeIndex = 0;
  renderGallery();
  dialog.showModal();
  document.body.classList.add("locked");
}));

function move(step) {
  const length = galleries[activeGallery].items.length;
  activeIndex = (activeIndex + step + length) % length;
  renderGallery();
}

document.querySelector(".previous").addEventListener("click", () => move(-1));
document.querySelector(".next").addEventListener("click", () => move(1));
document.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => document.body.classList.remove("locked"));
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
document.addEventListener("keydown", (event) => {
  if (!dialog.open) return;
  if (event.key === "ArrowRight") move(1);
  if (event.key === "ArrowLeft") move(-1);
});

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#site-nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));
document.querySelector("#year").textContent = new Date().getFullYear();
