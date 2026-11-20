import type { ScrollSmoother } from "gsap/ScrollSmoother";
import type { SceneKey } from "../../data/home/scenes";

export interface SceneRuntimeContext {
  isDesktop: boolean;
  isReducedMotion: boolean;
  smoother: ScrollSmoother | null;
}

export type SceneCleanup = () => void;

export type SceneAnimator = (
  root: HTMLElement,
  ctx: SceneRuntimeContext,
) => void | SceneCleanup;

export type SceneAnimatorRegistry = Partial<Record<SceneKey, SceneAnimator>>;
