export interface NavItem {
  label: string;
  target: string;
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export const SITE_CONFIG = {
  /** Single-point product name override for the entire homepage */
  brand: "Beamlet",
  title: "Beamlet — 执行与 Agent Loop 分离的新一代 AI Agent 架构",
  description:
    "将执行层与 Agent Loop 彻底解耦，让推理决策轻量稳定，让工作空间按需弹性扩展。",
  docsHref: "/docs/",
  enDocsHref: "/en/docs/",
  statusBadge: "In Development · Placeholder Skeleton",
  headerNav: [
    { label: "痛点", target: "#problem" },
    { label: "架构解耦", target: "#architecture" },
    { label: "工作空间", target: "#workspaces" },
    { label: "开发体验", target: "#devex" },
    { label: "路线图", target: "#roadmap" },
  ] satisfies readonly NavItem[],
  footerLinks: [
    { label: "中文文档", href: "/docs/" },
    { label: "English Docs", href: "/en/docs/" },
    { label: "架构概览", href: "#architecture" },
    { label: "工作空间扩展", href: "#workspaces" },
  ] satisfies readonly FooterLink[],
  footerNote:
    "当前页面为可独立演进的首页占位骨架（Hero → Problem → Architecture → Workspaces → DevEx → Roadmap），产品正式素材与截图将在研发推进后替换接入。",
} as const;
