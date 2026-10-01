export {};

document.documentElement.classList.add("js");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
const primaryNav = document.querySelector<HTMLElement>("#primary-navigation");
const hoverNavigation = window.matchMedia(
  "(min-width: 1081px) and (hover: hover) and (pointer: fine)",
);
const dropdowns = Array.from(
  document.querySelectorAll<HTMLDetailsElement>(".nav-dropdown"),
);
function syncDropdownState(dropdown: HTMLDetailsElement) {
  const parent = dropdown.closest(".nav-group")?.querySelector(".nav-parent");
  const submenu = dropdown.querySelector(".nav-submenu");
  if (hoverNavigation.matches && submenu?.id) {
    parent?.setAttribute("aria-expanded", String(dropdown.open));
    parent?.setAttribute("aria-controls", submenu.id);
  } else {
    parent?.removeAttribute("aria-expanded");
    parent?.removeAttribute("aria-controls");
  }
}
function setDropdownOpen(dropdown: HTMLDetailsElement, open: boolean) {
  dropdown.open = open;
  syncDropdownState(dropdown);
}
function closeDropdowns(except?: HTMLDetailsElement) {
  dropdowns.forEach((dropdown) => {
    if (dropdown !== except) setDropdownOpen(dropdown, false);
  });
}
dropdowns.forEach((dropdown) => {
  const group = dropdown.closest<HTMLElement>(".nav-group");
  syncDropdownState(dropdown);
  dropdown.addEventListener("toggle", () => syncDropdownState(dropdown));
  const openOnHoverOrFocus = () => {
    if (!hoverNavigation.matches) return;
    closeDropdowns(dropdown);
    setDropdownOpen(dropdown, true);
  };
  group?.addEventListener("mouseenter", openOnHoverOrFocus);
  group?.addEventListener("mouseleave", () => {
    if (hoverNavigation.matches && !group.contains(document.activeElement))
      setDropdownOpen(dropdown, false);
  });
  group?.addEventListener("focusin", openOnHoverOrFocus);
  group
    ?.querySelector<HTMLAnchorElement>(".nav-parent")
    ?.addEventListener("keydown", (event) => {
      if (!hoverNavigation.matches || event.key !== "ArrowDown") return;
      event.preventDefault();
      openOnHoverOrFocus();
      dropdown.querySelector<HTMLAnchorElement>(".nav-submenu a")?.focus();
    });
  dropdown
    .querySelector("summary")
    ?.addEventListener("click", () => closeDropdowns(dropdown));
  group?.addEventListener("focusout", (event) => {
    const next = event.relatedTarget;
    if (!(next instanceof Node) || !group.contains(next)) {
      setDropdownOpen(dropdown, false);
    }
  });
});
if (menuButton) menuButton.hidden = false;
function closeMenu() {
  closeDropdowns();
  menuButton?.setAttribute("aria-expanded", "false");
  primaryNav?.classList.remove("is-open");
}
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  primaryNav?.classList.toggle("is-open", open);
  if (!open) closeDropdowns();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const openDropdown = dropdowns.find((dropdown) => dropdown.open);
  if (openDropdown) {
    const trigger = hoverNavigation.matches
      ? openDropdown
          .closest(".nav-group")
          ?.querySelector<HTMLElement>(".nav-parent")
      : openDropdown.querySelector("summary");
    trigger?.focus();
    setDropdownOpen(openDropdown, false);
    return;
  }
  if (menuButton?.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (event.target instanceof Element && !event.target.closest(".site-header"))
    closeMenu();
});
primaryNav
  ?.querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document
  .querySelector(".site-header")
  ?.addEventListener("focusout", (event) => {
    const next = (event as FocusEvent).relatedTarget;
    if (
      next instanceof Node &&
      !document.querySelector(".site-header")?.contains(next)
    ) {
      closeMenu();
    }
  });
window.matchMedia("(min-width: 1081px)").addEventListener("change", closeMenu);
hoverNavigation.addEventListener("change", closeMenu);
let userPaused = false;
try {
  userPaused = localStorage.getItem("cf-motion-paused") === "true";
} catch {}
const motionButton =
  document.querySelector<HTMLButtonElement>(".motion-toggle");
function setMotion(value: boolean) {
  const paused = value || reducedMotion.matches;
  document.documentElement.classList.toggle("motion-paused", paused);
  if (motionButton) {
    motionButton.setAttribute("aria-pressed", String(paused));
    motionButton.disabled = reducedMotion.matches;
    motionButton.innerHTML = reducedMotion.matches
      ? "Reduced motion enabled"
      : paused
        ? 'Resume motion <span aria-hidden="true">▷</span>'
        : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
  }
}
if (motionButton) motionButton.hidden = false;
setMotion(userPaused);
motionButton?.addEventListener("click", () => {
  userPaused = !userPaused;
  setMotion(userPaused);
  try {
    localStorage.setItem("cf-motion-paused", String(userPaused));
  } catch {}
});
reducedMotion.addEventListener("change", () => setMotion(userPaused));
const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  reveals.forEach((element) => {
    element.classList.add("reveal-ready");
    observer.observe(element);
  });
}
document
  .querySelectorAll<HTMLElement>("[data-filter-group]")
  .forEach((group) => {
    const buttons = group.querySelectorAll<HTMLButtonElement>("[data-filter]");
    const items = group.querySelectorAll<HTMLElement>("[data-category]");
    const search = group.querySelector<HTMLInputElement>("[data-search]");
    const noun = group.dataset.filterNoun || "resource";
    group
      .querySelector<HTMLElement>("[data-filter-controls]")
      ?.removeAttribute("hidden");
    let active = "all";
    const apply = () => {
      let count = 0;
      const query = search?.value.toLowerCase().trim() || "";
      items.forEach((item) => {
        const visible =
          (active === "all" || item.dataset.category === active) &&
          (item.textContent || "").toLowerCase().includes(query);
        item.hidden = !visible;
        if (visible) count++;
      });
      group
        .querySelectorAll<HTMLElement>("[data-resource-section]")
        .forEach((section) => {
          section.hidden = !Array.from(
            section.querySelectorAll<HTMLElement>("[data-category]"),
          ).some((item) => !item.hidden);
        });
      const status = group.querySelector<HTMLElement>("[data-filter-status]");
      if (status)
        status.textContent = count
          ? `${count} ${noun}${count === 1 ? "" : "s"} found`
          : `No ${noun}s match. Try another topic or search.`;
    };
    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        active = button.dataset.filter || "all";
        buttons.forEach((b) => {
          b.setAttribute("aria-pressed", String(b === button));
          b.classList.toggle("selected", b === button);
        });
        apply();
      }),
    );
    search?.addEventListener("input", apply);
    const followAnchor = () => {
      const target = Array.from(
        group.querySelectorAll<HTMLElement>("[data-resource-section]"),
      ).find((section) => `#${section.id}` === location.hash);
      if (!target) return;
      active = "all";
      if (search) search.value = "";
      buttons.forEach((button) => {
        const selected = button.dataset.filter === "all";
        button.setAttribute("aria-pressed", String(selected));
        button.classList.toggle("selected", selected);
      });
      apply();
      target.scrollIntoView();
    };
    window.addEventListener("hashchange", followAnchor);
    document.addEventListener("click", (event) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.defaultPrevented
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      )
        return;
      const destination = new URL(link.href);
      if (destination.href === location.href) followAnchor();
    });
    apply();
    followAnchor();
  });
