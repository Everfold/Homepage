import gsap from "gsap";
import type { SceneAnimator } from "../types";

export const animateArchitectureScene: SceneAnimator = (root, ctx) => {
  if (ctx.isReducedMotion) return;

  const stage = root.querySelector<HTMLElement>('[data-anim="arch-stage"]');
  const loopNode = root.querySelector<SVGGElement>('[data-anim="arch-loop"]');
  const bridgeNode = root.querySelector<SVGGElement>(
    '[data-anim="arch-bridge"]',
  );
  const runtimeNode = root.querySelector<SVGGElement>(
    '[data-anim="arch-runtime"]',
  );
  const steps = gsap.utils.toArray<HTMLElement>(
    '[data-anim="arch-step"]',
    root,
  );

  if (ctx.isDesktop && stage) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: "top 10%",
        end: "+=1300",
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    if (loopNode && runtimeNode) {
      tl.fromTo(
        loopNode,
        { x: 90 },
        { x: 0, ease: "power2.out", duration: 1 },
        0,
      );
      tl.fromTo(
        runtimeNode,
        { x: -90 },
        { x: 0, ease: "power2.out", duration: 1 },
        0,
      );
    }

    if (bridgeNode) {
      tl.fromTo(
        bridgeNode,
        { scaleX: 0.2, opacity: 0.2 },
        { scaleX: 1, opacity: 1, ease: "power2.out", duration: 0.8 },
        0.2,
      );
    }

    if (steps.length > 0) {
      tl.fromTo(
        steps,
        { y: 18, opacity: 0.4 },
        { y: 0, opacity: 1, stagger: 0.15, ease: "power2.out", duration: 0.6 },
        0.35,
      );
    }
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top 75%",
      end: "center 40%",
      scrub: 0.6,
    },
  });

  if (loopNode && runtimeNode) {
    tl.fromTo(loopNode, { x: 40 }, { x: 0, ease: "none" }, 0);
    tl.fromTo(runtimeNode, { x: -40 }, { x: 0, ease: "none" }, 0);
  }
  if (bridgeNode) {
    tl.fromTo(
      bridgeNode,
      { scaleX: 0.4, opacity: 0.3 },
      { scaleX: 1, opacity: 1, ease: "none" },
      0,
    );
  }
};
