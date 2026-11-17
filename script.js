/** @format */

const qs = (selector) => document.querySelector(selector);
const qsa = (selectorAll) => document.querySelectorAll(selectorAll);

const navigationUI = {
  logo: qs("#nav__logo"),
  hamburgerButton: qs("#hamburger-button"),
  hamburgerIcon: qs("#hamburger-icon"),
  navLinks: qs("#nav__link-container"),
  navOverlay: qs("#nav-overlay"),
  socialIcons: qs("#social-icons"),
};

const featureUI = {
  featuresLinkContainer: qs("#features__link-container"),
  featuresBtn: qsa(".features__link"),
  featuresContent: qsa(".features__flex"),
};

const faqUI = {
  faqContainers: qsa(".faq__que-container"),
  faqQuestions: qsa(".faq__que"),
};

const footerUI = {
  form: qs("#footer__form"),
  email: qs("#footer__email"),
  btn: qs("#footer__btn"),
  errorIcon: qs("#email-error-icon"),
  errorMessage: qs("#email-error-message"),
};

// NAVIGATION SECTION

const toggleNavigation = () => {
  const isOpen = navigationUI.navLinks.classList.toggle("nav__links--show");

  navigationUI.logo.classList.toggle("inverted", isOpen);

  navigationUI.navOverlay.classList.toggle("nav-overlay--show", isOpen);

  navigationUI.hamburgerIcon.src = isOpen
    ? "./images/icon-close.svg"
    : "./images/icon-hamburger.svg";

  navigationUI.hamburgerButton.setAttribute("aria-expanded", isOpen);

  navigationUI.hamburgerButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );

  navigationUI.socialIcons.classList.toggle("social-icons--show", isOpen);

  document.body.style.overflow = isOpen ? "hidden" : "";
};

navigationUI.hamburgerButton.addEventListener("click", toggleNavigation);

navigationUI.navOverlay.addEventListener("click", toggleNavigation);

navigationUI.navLinks.addEventListener("click", (event) => {
  const isMobile = window.matchMedia("(max-width: 659px)").matches;

  if (isMobile && event.target.closest("a")) {
    toggleNavigation();
  }
});

// FEATURES SECTION

const showFeatures = (button) => {
  const sectionKey = button.dataset.tab;

  const targetSection = qs(`[data-tab-content="${sectionKey}"]`);

  featureUI.featuresBtn.forEach((tab) => {
    tab.classList.remove("show");
    tab.setAttribute("aria-selected", "false");
    tab.setAttribute("tabindex", "-1");
  });

  button.classList.add("show");
  button.setAttribute("aria-selected", "true");
  button.setAttribute("tabindex", "0");

  featureUI.featuresContent.forEach((feature) => {
    feature.classList.remove("is-active");
  });

  targetSection.classList.add("is-active");
};

// KEYBOARD NAVIGATION FOR FEATURES

const navigateFeatureTabs = (event) => {
  const buttons = Array.from(featureUI.featuresBtn);

  const currentIndex = buttons.indexOf(event.currentTarget);

  let nextIndex;

  if (event.key === "ArrowRight") {
    nextIndex = (currentIndex + 1) % buttons.length;
  } else if (event.key === "ArrowLeft") {
    nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
  } else {
    return;
  }

  event.preventDefault();

  const nextButton = buttons[nextIndex];

  nextButton.focus();
  showFeatures(nextButton);
};

featureUI.featuresBtn.forEach((button) => {
  button.addEventListener("click", () => showFeatures(button));
  button.addEventListener("keydown", navigateFeatureTabs);
});

// FAQ SECTION

const showFaq = (event) => {
  const changedDetail = event.currentTarget;

  if (!changedDetail.open) return;

  faqUI.faqContainers.forEach((detail) => {
    if (detail !== changedDetail) {
      detail.open = false;
    }
  });
};

faqUI.faqContainers.forEach((detail) => {
  detail.addEventListener("toggle", showFaq);
});

// FOOTER SECTION

const validateFooter = (event) => {
  event.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const invalidEmail = !emailRegex.test(footerUI.email.value);

  footerUI.email.classList.toggle("isInvalid", invalidEmail);
  footerUI.errorMessage.classList.toggle("isInvalid", invalidEmail);
  footerUI.errorIcon.classList.toggle("isInvalid", invalidEmail);
};

footerUI.form.addEventListener("submit", validateFooter);
