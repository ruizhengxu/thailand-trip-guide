import React, { useState } from "react";
import { notes } from "../../data/notes";
import { WeatherNoteCard } from "./WeatherNoteCard";
import {
  CheckSquare,
  Luggage,
  Square,
  Truck,
  Umbrella,
} from "lucide-react";

export const PrepGuideView: React.FC = () => {
  const packingItems = [
    { id: "p-1", label: "护照、复印件及二寸近期证件照（防备用）", category: "证件与财务" },
    { id: "p-2", label: "境外医疗与旅游意外险保单（电子与纸质）", category: "证件与财务" },
    { id: "p-3", label: "酒店预订确认单（Santhiya 等需出示船班对接）", category: "证件与财务" },
    { id: "p-4", label: "Visa / Master 信用卡及少量泰铢现金（付小费/夜市）", category: "证件与财务" },
    { id: "p-5", label: "大皇宫 / 郑王庙等寺庙长裤或过膝长裙（严禁短裤露肩）", category: "着装与防晒" },
    { id: "p-6", label: "高倍防水防晒霜、晒后修复芦荟胶、太阳镜、遮阳帽", category: "着装与防晒" },
    { id: "p-7", label: "七夕浪漫晚餐稍正式情侣礼服与平底便携凉鞋", category: "着装与防晒" },
    { id: "p-8", label: "出海专用防水袋、手机防水套、快干沙滩毛巾", category: "装备与药品" },
    { id: "p-9", label: "便携折叠雨伞或轻便防水风衣（应对 8 月下午阵雨）", category: "装备与药品" },
    { id: "p-10", label: "晕船药（普吉/瑶亚岛快艇必备）、泰康药油、防蚊液", category: "装备与药品" },
    { id: "p-11", label: "英标 / 欧标转换插头、充电宝及高速境外流量卡/eSIM", category: "装备与药品" },
  ];

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    "p-1": true,
    "p-3": true,
    "p-5": true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = Array.from(new Set(packingItems.map((i) => i.category)));

  return (
    <div className="space-y-8 animate-view-appear">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight flex items-center gap-2 font-sans">
          <Luggage className="w-6 h-6 text-teal" />
          <span>行前准备与应急预案指南 · Preparation & Plan B</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted mt-1">
          专为 8 月雨季与多岛屿接驳定制：从天气节律、交通打法到交互式行李清单
        </p>
      </div>

      {/* Weather Strategy */}
      <WeatherNoteCard notes={notes.weather} />

      {/* Transport & Dock Transfer Strategy */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card to-orange-500/5 shadow-premium space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-line/60">
          <div className="p-3.5 rounded-2xl bg-amber-500/15 text-amber-500 border border-amber-500/30">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-text tracking-tight font-sans">
              多城接驳与交通防坑打法
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-0.5">
              曼谷立体交通网、普吉岛网约车规则与 Santhiya 岛屿接驳时效
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-card border border-line/80 space-y-2">
            <h4 className="font-bold text-base text-text flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <span>曼谷：立体的避堵组合</span>
            </h4>
            <p className="text-xs sm:text-sm text-text/85 leading-relaxed">
              沿河景点（大皇宫/郑王庙/ICONSIAM）务必乘坐公车船或游船；市中心商圈依靠 BTS 与 MRT；夜间与远郊使用 Grab 或 Bolt 打车，拒绝路边不打表嘟嘟车。
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-line/80 space-y-2">
            <h4 className="font-bold text-base text-text flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
              <span>普吉岛：网约车与专车包车</span>
            </h4>
            <p className="text-xs sm:text-sm text-text/85 leading-relaxed">
              普吉岛出租车昂贵，建议首选 Bolt（价格最优）或 Grab（响应最快）；如当天安排老城+神仙半岛日落多点打卡，直接选择 8–10 小时包车最省心。
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-line/80 space-y-2">
            <h4 className="font-bold text-base text-text flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
              <span>瑶亚岛：快艇与专属专车</span>
            </h4>
            <p className="text-xs sm:text-sm text-text/85 leading-relaxed">
              前往 Santhiya 需从普吉 Ao Po Grand Marina 码头搭乘酒店专属快艇。请务必提前 1 天联系酒店确认班次并安排从普吉酒店到码头的接送车。
            </p>
          </div>
        </div>
      </div>

      {/* Plan B Contingency Cards */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-card to-purple-500/5 shadow-premium space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-line/60">
          <div className="p-3.5 rounded-2xl bg-rose-500/15 text-rose-500 border border-rose-500/30">
            <Umbrella className="w-6 h-6 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-text tracking-tight font-sans">
              分区域雨天备用方案 · Plan B
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-0.5">
              突发暴雨或海况恶劣时的无缝替代方案，确保浪漫心情不受阻
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-card border border-line/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-base text-text">曼谷雨天方案</span>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 font-semibold">室内商圈 / 艺术</span>
            </div>
            <p className="text-xs sm:text-sm text-muted">
              如遇下午暴雨，立即通过 BTS 连廊转入：
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-text/90">
              <li className="flex items-start gap-2">
                <span className="text-teal font-bold">•</span>
                <span><strong>ICONSIAM 暹罗天地：</strong> 室内 SookSiam 水上市场，吃喝逛一站搞定。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal font-bold">•</span>
                <span><strong>CentralWorld / Siam Paragon：</strong> 东南亚顶尖购物体验与海底世界。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal font-bold">•</span>
                <span><strong>高端泰式 SPA 疗愈：</strong> 提前预订 Let's Relax 或 Oasis SPA。</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-line/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-base text-text">普吉 & 瑶亚岛雨天方案</span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-500 font-semibold">海岛备选</span>
            </div>
            <p className="text-xs sm:text-sm text-muted">
              出海受阻或海滩遇雨时的舒适选择：
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-text/90">
              <li className="flex items-start gap-2">
                <span className="text-teal font-bold">•</span>
                <span><strong>普吉镇老街探索：</strong> 巴巴娘惹骑楼、网红咖啡馆与手工艺小店避雨探店。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal font-bold">•</span>
                <span><strong>Central Phuket 购物商城：</strong> 普吉最大商场，适合下午茶与室内大餐。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal font-bold">•</span>
                <span><strong>Santhiya 度假村沉浸体验：</strong> 泰式按摩、泰餐烹饪课程或露台木雕大片拍图。</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Packing Checklist */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-teal/30 shadow-premium space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line/60">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-text tracking-tight font-sans flex items-center gap-2">
              <span>交互式情侣行李打包清单</span>
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-0.5">
              点击勾选已准备物品，完成 100% 行前闭环 ({Object.values(checkedItems).filter(Boolean).length} / {packingItems.length} 已准备)
            </p>
          </div>
          <button
            onClick={() => {
              const allChecked = Object.keys(checkedItems).length === packingItems.length &&
                Object.values(checkedItems).every(Boolean);
              if (allChecked) {
                setCheckedItems({});
              } else {
                const next: Record<string, boolean> = {};
                packingItems.forEach((i) => (next[i.id] = true));
                setCheckedItems(next);
              }
            }}
            className="btn-secondary text-xs py-2 px-3.5 self-start sm:self-auto"
          >
            {Object.keys(checkedItems).length === packingItems.length &&
            Object.values(checkedItems).every(Boolean)
              ? "全部取消"
              : "一键全选"}
          </button>
        </div>

        <div className="space-y-6">
          {categories.map((cat) => {
            const items = packingItems.filter((i) => i.category === cat);
            return (
              <div key={cat} className="space-y-2.5">
                <h4 className="text-xs font-bold text-teal uppercase tracking-wider px-1">
                  {cat}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {items.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? "bg-teal/10 border-teal/40 text-text font-medium shadow-xs"
                            : "bg-card hover:bg-sand/30 border-line/80 text-muted hover:text-text"
                        }`}
                      >
                        <button
                          type="button"
                          className={`mt-0.5 flex-shrink-0 transition-colors ${
                            isChecked ? "text-teal" : "text-muted/60"
                          }`}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4.5 h-4.5 fill-teal/10" />
                          ) : (
                            <Square className="w-4.5 h-4.5" />
                          )}
                        </button>
                        <span
                          className={`text-xs sm:text-sm leading-relaxed ${
                            isChecked ? "line-through opacity-80" : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
