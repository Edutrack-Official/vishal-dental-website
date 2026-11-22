import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Smooth-scroll to a section by id. Returns false when it is not on this page. */
export function scrollToId(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  if (window.__lenis) window.__lenis.scrollTo(el, { offset: 28, duration: 1.3 });
  else el.scrollIntoView({ behavior: "smooth" });

  history.replaceState(null, "", `#${id}`);
  return true;
}
