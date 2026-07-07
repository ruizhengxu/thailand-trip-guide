import type { Priority, FoodPriority } from "../types";

export interface PriorityInfo {
  labelZh: string;
  color: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  dotClass: string;
}

export const priorityLegend: Record<string, PriorityInfo> = {
  core: {
    labelZh: "核心优先",
    color: "#2F9E44",
    bgClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
    textClass: "text-emerald-700 dark:text-emerald-400 font-medium",
    borderClass: "border-emerald-500/30",
    dotClass: "bg-emerald-500",
  },
  optional: {
    labelZh: "选配",
    color: "#D9A441",
    bgClass: "bg-amber-500/10 dark:bg-amber-500/20",
    textClass: "text-amber-700 dark:text-amber-400 font-medium",
    borderClass: "border-amber-500/30",
    dotClass: "bg-amber-500",
  },
  transport: {
    labelZh: "交通 / 码头 / 机场",
    color: "#5B8DB8",
    bgClass: "bg-sky-500/10 dark:bg-sky-500/20",
    textClass: "text-sky-700 dark:text-sky-400 font-medium",
    borderClass: "border-sky-500/30",
    dotClass: "bg-sky-500",
  },
  remote: {
    labelZh: "远程 / 一日游 / 出海方向",
    color: "#8E63B5",
    bgClass: "bg-purple-500/10 dark:bg-purple-500/20",
    textClass: "text-purple-700 dark:text-purple-400 font-medium",
    borderClass: "border-purple-500/30",
    dotClass: "bg-purple-500",
  },
  caution: {
    labelZh: "谨慎 / 可跳过",
    color: "#D9534F",
    bgClass: "bg-rose-500/10 dark:bg-rose-500/20",
    textClass: "text-rose-700 dark:text-rose-400 font-medium",
    borderClass: "border-rose-500/30",
    dotClass: "bg-rose-500",
  },
  "must-try": {
    labelZh: "必吃 Must-Try",
    color: "#F43F5E",
    bgClass: "bg-rose-500/15 dark:bg-rose-500/25",
    textClass: "text-rose-600 dark:text-rose-400 font-bold",
    borderClass: "border-rose-500/30",
    dotClass: "bg-rose-500",
  },
  recommended: {
    labelZh: "重点推荐",
    color: "#F59E0B",
    bgClass: "bg-amber-500/15 dark:bg-amber-500/25",
    textClass: "text-amber-600 dark:text-amber-400 font-bold",
    borderClass: "border-amber-500/30",
    dotClass: "bg-amber-500",
  },
  situational: {
    labelZh: "场景备选",
    color: "#0D9488",
    bgClass: "bg-teal/15 dark:bg-teal/25",
    textClass: "text-teal font-medium",
    borderClass: "border-teal/30",
    dotClass: "bg-teal",
  },
};

export function getPriorityInfo(priority: Priority | FoodPriority | string): PriorityInfo {
  return priorityLegend[priority] || priorityLegend.optional;
}

export const regionNames: Record<string, string> = {
  bangkok: "曼谷 Bangkok",
  phuket: "普吉岛 Phuket",
  "koh-yao-yai": "瑶亚岛 Santhiya",
};

export const shortRegionNames: Record<string, string> = {
  bangkok: "曼谷",
  phuket: "普吉",
  "koh-yao-yai": "瑶亚岛",
};
