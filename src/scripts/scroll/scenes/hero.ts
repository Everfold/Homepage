import gsap from "gsap";
import type { SceneAnimator } from "../types";

export const animateHeroScene: SceneAnimator = (root, ctx) => {
  if (ctx.isReducedMotion) return;

  const items = root.querySelectorAll<HTMLElement>('[data-anim="hero-item"]');
  if (items.length > 0) {
    gsap.from(items, {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility",
    });
  }

  const ambient = root.querySelector<HTMLElement>('[data-anim="hero-ambient"]');
  if (ambient) {
    gsap.to(ambient, {
      y: ctx.isDesktop ? -48 : -20,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
};
