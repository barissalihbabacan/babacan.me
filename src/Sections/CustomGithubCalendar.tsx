"use client";

import { useState, useEffect, useRef } from "react";
import { loadGithubData, type ContributionDay } from "@/Utils/githubData";
import Box from "@/Components/Box";
import Text from "@/Components/Text";
import { type Locale } from "@/I18n";
import { Colors, ContributionColors } from "@/DesignSystem";

// Katkı basamakları: boş, açık, orta, parlak altın ve en yüksek (kontrast notları ContributionColors'ta)
const LEVEL_COLORS: readonly string[] = [
  Colors.Surface,
  ContributionColors.Low,
  ContributionColors.Medium,
  ContributionColors.High,
  Colors.Primary,
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
    <Box ref={rootRef} className="w-full flex flex-col gap-2 select-none">
      <Box className="flex items-center justify-between text-xs text-on-surface-variant font-label-mono mb-2">
        <Text as="span">
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
        </Text>

        {/* Lejant */}
        <Box className="flex items-center gap-1.5">
          <Text as="span" className="text-label-2xs text-on-surface-variant/70 uppercase tracking-wider">
            {lang === "tr" ? "Az" : "Less"}
          </Text>
          {LEVEL_COLORS.map((color, index) => (
            <Box
              key={index}
              className="w-2.5 h-2.5 rounded-[1px] border border-white/5"
              style={{ backgroundColor: color }}
            />
          ))}
          <Text as="span" className="text-label-2xs text-on-surface-variant/70 uppercase tracking-wider">
            {lang === "tr" ? "Çok" : "More"}
          </Text>
        </Box>
      </Box>

      {/* Takvim Izgarası */}
      <Box className="overflow-x-auto pb-2 scrollbar-thin">
        <Box className="min-w-[720px] flex flex-col gap-1">
          {/* Ay Başlıkları */}
          <Box className="flex text-label-2xs font-label-mono text-on-surface-variant/60 h-4 relative">
            {monthLabels.map((m, idx) => (
              <Text
                as="span"
                key={idx}
                className="absolute"
                style={{ left: `${(m.weekIndex / Math.max(weeks.length, 52)) * 100}%` }}
              >
                {m.name}
              </Text>
            ))}
          </Box>

          {/* 7 Satırlık Hafta Sütunları */}
          <Box className="flex gap-[3px]">
            {loading && weeks.length === 0 ? (
              <Box className="h-28 w-full flex items-center justify-center border border-primary/20 bg-surface-container/20">
                <Text as="span" className="font-label-mono text-xs text-on-surface-variant">
                  {lang === "tr" ? "Yükleniyor..." : "Loading..."}
                </Text>
              </Box>
            ) : (
              weeks.map((week, wIdx) => (
                <Box key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day) => {
                    const color = LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0];
                    return (
                      <Box
                        key={day.date}
                        title={`${day.date}: Level ${day.level}`}
                        className="w-[11px] h-[11px] rounded-[1px] transition-colors hover:scale-125"
                        style={{ backgroundColor: color }}
                      />
                    );
                  })}
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
