import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SceneKey } from "../../data/home/scenes";
import type {
  SceneAnimatorRegistry,
  SceneCleanup,
  SceneRuntimeContext,
} from "./types";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

function setActiveChapter(activeKey: SceneKey): void {
  const links = document.querySelectorAll<HTMLElement>("[data-chapter-link]");
  links.forEach((link) => {
    const isMatch = link.dataset.chapterLink === activeKey;
    link.dataset.active = isMatch ? "true" : "false";
    if (isMatch) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

export function initHomeScrollEngine(
  registry: SceneAnimatorRegistry,
): () => void {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 1024px) and (pointer: fine)",
      isMobile: "(max-width: 1023px), (pointer: coarse)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const isDesktop = Boolean(context.conditions?.isDesktop);
      const isReducedMotion = Boolean(context.conditions?.reduceMotion);

      const wrapper = document.getElementById("smooth-wrapper");
      const content = document.getElementById("smooth-content");

      const smoother =
        isDesktop && !isReducedMotion && wrapper && content
          ? ScrollSmoother.create({
              wrapper,
              content,
              smooth: 1.1,
              effects: true,
              smoothTouch: false,
            })
          : null;

      const runtimeCtx: SceneRuntimeContext = {
        isDesktop,
        isReducedMotion,
        smoother,
      };

      const cleanups: SceneCleanup[] = [];
      let disposed = false;

      const sceneNodes = document.querySelectorAll<HTMLElement>("[data-scene]");

      // Create scene ScrollTriggers strictly in top-to-bottom DOM order
      sceneNodes.forEach((sceneEl) => {
        const key = sceneEl.dataset.scene as SceneKey | undefined;
        if (!key) return;

        const animator = registry[key];
        if (animator) {
          const cleanup = animator(sceneEl, runtimeCtx);
          if (typeof cleanup === "function") {
            cleanups.push(cleanup);
          }
        }

        ScrollTrigger.create({
          trigger: sceneEl,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveChapter(key);
            }
          },
        });
      });

      const headerEl =
        document.querySelector<HTMLElement>("[data-site-header]");
      const firstScene = sceneNodes[0];
      const lastScene = sceneNodes[sceneNodes.length - 1];

      if (headerEl && firstScene && lastScene) {
        let inFirst = true;
        let inLast = firstScene === lastScene;

        const syncHeader = () => {
          const visible = inFirst || inLast;
          headerEl.dataset.visible = visible ? "true" : "false";
          headerEl.inert = !visible;
        };

        syncHeader();

        ScrollTrigger.create({
          trigger: firstScene,
          start: -1,
          end: "bottom 25%",
          onToggle: (self) => {
            inFirst = self.isActive;
            syncHeader();
          },
          onRefresh: (self) => {
            inFirst = self.isActive;
            syncHeader();
          },
        });

        if (lastScene !== firstScene) {
          ScrollTrigger.create({
            trigger: lastScene,
            start: "top 65%",
            end: () => ScrollTrigger.maxScroll(window) + 10,
            onToggle: (self) => {
              inLast = self.isActive;
              syncHeader();
            },
            onRefresh: (self) => {
              inLast = self.isActive;
              syncHeader();
            },
          });
        }

        cleanups.push(() => {
          headerEl.dataset.visible = "true";
          headerEl.inert = false;
        });
      }

      const progressEl = document.querySelector<HTMLElement>(
        "[data-scroll-progress]",
      );
      if (
        progressEl &&
        !isReducedMotion &&
        !CSS.supports("animation-timeline", "scroll()")
      ) {
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            gsap.set(progressEl, { scaleX: self.progress });
          },
        });
      }

      const handleScrollToClick = (event: MouseEvent) => {
        const trigger = (event.target as Element | null)?.closest<HTMLElement>(
          "[data-scroll-to]",
        );
        const selector = trigger?.dataset.scrollTo;
        if (!selector) return;

        const target = document.querySelector<HTMLElement>(selector);
        if (!target) return;

        event.preventDefault();

        if (smoother) {
          smoother.scrollTo(target, true, "top top");
        } else if (isReducedMotion) {
          target.scrollIntoView({ behavior: "auto" });
        } else {
          gsap.to(window, {
            duration: 0.7,
            ease: "power2.out",
            scrollTo: { y: target, offsetY: 72 },
          });
        }

        if (selector.startsWith("#")) {
          history.replaceState(null, "", selector);
        }
      };

      document.addEventListener("click", handleScrollToClick);

      if (document.fonts?.ready) {
        void document.fonts.ready.then(() => {
          if (!disposed) {
            ScrollTrigger.refresh();
          }
        });
      }

      return () => {
        disposed = true;
        document.removeEventListener("click", handleScrollToClick);
        for (const cleanup of cleanups) {
          cleanup();
        }
        smoother?.kill();
      };
    },
  );

  const handlePageHide = () => {
    mm.revert();
  };

  window.addEventListener("pagehide", handlePageHide, { once: true });

  return () => {
    window.removeEventListener("pagehide", handlePageHide);
    mm.revert();
  };
}
