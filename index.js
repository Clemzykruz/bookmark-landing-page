/** @format */

const id = (elementId) => document.getElementById(elementId);
const qs = (selector) => document.querySelector(selector);
const qsa = (selectorAll) => document.querySelectorAll(selectorAll);

const navigationUI = {
  hamburger_icon: qs("#hamburger-icon"),
  nav_link_container: qs("#nav__link-container"),
  nav_links: qsa(".nav__link"),
  nav_logo: qs("#nav__logo"),
  original__social_icon: qs(".footer__socials"),
};

const featuresUI = {
  features_links: qsa(".features__link"),
  features_flex: qsa(".features__flex"),
};

const newsLetterUI = {
  form: qs("#news-letter-form"),
  email: qs("#email"),
  button: qs("#form-btn"),
  error_message: qs("#error-message"),
  error_icon: qs("#error-icon"),
};
const regexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

navigationUI.hamburger_icon.addEventListener("click", () => {
  navigationUI.nav_link_container.classList.toggle("hamburger-style-modifier");
  navigationUI.nav_logo.classList.toggle("nav__logo-modifier");
  const isHamburger =
    navigationUI.hamburger_icon.src.includes("icon-hamburger.svg");
  navigationUI.hamburger_icon.src = isHamburger
    ? "./images/icon-close.svg"
    : "./images/icon-hamburger.svg";
  let existingClone = qs(".mobile-menu-socials");

  if (
    navigationUI.nav_link_container.classList.contains(
      "hamburger-style-modifier",
    )
  ) {
    if (!existingClone) {
      const clonedSocial_Icons =
        navigationUI.original__social_icon.cloneNode(true);
      clonedSocial_Icons.classList.add("mobile-menu-socials");
      navigationUI.nav_link_container.appendChild(clonedSocial_Icons);
    }
  } else {
    existingClone?.remove();
  }
});

// NAIGATION ENDS HERE

featuresUI.features_links.forEach((btn) => {
  btn.addEventListener("click", () => {
    featuresUI.features_links.forEach((link) => {
      link.classList.remove("is-active");
    });
    btn.classList.add("is-active");
    const targetpanel = btn.dataset.tab;
    console.log(targetpanel);
    featuresUI.features_flex.forEach((content) => {
      content.classList.remove("is-active");
      if (content.id === targetpanel) {
        content.classList.add("is-active");
      }
    });
  });
});

// FEATURES STYLE ENDS HERE

// console.log(newsLetterUI.email);

newsLetterUI.form.addEventListener("submit", (event) => {
  newsLetterUI.email.value = newsLetterUI.email.value.replace(/\s+/g, "");
  if (regexPattern.test(newsLetterUI.email.value) === false) {
    event.preventDefault();
    newsLetterUI.error_message.classList.remove("hidden");
    newsLetterUI.error_icon.classList.remove("hidden");
    newsLetterUI.email.classList.add("is-invalid");
  } else {
    newsLetterUI.error_message.classList.add("hidden");
    newsLetterUI.error_icon.classList.add("hidden");
    newsLetterUI.email.classList.remove("is-invalid");
  }
});
