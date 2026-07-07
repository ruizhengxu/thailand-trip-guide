import React from "react";
import { CloudRain, ShieldAlert, Sun, Thermometer } from "lucide-react";

interface WeatherNoteCardProps {
  notes?: readonly string[];
}

export const WeatherNoteCard: React.FC<WeatherNoteCardProps> = ({ notes }) => {
  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-card to-blue-500/5 shadow-premium space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line/60">
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-sky-500/15 text-sky-500 border border-sky-500/30">
            <CloudRain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-text tracking-tight font-sans">
              8 月雨季天气与安全准则
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-0.5">
              掌握热带季风气候节奏，轻松把雨季转为旅途浪漫情调
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-sand/60 px-3 py-1.5 rounded-xl border border-line/80 self-start sm:self-auto text-xs font-semibold text-text">
          <Thermometer className="w-4 h-4 text-orange" />
          <span>气温 26°C – 32°C · 湿度高</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-4 rounded-2xl bg-card border border-line/80 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-sky-500">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>上午黄金窗口</span>
          </div>
          <p className="text-xs sm:text-sm text-text/85 leading-relaxed">
            上午通常多云或晴朗，海风清爽，是户外拍照、寺庙巡游、高空栈道和岛屿打卡的最佳时间。
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-line/80 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-blue-500">
            <CloudRain className="w-4 h-4 text-sky-500" />
            <span>下午阵雨节律</span>
          </div>
          <p className="text-xs sm:text-sm text-text/85 leading-relaxed">
            14:00–17:00 易有短时强降雨。将行程自然过渡到高档 SPA、暹罗百丽宫、ICONSIAM 或度假村室内活动。
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-line/80 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            <ShieldAlert className="w-4 h-4 text-emerald-500" />
            <span>海上与泳池警示</span>
          </div>
          <p className="text-xs sm:text-sm text-text/85 leading-relaxed">
            普吉海滩插红旗或出现狂风乱浪时切勿下海；瑶亚岛出海如遇天气恶劣，立即启用无条件退换机制。
          </p>
        </div>
      </div>

      {notes && notes.length > 0 && (
        <div className="pt-4 border-t border-line/60">
          <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">
            达人秘籍 · Weather Checkpoints
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {notes.map((note, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-sand/40 border border-line/50 text-xs font-medium text-text/90 flex items-start gap-2"
              >
                <span className="text-sky-500 font-bold">•</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
