import gsap from "gsap";
import type { SceneAnimator } from "../types";

export const animateRoadmapScene: SceneAnimator = (root, ctx) => {
  if (ctx.isReducedMotion) return;

  const targets = gsap.utils.toArray<HTMLElement>(
    '[data-anim="roadmap-card"], [data-anim="roadmap-cta"]',
    root,
  );
  if (targets.length === 0) return;

  gsap.from(targets, {
    y: 20,
    opacity: 0,
    duration: 0.55,
    stagger: 0.1,
    ease: "power2.out",
    clearProps: "transform,opacity",
    scrollTrigger: {
      trigger: root,
      start: "top 82%",
      toggleActions: "play none none none",
      once: true,
    },
  });
};
