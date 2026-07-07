import React, { useState, useEffect } from "react";
import { Plane, Sun, Clock, Heart } from "lucide-react";

// Flight timestamps (ISO 8601 with timezone offset)
// Wenzhou (WNZ) to Bangkok (BKK): Mon 10 Aug · 16:50 Thailand time (UTC+7)
const LANDING_BKK_MS = new Date("2026-08-10T16:50:00+07:00").getTime();
// Bangkok (BKK) to Shanghai (PVG): Sun 23 Aug · 15:55 Thailand time (UTC+7)
const TAKEOFF_BKK_MS = new Date("2026-08-23T15:55:00+07:00").getTime();
// Arrive Shanghai (PVG): Mon 24 Aug · 00:20 Beijing time (UTC+8)
const LANDING_PVG_MS = new Date("2026-08-24T00:20:00+08:00").getTime();

interface TimeBoxProps {
  value: number;
  labelZh: string;
  labelEn: string;
  isSecond?: boolean;
}

const TimeBox: React.FC<TimeBoxProps> = ({ value, labelZh, labelEn, isSecond }) => {
  const formatted = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center justify-center bg-black/35 backdrop-blur-md border border-white/20 rounded-2xl px-2.5 sm:px-4 py-2.5 sm:py-3 min-w-[3.6rem] sm:min-w-[4.5rem] md:min-w-[5rem] shadow-inner transition-all hover:bg-black/45 hover:border-white/30">
      <span
        key={value}
        className={`font-mono text-2xl sm:text-3xl md:text-4xl font-black tracking-wider tabular-nums inline-block ${
          isSecond
            ? "text-orange-light animate-pop-digit drop-shadow-[0_0_8px_rgba(232,144,100,0.6)]"
            : "text-white drop-shadow-md animate-pop-digit"
        }`}
      >
        {formatted}
      </span>
      <div className="flex flex-col items-center mt-1 leading-none">
        <span className="text-[11px] sm:text-xs font-bold text-sand/90 tracking-wider">
          {labelZh}
        </span>
        <span className="text-[9px] sm:text-[10px] font-semibold text-sand/60 uppercase tracking-widest mt-0.5">
          {labelEn}
        </span>
      </div>
    </div>
  );
};

export const TripCountdown: React.FC = () => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Determine current journey status and target time
  let targetTime = LANDING_BKK_MS;
  let badgeIcon = <Plane className="w-4 h-4 text-orange-light animate-bounce" style={{ animationDuration: "2s" }} />;
  let badgeTitle = "期待出发 · 距离航班落地泰国曼谷 (BKK)";
  let subTitle = "温州 (WNZ) ➔ 曼谷 (BKK) · 8月10日 16:50 降落";
  let glowColor = "from-orange-500/20 via-teal-500/20 to-transparent";

  if (now >= LANDING_BKK_MS && now < TAKEOFF_BKK_MS) {
    targetTime = LANDING_BKK_MS; // Elapsed time since landing in Thailand
    badgeIcon = <Sun className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: "8s" }} />;
    badgeTitle = "🌴 正在泰国尽情度假中！ · 已尽享日光与美味";
    subTitle = "曼谷 ➔ 普吉岛 ➔ 瑶亚岛浪漫漫游进行中";
    glowColor = "from-amber-500/25 via-emerald-500/20 to-transparent";
  } else if (now >= TAKEOFF_BKK_MS && now < LANDING_PVG_MS) {
    targetTime = LANDING_PVG_MS; // Countdown to landing in Shanghai
    badgeIcon = <Plane className="w-4 h-4 text-sky-300 animate-pulse" />;
    badgeTitle = "正在返回上海的航班上 · 距离着陆还有";
    subTitle = "曼谷 (BKK) ➔ 上海 (PVG) · 8月24日 00:20 降落";
    glowColor = "from-sky-500/20 via-indigo-500/20 to-transparent";
  } else if (now >= LANDING_PVG_MS) {
    targetTime = LANDING_PVG_MS; // Elapsed time since returning home
    badgeIcon = <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />;
    badgeTitle = "✨ 浪漫泰国之旅圆满结束 · 距离甜蜜归来已过";
    subTitle = "2026年8月10日 – 23日 · 珍藏无数美好回忆";
    glowColor = "from-rose-500/20 via-purple-500/20 to-transparent";
  }

  // Calculate time components
  const diffMs = Math.abs(targetTime - now);
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="relative mt-6 pt-6 border-t border-white/15">
      {/* Background radial glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${glowColor} rounded-3xl blur-2xl pointer-events-none -z-10 opacity-70`} />

      <div className="flex flex-col items-start gap-4">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-sm text-xs sm:text-sm font-bold text-white">
          {badgeIcon}
          <span>{badgeTitle}</span>
        </div>

        {/* Animated Digital Clock Boxes */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap">
          <TimeBox value={days} labelZh="天" labelEn="Days" />
          <span className="text-xl sm:text-3xl font-extrabold text-orange-light animate-pulse self-center pb-4">:</span>
          <TimeBox value={hours} labelZh="时" labelEn="Hours" />
          <span className="text-xl sm:text-3xl font-extrabold text-orange-light animate-pulse self-center pb-4">:</span>
          <TimeBox value={minutes} labelZh="分" labelEn="Mins" />
          <span className="text-xl sm:text-3xl font-extrabold text-orange-light animate-pulse self-center pb-4">:</span>
          <TimeBox value={seconds} labelZh="秒" labelEn="Secs" isSecond />
        </div>

        {/* Flight Subtitle Info */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-sand/80 font-medium pl-1">
          <Clock className="w-3.5 h-3.5 text-teal-100 flex-shrink-0" />
          <span>{subTitle}</span>
        </div>
      </div>
    </div>
  );
};
