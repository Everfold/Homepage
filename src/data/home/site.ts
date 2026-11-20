export interface NavItem {
  label: string;
  target: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export const SITE_CONFIG = {
  /** Single-point product name override for the entire homepage */
  brand: "Beamlet",
  title: "Beamlet — 执行与思考分离的 AI Agent 架构",
  description: "Agent Loop 保持轻量，工作空间按需扩展。",
  docsHref: "/docs/",
  enDocsHref: "/en/docs/",
  headerNav: [
    { label: "痛点", target: "#problem" },
    { label: "架构", target: "#architecture" },
    { label: "工作空间", target: "#workspaces" },
    { label: "体验", target: "#devex" },
    { label: "进展", target: "#roadmap" },
  ] satisfies readonly NavItem[],
  footerLinks: [
    { label: "中文文档", href: "/docs/" },
    { label: "English", href: "/en/docs/" },
    { label: "回到顶部", href: "#hero" },
  ] satisfies readonly FooterLink[],
} as const;
