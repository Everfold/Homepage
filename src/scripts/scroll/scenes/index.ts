import type { SceneAnimatorRegistry } from "../types";
import { animateArchitectureScene } from "./architecture";
import { animateDevExperienceScene } from "./devex";
import { animateHeroScene } from "./hero";
import { animateProblemScene } from "./problem";
import { animateRoadmapScene } from "./roadmap";
import { animateWorkspacesScene } from "./workspaces";

export const sceneAnimators: SceneAnimatorRegistry = {
  hero: animateHeroScene,
  problem: animateProblemScene,
  architecture: animateArchitectureScene,
  workspaces: animateWorkspacesScene,
  devex: animateDevExperienceScene,
  roadmap: animateRoadmapScene,
};
