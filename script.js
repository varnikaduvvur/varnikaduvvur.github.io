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

const imageNav = document.querySelector(".nav-on-image");
if (imageNav) {
  const updateNav = () => imageNav.classList.toggle("scrolled", window.scrollY > 48);
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });
}

const floatingCards = [...document.querySelectorAll("[data-float]")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (floatingCards.length && !reduceMotion && window.innerWidth > 850) {
  let scheduled = false;
  const floatCards = () => {
    floatingCards.forEach((card) => {
      const speed = Number(card.dataset.float);
      const shift = (window.innerHeight - card.getBoundingClientRect().top) * speed;
      card.style.transform = `translate3d(0, ${shift}px, 0)`;
    });
    scheduled = false;
  };
  window.addEventListener("scroll", () => {
    if (!scheduled) {
      window.requestAnimationFrame(floatCards);
      scheduled = true;
    }
  }, { passive: true });
  floatCards();
}

const contactLabel = document.querySelector(".contact-bar > span");
if (contactLabel) {
  const contactButton = document.createElement("button");
  contactButton.className = "contact-trigger";
  contactButton.type = "button";
  contactButton.textContent = "Get in touch ↗";
  contactLabel.replaceWith(contactButton);

  const dialog = document.createElement("dialog");
  dialog.className = "contact-dialog";
  dialog.setAttribute("aria-label", "Contact Varnika Duvvur");
  dialog.innerHTML = `
    <div class="contact-dialog-inner">
      <div class="contact-dialog-head">
        <div><p class="kicker light">Start a conversation</p><h2>Contact Varnika</h2></div>
        <button class="contact-close" type="button" aria-label="Close contact form">×</button>
      </div>
      <form class="contact-form">
        <input type="hidden" name="access_key" value="5b4259fe-1f91-4316-a8b1-abbbe9697ced">
        <input type="hidden" name="subject" value="New portfolio enquiry for Varnika Duvvur">
        <input type="hidden" name="from_name" value="Varnika Duvvur Portfolio">
        <input class="form-botcheck" type="checkbox" name="botcheck" tabindex="-1" autocomplete="off">
        <div class="contact-field"><label for="contact-name">Your name *</label><input id="contact-name" name="name" autocomplete="name" required placeholder="Name"></div>
        <div class="contact-field"><label for="contact-email">Your email *</label><input id="contact-email" name="email" type="email" autocomplete="email" required placeholder="Email"></div>
        <div class="contact-field message"><label for="contact-message">Your message *</label><textarea id="contact-message" name="message" required placeholder="Tell me about your project, role, or collaboration"></textarea></div>
        <p class="contact-note" aria-live="polite">Your message will be delivered directly to Varnika's inbox.</p>
        <button class="contact-submit" type="submit">Send message ↗</button>
      </form>
    </div>`;
  document.body.append(dialog);

  const closeButton = dialog.querySelector(".contact-close");
  const contactForm = dialog.querySelector(".contact-form");
  contactButton.addEventListener("click", () => dialog.showModal());
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector(".contact-submit");
    const status = contactForm.querySelector(".contact-note");
    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    status.className = "contact-note";
    status.textContent = "Sending your message securely…";
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(contactForm)
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Message could not be sent.");
      contactForm.reset();
      status.className = "contact-note success";
      status.textContent = "Thank you — your message has been sent.";
      submitButton.textContent = "Message sent ✓";
    } catch (error) {
      status.className = "contact-note error";
      status.textContent = "The message could not be sent. Please try again or use the Email link below.";
      submitButton.disabled = false;
      submitButton.textContent = "Try again ↗";
    }
  });
}
