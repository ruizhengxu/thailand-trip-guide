import React, { useState, useEffect } from "react";
import { notes } from "../../data/notes";
import { WeatherNoteCard } from "./WeatherNoteCard";
import { subscribeToPackingList, savePackingListToCloud } from "../../utils/firebase";
import {
  CheckSquare,
  Luggage,
  Square,
  Truck,
  Umbrella,
} from "lucide-react";

export const PrepGuideView: React.FC = () => {
  const packingItems = [
    // 1. 🪪 证件与财务
    { id: "p-1", label: "护照原件及复印件（建议手机相册留存首页电子备份）", category: "🪪 证件与财务" },
    { id: "p-2", label: "境外医疗与旅游意外险保单（电子版英文确认单，建议存线下 PDF）", category: "🪪 证件与财务" },
    { id: "p-3", label: "酒店预订确认单（尤其是 Santhiya 岛屿接驳需要向码头出示凭证）", category: "🪪 证件与财务" },
    { id: "p-4", label: "国际信用卡 (Visa/Master，建议带不同银行两张) 及少量泰铢现金 (付夜市/小费)", category: "🪪 证件与财务" },
    { id: "p-5", label: "中国大陆驾照及国际翻译件（如果在普吉或瑶亚岛有租车或骑小电驴打算）", category: "🪪 证件与财务" },

    // 2. 👕 衣服与鞋履 (已去掉七夕礼服，注重舒适与防晒)
    { id: "p-6", label: "寺庙合规着装：长裤或过膝长裙、有袖上衣（大皇宫/郑王庙严禁背心短裤露肩）", category: "👕 衣服与鞋履" },
    { id: "p-7", label: "夏季透气换洗衣物：T恤、短裤、快干衣（泰国湿热衣服干得慢，建议多备两套）", category: "👕 衣服与鞋履" },
    { id: "p-8", label: "海岛度假泳装：建议准备 2-3 套泳衣（出海快艇与度假村无边泳池轮换拍照与穿着）", category: "👕 衣服与鞋履" },
    { id: "p-9", label: "鞋履搭配：舒适好走路的运动鞋（逛商圈寺庙）+ 防滑涉水沙滩拖鞋（海岛酒店与跳岛）", category: "👕 衣服与鞋履" },
    { id: "p-10", label: "轻薄空调衫/防晒衣（商场、BTS地铁、机场冷气极足，室内外温差大极为容易感冒）", category: "👕 衣服与鞋履" },

    // 3. ☀️ 防晒与洗护 (单独独立分类)
    { id: "p-11", label: "高倍防水防晒霜 (SPF50+ PA++++，出海快艇及海滩无遮挡极易严重晒伤)", category: "☀️ 防晒与洗护" },
    { id: "p-12", label: "晒后修复芦荟胶（晚间回到酒店厚敷，有效缓解海风与强烈紫外线灼伤）", category: "☀️ 防晒与洗护" },
    { id: "p-13", label: "墨镜（偏光防强光拍片神器）及宽檐沙滩遮阳帽", category: "☀️ 防晒与洗护" },
    { id: "p-14", label: "便携护发精油或护发素（海水浸泡与海风吹拂后头发极易干枯打结，酒店洗发水较干）", category: "☀️ 防晒与洗护" },
    { id: "p-15", label: "个人洗漱包及旅行洗面奶（部分环保度假村不提供一次性牙刷牙膏，需自备）", category: "☀️ 防晒与洗护" },

    // 4. 🔌 电子电器与通讯
    { id: "p-16", label: "泰国高速流量卡 / eSIM 卡（确保落地曼谷即开通上网，建议开启双卡）", category: "🔌 电子电器与通讯" },
    { id: "p-17", label: "大容量充电宝及数据线（长时间导航拍照耗电极快，充电宝机身必须有清晰毫安时标识）", category: "🔌 电子电器与通讯" },
    { id: "p-18", label: "转换插头与多口快充头（泰国大多兼容两脚扁插，但三脚需转换器，多设备充电需多口快充）", category: "🔌 电子电器与通讯" },
    { id: "p-19", label: "手机防水套 / 出海专属防水袋（8月出海快艇颠簸易起水花，保护手机与充电宝安全）", category: "🔌 电子电器与通讯" },

    // 5. 💊 常备药品与防护
    { id: "p-20", label: "晕船药及贴片（普吉岛到瑶亚岛、跳岛游搭乘快艇风浪较大必备，提前半小时吃）", category: "💊 常备药品与防护" },
    { id: "p-21", label: "热带高效防蚊液 / 青草药膏（8月雨季海岛户外蚊虫较多，防叮咬与止痒）", category: "💊 常备药品与防护" },
    { id: "p-22", label: "肠胃止泻药与蒙脱石散（夜市海鲜、冰镇饮品及异国水土不服应急必备救命药）", category: "💊 常备药品与防护" },
    { id: "p-23", label: "感冒退烧药、消炎药及防水创可贴（室内外冷热交替防感冒、礁石划伤消毒应急）", category: "💊 常备药品与防护" },

    // 6. 🌧️ 雨季与出行专属装备
    { id: "p-24", label: "便携自动折叠雨伞或轻便防水风衣（8月雨季曼谷普吉午后常有强对流阵雨，来去快速）", category: "🌧️ 雨季与出行专属" },
    { id: "p-25", label: "便携手持小风扇 / 挂脖风扇（曼谷街头与夜市高湿闷热，降温舒适度大幅提升）", category: "🌧️ 雨季与出行专属" },
    { id: "p-26", label: "消毒湿纸巾与纸巾（夜市摊位吃剥壳海鲜、擦拭桌椅餐具随时保持手部卫生）", category: "🌧️ 雨季与出行专属" },
  ];

  const defaultChecked = {
    "p-1": true,
    "p-3": true,
    "p-6": true,
  };

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("thailand_trip_packing");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load local packing list", e);
    }
    return defaultChecked;
  });

  useEffect(() => {
    const initialPacking = (() => {
      try {
        const saved = localStorage.getItem("thailand_trip_packing");
        return saved ? JSON.parse(saved) : defaultChecked;
      } catch {
        return defaultChecked;
      }
    })();

    const unsubscribe = subscribeToPackingList((cloudPacking) => {
      setCheckedItems(cloudPacking);
    }, initialPacking);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("thailand_trip_packing", JSON.stringify(checkedItems));
    } catch (e) {
      console.error("Failed to save local packing list", e);
    }
  }, [checkedItems]);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      savePackingListToCloud(next);
      return next;
    });
  };

  const handleToggleAll = () => {
    const allChecked =
      Object.keys(checkedItems).length === packingItems.length &&
      Object.values(checkedItems).every(Boolean);
    const next: Record<string, boolean> = {};
    if (!allChecked) {
      packingItems.forEach((i) => (next[i.id] = true));
    }
    setCheckedItems(next);
    savePackingListToCloud(next);
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
            onClick={handleToggleAll}
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
