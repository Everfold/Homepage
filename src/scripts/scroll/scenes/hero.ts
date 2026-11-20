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

  const stage = root.querySelector<HTMLElement>('[data-anim="hero-stage"]');
  if (stage) {
    gsap.to(stage, {
      y: ctx.isDesktop ? -28 : -12,
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
