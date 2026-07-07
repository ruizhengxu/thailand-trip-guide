import React from "react";
import { Anchor, CloudRain, ShieldCheck, Sun, Truck } from "lucide-react";

interface StrategyCardsProps {
  onNavigatePrep: () => void;
}

export const StrategyCards: React.FC<StrategyCardsProps> = ({
  onNavigatePrep,
}) => {
  const strategies = [
    {
      title: "8 月天气策略",
      subtitle: "雨季聪明玩法 · 上午与下午节律",
      icon: <CloudRain className="w-6 h-6 text-sky-500" />,
      badge: "天气规律",
      content:
        "8月典型雨季：上午常放晴，建议安排户外与拍照；下午雷阵雨多，保留 SPA、商场、咖啡馆室内的灵活选项；傍晚雨停后安排夜景或大餐。",
      gradient: "from-sky-500/15 to-blue-500/5",
      borderColor: "border-sky-500/30",
    },
    {
      title: "交通避坑策略",
      subtitle: "多城无缝切换 · 精密交通打法",
      icon: <Truck className="w-6 h-6 text-amber-500" />,
      badge: "省心出行",
      content:
        "曼谷：河边景点用慢船与公车船，市中心商圈用 BTS / MRT，夜间打车用 Grab / Bolt；普吉：打车 Bolt 优先，多点路线直接包车；瑶亚岛：以酒店专车与岛内包车为主。",
      gradient: "from-amber-500/15 to-orange-500/5",
      borderColor: "border-amber-500/30",
    },
    {
      title: "出海与安全策略",
      subtitle: "零风险体验 · 可退换为王",
      icon: <Anchor className="w-6 h-6 text-emerald-500" />,
      badge: "安全第一",
      content:
        "所有出海项目必须选择可免费取消项目，绝不把海上行程安排在离岛或国际飞行前一天；海况差或见红旗立即启动 Plan B，转为酒店度假、SPA或老街休闲。",
      gradient: "from-emerald-500/15 to-teal-500/5",
      borderColor: "border-emerald-500/30",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text tracking-tight flex items-center gap-2 font-sans">
            <ShieldCheck className="w-5 h-5 text-teal" />
            <span>核心备考策略 · Travel Strategies</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            为情侣定制的避暑、避坑与舒适度提升准则
          </p>
        </div>
        <button
          onClick={onNavigatePrep}
          className="text-xs font-semibold text-teal hover:text-teal-light flex items-center gap-1 transition-colors"
        >
          <span>查看完整准备指南</span>
          <span>→</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {strategies.map((item) => (
          <div
            key={item.title}
            className={`glass-card p-6 rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.gradient} flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-white dark:bg-card shadow-sm border border-line/50 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/80 dark:bg-card/80 text-text shadow-xs border border-line/40">
                {item.badge}
              </span>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-base sm:text-lg text-text mb-1 flex items-center gap-1.5">
                <span>{item.title}</span>
              </h3>
              <p className="text-xs text-muted font-medium mb-3">
                {item.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-text/90 leading-relaxed">
                {item.content}
              </p>
            </div>

            <div className="pt-3 border-t border-line/40 flex items-center justify-between text-[11px] text-muted">
              <span className="flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>适用于 10–23 Aug 全程</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
