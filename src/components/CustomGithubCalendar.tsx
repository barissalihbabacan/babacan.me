import React, { useState, useEffect, useRef } from "react";
import { loadGithubData, type ContributionDay } from "../contexts/githubData.ts";

// Bos hucreye (#181a1c) karsi kontrast: 3.04 / 4.34 / 5.76 / 7.1. WCAG 1.4.11 icin
// her dolu seviye en az 3:1 olmali; eski 1. ve 2. seviye 1.14 ve 1.66'da kaliyordu.
const LEVEL_COLORS = [
  "#181a1c", // level 0 - empty
  "#7a6331", // level 1 - light
  "#9a7a3c", // level 2 - medium
  "#b38f45", // level 3 - high
  "#c5a059", // level 4 - max
];

const MONTH_NAMES_TR = [
  "Oca",
  "Şub",
  "Mar",
  "Nis",
  "May",
  "Haz",
  "Tem",
  "Ağu",
  "Eyl",
  "Eki",
  "Kas",
  "Ara",
];
const MONTH_NAMES_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface CustomGithubCalendarProps {
  lang?: "en" | "tr";
}

export default function CustomGithubCalendar({ lang = "tr" }: CustomGithubCalendarProps) {
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Dar ekranda takvim yatay kayar; en guncel haftalar gorunsun diye en saga kaydir.
  useEffect(() => {
    const scroller = rootRef.current?.parentElement;
    if (scroller && days.length) scroller.scrollLeft = scroller.scrollWidth;
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

  // Group days into 53 weeks (each week has 7 days)
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  days.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Calculate month labels positions
  const monthLabels: { name: string; weekIndex: number }[] = [];
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

  if (loading) {
    return (
      <div className="w-full py-12 flex items-center justify-center font-label-mono text-xs text-primary motion-safe:animate-pulse">
        {lang === "tr" ? "Katkı haritası yükleniyor..." : "Loading contribution graph..."}
      </div>
    );
  }

  if (days.length === 0) {
    return (
      <div className="w-full py-12 flex items-center justify-center font-label-mono text-xs text-on-surface-variant">
        {lang === "tr"
          ? "Katkı verisi şu an alınamıyor."
          : "Contribution data is currently unavailable."}
      </div>
    );
  }

  const isTr = lang === "tr";
  const activeDays = days.filter((day) => day.level > 0).length;
  const totalText = totalContributions !== null ? totalContributions.toLocaleString(lang) : null;
  // Izgara yalnizca renkle bilgi verir; ekran okuyucuya tek bir ozet okunur.
  const summary = isTr
    ? `Son bir yılın katkı haritası: ${totalText ?? "?"} katkı, ${activeDays} aktif gün.`
    : `Contribution map for the last year: ${totalText ?? "?"} contributions on ${activeDays} active days.`;

  return (
    <div ref={rootRef} className="w-full flex flex-col gap-4 font-label-mono">
      <div role="img" aria-label={summary} className="flex flex-col gap-4">
        {/* Month Labels Header */}
        <div
          aria-hidden="true"
          className="gap-1 w-full text-label-xs text-on-surface-variant/70 min-w-[700px]"
          style={{ display: "grid", gridTemplateColumns: "repeat(53, minmax(0, 1fr))" }}
        >
          {Array.from({ length: 53 }).map((_, weekIdx) => {
            const label = monthLabels.find((m) => m.weekIndex === weekIdx);
            return (
              <div
                key={weekIdx}
                className="text-center font-mono overflow-visible whitespace-nowrap"
              >
                {label ? label.name : ""}
              </div>
            );
          })}
        </div>

        {/* Main 53 Column Grid */}
        <div
          aria-hidden="true"
          className="gap-1 md:gap-1.5 w-full min-w-[700px]"
          style={{ display: "grid", gridTemplateColumns: "repeat(53, minmax(0, 1fr))" }}
        >
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1 md:gap-1.5">
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${day.date}: ${
                    day.level > 0
                      ? isTr
                        ? `${day.level}. seviye katkı`
                        : `activity level ${day.level}`
                      : isTr
                        ? "Katkı yok"
                        : "No activity"
                  }`}
                  className="w-full aspect-square rounded-[2px] transition-all hover:scale-125 hover:z-10 cursor-pointer"
                  style={{
                    backgroundColor: LEVEL_COLORS[day.level] || LEVEL_COLORS[0],
                    border:
                      day.level > 0
                        ? "1px solid rgba(197, 160, 89, 0.2)"
                        : "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Legend */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-label-sm text-on-surface-variant/70 pt-2 border-t border-primary/10">
        <div>
          {totalText !== null && (
            <span>
              {totalText}{" "}
              {lang === "tr"
                ? "son 1 yıldaki toplam katkı"
                : "total contributions in the last year"}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2" aria-hidden="true">
          <span>{lang === "tr" ? "Az" : "Less"}</span>
          <div className="flex items-center gap-1">
            {LEVEL_COLORS.map((color, idx) => (
              <div
                key={idx}
                className="w-3 h-3 rounded-[2px]"
                style={{ backgroundColor: color, border: "1px solid rgba(255, 255, 255, 0.1)" }}
              />
            ))}
          </div>
          <span>{lang === "tr" ? "Çok" : "More"}</span>
        </div>
      </div>
    </div>
  );
}
