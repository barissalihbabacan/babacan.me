import React from "react";
import CustomGithubCalendar from "./CustomGithubCalendar.tsx";
import { useGithubStats } from "../contexts/useGithubStats.ts";
import { useLanguage } from "../contexts/LanguageContext.tsx";

export default function GithubActivity() {
  const { t, lang } = useLanguage();
  const { stats, languages, loading: statsLoading } = useGithubStats();

  const langEntries = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const totalLangs = langEntries.reduce((acc, [, count]) => acc + count, 0);

  return (
    <section
      id="opensource"
      className="scroll-reveal relative min-h-screen border-t border-primary/30 py-[10vh] overflow-hidden"
    >
      <div className="section-ghost-number">03</div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-[4vh]">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                {t("github.sectionLabel")}
              </span>
              <div className="h-px flex-1 bg-primary/20 max-w-xs"></div>
            </div>
            <h2
              className="text-on-surface font-bold mb-2"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              {t("github.title")}
            </h2>
            <div className="font-label-mono text-xs text-primary uppercase tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
              </svg>
              {t("github.contributionsLabel")}
            </div>
          </div>
          <a
            href="https://github.com/barissalihbabacan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-label-mono text-xs text-on-surface-variant hover:text-primary transition-colors border border-primary/20 hover:border-primary/50 px-4 py-2"
          >
            <span>github.com/barissalihbabacan</span>
            <svg
              className="w-3.5 h-3.5 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3zM5 5h6v2H5v12h12v-6h2v8H3V5h2z" />
            </svg>
          </a>
        </div>

        <div className="flex flex-col gap-8">
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-primary/20 p-4 bg-surface-container/10">
                <div className="font-label-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1">
                  —
                </div>
                <div className="font-label-mono text-[10px] text-primary uppercase tracking-widest mb-2">
                  {t("github.publicRepos")}
                </div>
                <div className="text-3xl font-bold text-on-surface">
                  {statsLoading ? "—" : stats.repos}
                </div>
              </div>
              <div className="border border-primary/20 p-4 bg-surface-container/10">
                <div className="font-label-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1">
                  —
                </div>
                <div className="font-label-mono text-[10px] text-primary uppercase tracking-widest mb-2">
                  {t("github.totalStars")}
                </div>
                <div className="text-3xl font-bold text-on-surface">
                  {statsLoading ? "—" : stats.stars}
                </div>
              </div>
              <div className="border border-primary/20 p-4 bg-surface-container/10">
                <div className="font-label-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1">
                  —
                </div>
                <div className="font-label-mono text-[10px] text-primary uppercase tracking-widest mb-2">
                  {t("github.totalForks")}
                </div>
                <div className="text-3xl font-bold text-on-surface">
                  {statsLoading ? "—" : stats.forks}
                </div>
              </div>
              <div className="border border-primary/20 p-4 bg-surface-container/10">
                <div className="font-label-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1">
                  —
                </div>
                <div className="font-label-mono text-[10px] text-primary uppercase tracking-widest mb-2">
                  {t("github.followers")}
                </div>
                <div className="text-3xl font-bold text-on-surface">
                  {statsLoading ? "—" : stats.followers}
                </div>
              </div>
            </div>

            <div className="border border-primary/20 p-6 md:p-8 bg-surface-container/10 w-full overflow-hidden">
              <div className="font-label-mono text-xs text-primary uppercase tracking-widest mb-6">
                {t("github.activity")}
              </div>

              <div className="overflow-x-auto pb-2 w-full">
                <CustomGithubCalendar username="barissalihbabacan" lang={lang as "en" | "tr"} />
              </div>
            </div>

            <div className="border border-primary/20 p-6 bg-surface-container/10">
              <div className="font-label-mono text-[10px] text-primary uppercase tracking-widest mb-4">
                {t("github.langDist")}
              </div>
              {totalLangs > 0 ? (
                <div className="space-y-3">
                  {langEntries.slice(0, 5).map(([langName, count]) => {
                    const pct = Math.round((count / totalLangs) * 100);
                    return (
                      <div key={langName}>
                        <div className="flex justify-between font-label-mono text-[10px] mb-1">
                          <span className="text-on-surface uppercase">{langName}</span>
                          <span className="text-primary">{pct}%</span>
                        </div>
                        <div className="h-1 bg-surface-container/50 w-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest py-4">
                  {t("github.noLangData")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
