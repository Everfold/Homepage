import gsap from "gsap";
import type { SceneAnimator } from "../types";

export const animateProblemScene: SceneAnimator = (root, ctx) => {
  if (ctx.isReducedMotion) return;

  const stage = root.querySelector<HTMLElement>('[data-anim="problem-stage"]');
  const beats = gsap.utils.toArray<HTMLElement>(
    '[data-anim="problem-beat"]',
    root,
  );
  const visualStates = gsap.utils.toArray<HTMLElement>(
    '[data-anim="problem-visual-state"]',
    root,
  );

  if (ctx.isDesktop && stage && beats.length > 0) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: "top 12%",
        end: "+=1100",
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    beats.forEach((beat, index) => {
      const stateCard = visualStates[index];
      const position = index * 0.7;

      tl.fromTo(
        beat,
        { opacity: index === 0 ? 1 : 0.45, y: index === 0 ? 0 : 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        position,
      );

      if (stateCard) {
        tl.fromTo(
          stateCard,
          { opacity: index === 0 ? 1 : 0.4, scale: index === 0 ? 1 : 0.97 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
          position,
        );
      }

      if (index > 0) {
        const prevBeat = beats[index - 1];
        const prevState = visualStates[index - 1];
        if (prevBeat) {
          tl.to(prevBeat, { opacity: 0.72, duration: 0.4 }, position);
        }
        if (prevState) {
          tl.to(prevState, { opacity: 0.65, duration: 0.4 }, position);
        }
      }
    });

    tl.to(
      [...beats, ...visualStates],
      { opacity: 1, scale: 1, duration: 0.35 },
      "+=0.1",
    );
    return;
  }

  if (beats.length > 0) {
    gsap.from(beats, {
      y: 20,
      opacity: 0,
      duration: 0.55,
      stagger: 0.1,
      ease: "power2.out",
      clearProps: "transform,opacity",
      scrollTrigger: {
        trigger: root,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  }
};
