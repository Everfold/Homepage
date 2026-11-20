export type SceneKey =
  "hero" | "problem" | "architecture" | "workspaces" | "devex" | "roadmap";

export interface SceneMeta {
  key: SceneKey;
  id: string;
  index: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export const SCENES: readonly SceneMeta[] = [
  {
    key: "hero",
    id: "hero",
    index: "01",
    navLabel: "概览",
    eyebrow: "BEAMLET",
    title: "执行与思考分离",
    subtitle: "Agent Loop 保持轻量，工作空间按需扩展。",
  },
  {
    key: "problem",
    id: "problem",
    index: "02",
    navLabel: "痛点",
    eyebrow: "WHY DECOUPLE",
    title: "摆脱单进程耦合",
    subtitle: "执行不再阻塞决策，状态不再互相污染。",
  },
  {
    key: "architecture",
    id: "architecture",
    index: "03",
    navLabel: "架构",
    eyebrow: "ARCHITECTURE",
    title: "控制面与执行面物理分离",
    subtitle: "Loop 专注推理，Workspace 经由协议挂接。",
  },
  {
    key: "workspaces",
    id: "workspaces",
    index: "04",
    navLabel: "工作空间",
    eyebrow: "WORKSPACES",
    title: "统一接口，任意扩展",
    subtitle: "同一套 Loop，无缝切换各类隔离后端。",
  },
  {
    key: "devex",
    id: "devex",
    index: "05",
    navLabel: "体验",
    eyebrow: "DEVELOPER DX",
    title: "清晰可观测的执行流",
    subtitle: "结构化事件流与扩展骨架占位。",
  },
  {
    key: "roadmap",
    id: "roadmap",
    index: "06",
    navLabel: "进展",
    eyebrow: "ROADMAP",
    title: "开发进行中",
    subtitle: "核心协议与 Starlight 文档同步演进。",
  },
] as const;

export function getSceneMeta(key: SceneKey): SceneMeta {
  const found = SCENES.find((scene) => scene.key === key);
  if (!found) {
    throw new Error(`Unknown scene key: ${key}`);
  }
  return found;
}

export const HERO_CONTENT = {
  eyebrow: "BEAMLET · AI AGENT RUNTIME",
  headline: "执行与思考分离",
  subheadline: "Agent Loop 保持轻量，工作空间按需扩展。",
  primaryCta: {
    label: "阅读文档",
    href: "/docs/",
  },
  secondaryCta: {
    label: "探索架构",
    href: "#architecture",
  },
} as const;

export const PROBLEM_CONTENT = {
  beats: [
    {
      index: "01",
      coupledTitle: "长任务阻塞主循环",
      coupledDesc: "编译与测试卡死推理心跳，超时重试失控。",
      decoupledLabel: "异步派发",
    },
    {
      index: "02",
      coupledTitle: "宿主环境互相污染",
      coupledDesc: "文件与依赖共享运行时，并发极易冲突。",
      decoupledLabel: "隔离沙箱",
    },
    {
      index: "03",
      coupledTitle: "工作空间难跨机扩展",
      coupledDesc: "算力被锁死在单机，无法动态分配资源。",
      decoupledLabel: "弹性挂载",
    },
  ],
  visualSlot: {
    slotId: "problem-compare",
    label: "Preview Slot",
    hint: "预留：耦合 vs 解耦动态对比视图",
    states: [
      {
        tag: "STATE 01",
        title: "Non-Blocking Loop",
        summary: "主循环仅维护事件与状态转移。",
      },
      {
        tag: "STATE 02",
        title: "Zero Host Side-Effects",
        summary: "文件系统与进程完全收敛在沙箱内。",
      },
      {
        tag: "STATE 03",
        title: "Elastic Topology",
        summary: "一个 Loop 并发调度多个异构空间。",
      },
    ],
  },
} as const;

export const ARCHITECTURE_CONTENT = {
  diagramSlot: {
    slotId: "arch-diagram",
    label: "Vector Schematic",
    hint: "向下滚动观察控制面与执行面沿协议解耦",
  },
  nodes: {
    loop: {
      badge: "CONTROL",
      title: "Agent Loop",
      subtitle: "Plan · Memory · State",
    },
    bridge: {
      title: "Protocol",
      subtitle: "Dispatch ⇄ Stream",
    },
    runtime: {
      badge: "EXECUTION",
      title: "Workspace",
      subtitle: "FS · Shell · Sandbox",
    },
  },
  steps: [
    {
      step: "01 · CONTROL",
      title: "Agent Loop 控制面",
      description: "纯状态机与推理决策，不直接运行副作用。",
    },
    {
      step: "02 · PROTOCOL",
      title: "执行协议边界",
      description: "工具调用、日志流与快照统一通道化。",
    },
    {
      step: "03 · RUNTIME",
      title: "工作空间执行面",
      description: "可挂起、重建、并发扩展的隔离单元。",
    },
  ],
} as const;

export interface WorkspaceCard {
  id: string;
  tag: string;
  title: string;
  summary: string;
  slotId: string;
  placeholderHint: string;
}

export const WORKSPACES_CONTENT = {
  cards: [
    {
      id: "local-sandbox",
      tag: "LOCAL",
      title: "Local Sandbox",
      summary: "隔离目录与瞬时回滚，适合本地快速验证。",
      slotId: "ws-local",
      placeholderHint: "占位 · 16:10",
    },
    {
      id: "container-runtime",
      tag: "CONTAINER",
      title: "Container Pool",
      summary: "按任务拉起干净 OCI 容器，依赖零污染。",
      slotId: "ws-container",
      placeholderHint: "占位 · 16:10",
    },
    {
      id: "cloud-vm",
      tag: "CLOUD VM",
      title: "Cloud MicroVM",
      summary: "重度编译与并发执行，弹性调度云端算力。",
      slotId: "ws-cloud",
      placeholderHint: "占位 · 16:10",
    },
    {
      id: "custom-adapter",
      tag: "SDK",
      title: "Custom Adapter",
      summary: "实现最小接口，接入 K8s 或自有主机集群。",
      slotId: "ws-sdk",
      placeholderHint: "占位 · 16:10",
    },
  ] satisfies readonly WorkspaceCard[],
} as const;

export const DEVEX_CONTENT = {
  traceSlot: {
    slotId: "devex-trace",
    label: "Event Stream",
    hint: "待接入：真实 Trace 回放",
  },
  traceLines: [
    {
      seq: "01",
      channel: "loop.plan",
      payload: 'target="ws-oci-04" action="run_tests"',
    },
    {
      seq: "02",
      channel: "bridge.dispatch",
      payload: 'cmd="pnpm test" isolated=true',
    },
    {
      seq: "03",
      channel: "workspace.exec",
      payload: 'stream="stdout" snapshot="r19"',
    },
    {
      seq: "04",
      channel: "loop.observe",
      payload: 'exit_code=0 next="commit_patch"',
    },
  ],
  sdkSlot: {
    slotId: "devex-sdk",
    label: "Extension Skeleton",
    hint: "待接入：正式 SDK",
  },
  sdkSnippet: `export const agent = createAgentLoop({
  model: "reasoning-model",
  workspace: createWorkspaceAdapter({
    driver: "container | cloud-vm | local",
    isolation: "ephemeral-snapshot",
  }),
});`,
  highlights: [
    {
      title: "可回放轨迹",
      detail: "每步决策与执行均带因果序号。",
    },
    {
      title: "独立扩缩容",
      detail: "推理面与执行节点解耦部署。",
    },
    {
      title: "Starlight 文档",
      detail: "规范与指南沉淀在 /docs/。",
    },
  ],
} as const;

export const ROADMAP_CONTENT = {
  milestones: [
    {
      phase: "PHASE 01",
      status: "ACTIVE",
      title: "Loop 与协议解耦",
      summary: "验证状态机与异步事件通道。",
    },
    {
      phase: "PHASE 02",
      status: "NEXT",
      title: "工作空间适配器矩阵",
      summary: "统一 Local、容器与云端接口。",
    },
    {
      phase: "PHASE 03",
      status: "UPCOMING",
      title: "实景演示与文档",
      summary: "替换占位演示，开放接入指南。",
    },
  ],
  cta: {
    title: "先看架构设计",
    description: "产品仍在开发中，欢迎阅读文档。",
    primaryLabel: "进入文档",
    primaryHref: "/docs/",
    secondaryLabel: "English",
    secondaryHref: "/en/docs/",
    waitlistPlaceholder: "Coming Soon",
  },
} as const;
