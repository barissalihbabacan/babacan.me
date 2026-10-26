"use client";

import { useState, useEffect, useRef } from "react";
import { loadGithubData, type ContributionDay } from "@/utils/githubData";
import { type Locale } from "@/i18n";

// Boş hücreye (#181a1c) karşı kontrast: 3.04 / 4.34 / 5.76 / 7.1. WCAG 1.4.11 uyumlu.
const LEVEL_COLORS: readonly string[] = [
  "#181a1c", // level 0 - boş
  "#7a6331", // level 1 - açık altın
  "#9a7a3c", // level 2 - orta altın
  "#b38f45", // level 3 - parlak altın
  "#c5a059", // level 4 - en yüksek altın
];

const MONTH_NAMES_TR: readonly string[] = [
  "Oca", "Şub", "Mar", "Nis", "May", "Haz",
  "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara",
];

const MONTH_NAMES_EN: readonly string[] = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

interface CustomGithubCalendarProps {
  readonly lang: Locale;
}

export default function CustomGithubCalendar({ lang = "tr" }: CustomGithubCalendarProps) {
  const [days, setDays] = useState<readonly ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Dar ekranda takvim yatay kayar; en güncel haftalar görünsün diye en sağa kaydır
  useEffect(() => {
    const scroller = rootRef.current?.parentElement;
    if (scroller && days.length) {
      scroller.scrollLeft = scroller.scrollWidth;
    }
  }, [days]);

  useEffect(() => {
    let cancelled = false;
    void loadGithubData().then((data) => {
      if (cancelled) return;
      if (data?.contributions?.days?.length) {
        setDays(data.contributions.days);
        setTotalContributions(data.contributions.total ?? null);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Günleri 7'şer günlük 53 haftaya grupla
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Ay etiketlerinin haftalık konumları
  const monthLabels: { readonly name: string; readonly weekIndex: number }[] = [];
  const monthNames = lang === "tr" ? MONTH_NAMES_TR : MONTH_NAMES_EN;

  weeks.forEach((week, weekIdx) => {
    const firstDay = week[0];
    if (firstDay) {
      const dateObj = new Date(firstDay.date);
      if (dateObj.getDate() <= 7) {
        monthLabels.push({
          name: monthNames[dateObj.getMonth()],
          weekIndex: weekIdx,
        });
      }
    }
  });

  return (
    <div ref={rootRef} className="w-full flex flex-col gap-2 select-none">
      <div className="flex items-center justify-between text-xs text-on-surface-variant font-label-mono mb-2">
        <span>
          {loading
            ? lang === "tr"
              ? "Katkı takvimi yükleniyor..."
              : "Loading contribution graph..."
            : totalContributions !== null
              ? lang === "tr"
                ? `Son 1 yılda ${totalContributions.toLocaleString("tr-TR")} katkı`
                : `${totalContributions.toLocaleString("en-US")} contributions in the last year`
              : lang === "tr"
                ? "Katkı takvimi"
                : "Contribution graph"}
        </span>

        {/* Lejant */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-on-surface-variant/70 uppercase tracking-wider">
            {lang === "tr" ? "Az" : "Less"}
          </span>
          {LEVEL_COLORS.map((color, index) => (
            <div
              key={index}
              className="w-2.5 h-2.5 rounded-[1px] border border-white/5"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="text-[10px] text-on-surface-variant/70 uppercase tracking-wider">
            {lang === "tr" ? "Çok" : "More"}
          </span>
        </div>
      </div>

      {/* Takvim Izgarası */}
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="min-w-[720px] flex flex-col gap-1">
          {/* Ay Başlıkları */}
          <div className="flex text-[10px] font-label-mono text-on-surface-variant/60 h-4 relative">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                className="absolute"
                style={{ left: `${(m.weekIndex / Math.max(weeks.length, 52)) * 100}%` }}
              >
                {m.name}
              </span>
            ))}
          </div>

          {/* 7 Satırlık Hafta Sütunları */}
          <div className="flex gap-[3px]">
            {loading && weeks.length === 0 ? (
              <div className="h-28 w-full flex items-center justify-center border border-primary/20 bg-surface-container/20">
                <span className="font-label-mono text-xs text-on-surface-variant">
                  {lang === "tr" ? "Yükleniyor..." : "Loading..."}
                </span>
              </div>
            ) : (
              weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day) => {
                    const color = LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0];
                    return (
                      <div
                        key={day.date}
                        title={`${day.date}: Level ${day.level}`}
                        className="w-[11px] h-[11px] rounded-[1px] transition-colors hover:scale-125"
                        style={{ backgroundColor: color }}
                      />
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
