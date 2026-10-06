import React, { useState, useEffect } from "react";
import { loadGithubData, type ContributionDay } from "../contexts/githubData.ts";

const LEVEL_COLORS = [
  "#181a1c", // level 0 - empty
  "#2d2417", // level 1 - light
  "#4f3c1b", // level 2 - medium
  "#8b682b", // level 3 - high
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
      <div className="w-full py-12 flex items-center justify-center font-label-mono text-xs text-primary animate-pulse">
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

  return (
    <div className="w-full flex flex-col gap-4 font-label-mono">
      {/* Month Labels Header */}
      <div
        className="gap-1 w-full text-[10px] text-on-surface-variant/70 min-w-[700px]"
        style={{ display: "grid", gridTemplateColumns: "repeat(53, minmax(0, 1fr))" }}
      >
        {Array.from({ length: 53 }).map((_, weekIdx) => {
          const label = monthLabels.find((m) => m.weekIndex === weekIdx);
          return (
            <div key={weekIdx} className="text-center font-mono overflow-visible whitespace-nowrap">
              {label ? label.name : ""}
            </div>
          );
        })}
      </div>

      {/* Main 53 Column Grid */}
      <div
        className="gap-1 md:gap-1.5 w-full min-w-[700px]"
        style={{ display: "grid", gridTemplateColumns: "repeat(53, minmax(0, 1fr))" }}
      >
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-1 md:gap-1.5">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.level > 0 ? `${day.level} activity` : "No activity"}`}
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

      {/* Footer Legend */}
      <div className="flex items-center justify-between text-[11px] text-on-surface-variant/70 pt-2 border-t border-primary/10">
        <div>
          {totalContributions !== null && (
            <span>
              {totalContributions}{" "}
              {lang === "tr"
                ? "son 1 yıldaki toplam katkı"
                : "total contributions in the last year"}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
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
