import React from "react";
import { Info, Layers, Utensils, MapPin } from "lucide-react";

interface MapLegendProps {
  className?: string;
}

export const MapLegend: React.FC<MapLegendProps> = ({ className = "" }) => {
  const priorityItems = [
    { label: "核心必去景点", bg: "bg-[#2F9E44]", desc: "必去核心体验", icon: "📌" },
    { label: "选配与休闲景点", bg: "bg-[#D9A441]", desc: "海滩/海湾/夜市", icon: "🏖️" },
    { label: "交通 / 机场 / 码头", bg: "bg-[#5B8DB8]", desc: "接机送机/坐船出海", icon: "✈️" },
    { label: "出海方向 / 远郊", bg: "bg-[#8E63B5]", desc: "远岛/包船一日游", icon: "🏝️" },
    { label: "避坑与谨慎提示", bg: "bg-[#D9534F]", desc: "拉客骗局注意事项", icon: "⚠️" },
  ];

  const foodItems = [
    { label: "海鲜与景观大餐", bg: "bg-gradient-to-br from-cyan-500 to-blue-600", desc: "日落晚餐 / 海边度假", icon: "🦞" },
    { label: "经典泰式正餐", bg: "bg-gradient-to-br from-amber-500 to-yellow-600", desc: "Bib Gourmand / 老宅", icon: "🍛" },
    { label: "特色面食与小吃", bg: "bg-gradient-to-br from-orange-500 to-red-600", desc: "船面 / 鸡饭 / 夜市", icon: "🍜" },
    { label: "甜品与咖啡茶饮", bg: "bg-gradient-to-br from-pink-500 to-rose-600", desc: "泰奶 / 芒果糯米饭 / 轻食", icon: "🧋" },
  ];

  return (
    <div
      className={`bg-card/95 backdrop-blur-md p-4 rounded-2xl border border-line shadow-sm text-xs w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-line/40 pb-2.5 mb-3">
        <div className="flex items-center gap-1.5 font-bold text-text">
          <Layers className="w-4 h-4 text-teal" />
          <span>地图图标与色彩分类指南 (Map Legend & Icons)</span>
        </div>
        <div className="text-[11px] text-muted flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-teal flex-shrink-0" />
          <span>支持触控板与滑轮双指流畅缩放，点击锚点展开完整档案攻略</span>
        </div>
      </div>

      <div className="space-y-3">
        {/* 景点优先级分类 */}
        <div>
          <div className="text-[11px] font-extrabold text-muted mb-1.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-teal" />
            <span>行程优先级与景点标识</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-2.5">
            {priorityItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 bg-sand/40 px-2.5 py-2 rounded-xl border border-line/50 hover:bg-sand/70 transition-all duration-200 hover:scale-[1.02]"
              >
                <span
                  className={`w-6 h-6 rounded-full ${item.bg} text-white text-[12px] flex items-center justify-center shadow-sm flex-shrink-0 border border-white`}
                >
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-text font-semibold text-xs truncate">{item.label}</div>
                  <div className="text-[10px] text-muted truncate mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 美食与餐厅分类 */}
        <div className="pt-1 border-t border-line/30">
          <div className="text-[11px] font-extrabold text-orange mb-1.5 flex items-center gap-1">
            <Utensils className="w-3 h-3 text-orange" />
            <span>美食打卡与餐厅专项图标 (餐饮定制标签)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {foodItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 bg-orange-500/5 dark:bg-orange-500/10 px-2.5 py-2 rounded-xl border border-orange-500/20 hover:bg-orange-500/15 transition-all duration-200 hover:scale-[1.02]"
              >
                <span className={`w-6 h-6 rounded-full ${item.bg} text-white text-xs flex items-center justify-center shadow-md flex-shrink-0 border border-white`}>
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-text font-bold text-xs truncate">{item.label}</div>
                  <div className="text-[10px] text-muted truncate mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
