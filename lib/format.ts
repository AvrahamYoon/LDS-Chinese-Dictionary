import type { BranchLanguage, BranchStatus, BranchType } from "./types";

export function formatBranchType(type: BranchType) {
  return type === "ward" ? "Ward / 支會" : "Branch / 分會";
}

export function formatLanguage(language: BranchLanguage) {
  const labels: Record<BranchLanguage, string> = {
    chinese: "中文",
    mandarin: "國語 / 普通話",
    cantonese: "粵語",
    asian: "亞洲 YSA",
    mixed: "混合"
  };

  return labels[language];
}

export function formatStatus(status: BranchStatus) {
  const labels: Record<BranchStatus, string> = {
    active: "活躍",
    discontinued: "已停用",
    unknown: "待確認"
  };

  return labels[status];
}
