import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SceneAnimator } from "../types";

export const animateDevExperienceScene: SceneAnimator = (root, ctx) => {
  if (ctx.isReducedMotion) return;

  const targets = gsap.utils.toArray<HTMLElement>(
    '[data-anim="trace-line"], [data-anim="devex-card"]',
    root,
  );
  if (targets.length === 0) return;

  ScrollTrigger.batch(targets, {
    start: "top 88%",
    once: true,
    onEnter: (batch) => {
      gsap.fromTo(
        batch,
        { y: 16, opacity: 0.15 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          overwrite: true,
          clearProps: "transform,opacity",
        },
      );
    },
  });
};
