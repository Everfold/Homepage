import { initHomeScrollEngine } from "./engine";
import { sceneAnimators } from "./scenes";

function start(): void {
  initHomeScrollEngine(sceneAnimators);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start, { once: true });
} else {
  start();
}
