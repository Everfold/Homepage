import gsap from "gsap";
import type { SceneAnimator } from "../types";

export const animateWorkspacesScene: SceneAnimator = (root, ctx) => {
  if (!ctx.isDesktop || ctx.isReducedMotion) {
    delete root.dataset.horizontalActive;
    return;
  }

  const stage = root.querySelector<HTMLElement>(
    '[data-anim="workspaces-stage"]',
  );
  const viewport = root.querySelector<HTMLElement>(
    "[data-workspaces-viewport]",
  );
  const track = root.querySelector<HTMLElement>("[data-workspaces-track]");
  const progressBar = root.querySelector<HTMLElement>(
    '[data-anim="workspaces-progress"]',
  );

  if (!stage || !viewport || !track) {
    return;
  }

  root.dataset.horizontalActive = "true";

  const getScrollDistance = () =>
    Math.max(0, track.scrollWidth - viewport.clientWidth);

  if (getScrollDistance() > 0) {
    gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: stage,
        start: "top 12%",
        end: () => `+=${Math.max(getScrollDistance(), 480)}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (progressBar) {
            gsap.set(progressBar, { scaleX: self.progress });
          }
        },
      },
    });
  }

  return () => {
    delete root.dataset.horizontalActive;
    if (progressBar) {
      gsap.set(progressBar, { clearProps: "transform" });
    }
  };
};
