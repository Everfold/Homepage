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
  animationArchetype: string;
}

export const SCENES: readonly SceneMeta[] = [
  {
    key: "hero",
    id: "hero",
    index: "01",
    navLabel: "概览",
    eyebrow: "DECOUPLED AGENT RUNTIME",
    title: "让 Agent Loop 专注思考，把执行交给可扩展的工作空间",
    subtitle:
      "首页占位骨架：展示执行层与推理循环分离的 AI Agent 架构，支持独立演进每一屏叙事与动效。",
    animationArchetype: "Entrance Stagger + Subtle Scrub Parallax",
  },
  {
    key: "problem",
    id: "problem",
    index: "02",
    navLabel: "痛点对比",
    eyebrow: "WHY DECOUPLE",
    title: "当 Agent Loop 与执行耦合在一起",
    subtitle:
      "传统单进程 Agent 把决策循环和工具执行绑死在同一运行时中，扩展和隔离都举步维艰。",
    animationArchetype: "Pinned Beat-by-Beat Contrast",
  },
  {
    key: "architecture",
    id: "architecture",
    index: "03",
    navLabel: "核心架构",
    eyebrow: "CORE ARCHITECTURE",
    title: "执行与 Agent Loop 的物理级解耦",
    subtitle:
      "推理状态机保持轻量纯正，所有工具调用与环境副作用通过协议边界派发至独立运行时。",
    animationArchetype: "Pinned Scrub Separation Diagram",
  },
  {
    key: "workspaces",
    id: "workspaces",
    index: "04",
    navLabel: "工作空间",
    eyebrow: "EXTENSIBLE WORKSPACES",
    title: "同一套 Loop，挂载任意工作空间后端",
    subtitle:
      "工作空间被抽象为可插拔适配器，桌面端随滚动横向展开各后端能力（移动端自动降级为栅格）。",
    animationArchetype: "Pinned Horizontal Track (Progressive)",
  },
  {
    key: "devex",
    id: "devex",
    index: "05",
    navLabel: "开发体验",
    eyebrow: "DEVELOPER EXPERIENCE",
    title: "可观测的事件流与极简接入骨架",
    subtitle: "此处预留真实 CLI 录屏、结构化 Trace 日志与最小 SDK 配置展示位。",
    animationArchetype: "Staggered Batch Reveal",
  },
  {
    key: "roadmap",
    id: "roadmap",
    index: "06",
    navLabel: "路线图",
    eyebrow: "ROADMAP & DOCS",
    title: "正在开发中，架构与文档同步演进",
    subtitle:
      "阶段性能力拆解与早期访问占位区，所有静态文档与双语指南统一由 Starlight 驱动。",
    animationArchetype: "Staggered Card Entrance",
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
  badge: "Architecture Preview · Placeholder Skeleton",
  headline: "执行与 Agent Loop 分离，让工作空间随任务自由生长",
  subheadline:
    "将高延迟、易出错的工具执行从主推理循环中剥离，通过标准化协议按需路由至本地沙箱、容器或云端虚拟机。",
  primaryCta: {
    label: "阅读开发文档",
    href: "/docs/",
  },
  secondaryCta: {
    label: "查看架构拆解",
    href: "#architecture",
  },
  pillars: [
    "轻量纯正的 Agent Loop",
    "标准化 Execution Protocol",
    "热插拔 Workspace Adapter",
  ],
  stageSlot: {
    slotId: "hero-stage",
    label: "Hero Interactive Preview Slot",
    hint: "待接入：首屏产品核心概念交互动效 / 高清 Loop-to-Workspace 运行演示（建议比例 16:9）",
  },
} as const;

export const PROBLEM_CONTENT = {
  beats: [
    {
      index: "01",
      coupledTitle: "长耗时执行阻塞决策循环",
      coupledDesc:
        "编译、测试或爬虫等阻塞操作直接卡死主进程，导致心跳中断、上下文丢失与超时重试失控。",
      decoupledLabel: "异步协议派发 · Loop 永不阻塞",
    },
    {
      index: "02",
      coupledTitle: "环境污染与宿主机安全风险",
      coupledDesc:
        "依赖安装、文件写入和 Shell 执行共享同一环境，多任务并发时极易相互覆盖或破坏宿主状态。",
      decoupledLabel: "强隔离沙箱 · 每次执行可销毁重建",
    },
    {
      index: "03",
      coupledTitle: "工作空间难以横向扩展",
      coupledDesc:
        "无法为不同任务动态分配本地目录、Docker 容器或远端云主机，算力与存储被死死锁在单机。",
      decoupledLabel: "统一适配器 · 按任务拓扑弹性挂载",
    },
  ],
  visualSlot: {
    slotId: "problem-compare",
    label: "Coupled vs Decoupled State Slot",
    hint: "待接入：随左侧痛点切换的对比状态动效图 / 运行时资源占用对比可视化（建议比例 4:3）",
    states: [
      {
        tag: "BEAT 01",
        title: "Non-Blocking Loop Control",
        summary: "主循环只维护事件流与状态转移，长执行在外部运行。",
      },
      {
        tag: "BEAT 02",
        title: "Zero Host Side-Effects",
        summary: "文件系统、进程树与网络策略被收敛在独立工作空间。",
      },
      {
        tag: "BEAT 03",
        title: "Elastic Workspace Topology",
        summary: "一个 Loop 可同时驱动多个异构工作空间实例。",
      },
    ],
  },
} as const;

export const ARCHITECTURE_CONTENT = {
  diagramSlot: {
    slotId: "arch-diagram",
    label: "Decoupling Schematic (Live Vector Skeleton)",
    hint: "当前为可编程 SVG 矢量占位骨架：向下滚动时 Agent Loop 与 Execution Layer 沿协议边界解耦分离。",
  },
  nodes: {
    loop: {
      title: "Agent Loop",
      subtitle: "Plan · Reason · State",
      badge: "CONTROL PLANE",
    },
    bridge: {
      title: "Execution Protocol",
      subtitle: "Dispatch · Event Stream · Snapshot",
    },
    runtime: {
      title: "Workspace Runtime",
      subtitle: "FS · Shell · Tools · Sandbox",
      badge: "EXECUTION PLANE",
    },
  },
  steps: [
    {
      step: "01 / CONTROL",
      title: "Agent Loop 控制面",
      description:
        "聚焦提示词编排、模型调用、上下文压缩与决策状态机，不直接执行任何本地副作用。",
    },
    {
      step: "02 / PROTOCOL",
      title: "标准化执行协议边界",
      description:
        "将工具请求、流式 stdout/stderr、文件变更快照与权限审批抽象为可回放的消息通道。",
    },
    {
      step: "03 / RUNTIME",
      title: "独立工作空间执行面",
      description:
        "无状态或快照化的执行单元，随时挂起、迁移、克隆或多副本并发，支持本地与远端后端。",
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
      tag: "ADAPTER 01 · LOCAL",
      title: "Local Sandbox Workspace",
      summary:
        "面向个人开发与快速原型，基于隔离目录或轻量命名空间实现零配置本地执行与瞬时回滚。",
      slotId: "ws-local-sandbox",
      placeholderHint: "预留：本地目录隔离与快照 Diff 视图占位（16:10）",
    },
    {
      id: "container-runtime",
      tag: "ADAPTER 02 · CONTAINER",
      title: "Container Runtime Pool",
      summary:
        "为每个任务动态拉起干净的 OCI 容器镜像，依赖、语言版本与权限策略完全声明式隔离。",
      slotId: "ws-container-pool",
      placeholderHint: "预留：容器生命周期与镜像预热池示意图占位（16:10）",
    },
    {
      id: "cloud-vm",
      tag: "ADAPTER 03 · CLOUD VM",
      title: "Cloud MicroVM Cluster",
      summary:
        "重度编译、长时评测或并发多 Agent 协作时，自动调度云端 MicroVM 并保持同一 Loop 会话。",
      slotId: "ws-cloud-vm",
      placeholderHint: "预留：云端弹性调度与远程流式日志界面占位（16:10）",
    },
    {
      id: "custom-adapter",
      tag: "ADAPTER 04 · SDK",
      title: "Custom Workspace Adapter",
      summary:
        "实现最小 Workspace 接口即可接入自有集群、Kubernetes Pod、远程 SSH 主机或硬件实验室。",
      slotId: "ws-custom-adapter",
      placeholderHint:
        "预留：自定义 Adapter 接口拓扑与权限钩子示意图占位（16:10）",
    },
  ] satisfies readonly WorkspaceCard[],
} as const;

export const DEVEX_CONTENT = {
  traceSlot: {
    slotId: "devex-trace",
    label: "Mock Event Stream (Placeholder)",
    hint: "待接入：真实运行 Trace 回放器或交互式终端录屏。",
  },
  traceLines: [
    {
      seq: "01",
      channel: "loop.plan",
      payload: 'intent="run integration suite" -> target_workspace="ws-oci-04"',
    },
    {
      seq: "02",
      channel: "bridge.dispatch",
      payload: 'op="exec" cmd="pnpm test" timeout_ms=30000 isolated=true',
    },
    {
      seq: "03",
      channel: "workspace.event",
      payload: 'stream="stdout" status="running" snapshot_rev="r19"',
    },
    {
      seq: "04",
      channel: "loop.observe",
      payload: 'exit_code=0 artifacts=2 next_action="commit_patch"',
    },
  ],
  sdkSlot: {
    slotId: "devex-sdk",
    label: "Workspace Extension Skeleton (Pseudocode)",
    hint: "待接入：正式公开 API 后替换为可复制的 SDK 示例与快速开始。",
  },
  sdkSnippet: `// Placeholder conceptual interface (subject to change)
export const agent = createAgentLoop({
  model: "reasoning-model",
  workspace: createWorkspaceAdapter({
    driver: "container | cloud-vm | local",
    isolation: "ephemeral-snapshot",
  }),
});`,
  highlights: [
    {
      title: "可回放执行轨迹",
      detail: "每次 Loop 决策与 Workspace 变更均带因果序列号，便于调试与审计。",
    },
    {
      title: "独立升级与扩缩容",
      detail: "推理服务与执行节点独立部署，避免为重型沙箱重复扩展模型控制面。",
    },
    {
      title: "Starlight 完整文档体系",
      detail: "架构规范、协议定义与适配器指南统一沉淀在 /docs/ 静态文档站。",
    },
  ],
} as const;

export const ROADMAP_CONTENT = {
  milestones: [
    {
      phase: "PHASE 01",
      status: "IN PROGRESS",
      title: "Core Agent Loop 与执行协议",
      summary: "完成推理循环状态机与标准化工具调用/事件回传协议的解耦验证。",
    },
    {
      phase: "PHASE 02",
      status: "PLANNED",
      title: "可扩展工作空间适配器矩阵",
      summary:
        "打通 Local Sandbox、容器运行时与远端云端工作空间的一致挂载接口。",
    },
    {
      phase: "PHASE 03",
      status: "UPCOMING",
      title: "官网实景演示与双语开发者文档",
      summary:
        "替换首页占位槽位为真实终端交互演示，并在 Starlight 文档站开放接入指南。",
    },
  ],
  cta: {
    title: "先从架构文档开始了解设计细节",
    description:
      "产品仍在密集开发中，你可以先浏览 Starlight 文档站框架，或持续替换各屏占位故事模块。",
    primaryLabel: "进入中文文档",
    primaryHref: "/docs/",
    secondaryLabel: "English Docs",
    secondaryHref: "/en/docs/",
    waitlistPlaceholder: "Early Access / GitHub Repo（开发阶段占位按钮）",
  },
} as const;
