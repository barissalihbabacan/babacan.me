"use client";

import { useState, useEffect } from "react";
import CustomGithubCalendar from "./CustomGithubCalendar";
import { loadGithubData, type GithubData } from "@/utils/githubData";
import { type Locale } from "@/i18n";
import { UI_DICTIONARY } from "@/data/i18nData";
import { PROJECT_DATA, type ProjectKey } from "@/data/projectsData";
import Icon from "./Icon";
import LatinText from "./LatinText";

// Kodu herkese açık projeler; kartları Projeler bölümünde, burada repo linkleri yer alır
const OPEN_SOURCE: readonly ProjectKey[] = ["osmos", "mythos", "chorus"];

export interface GithubActivityProps {
  readonly currentLocale: Locale;
}

export default function GithubActivity({ currentLocale }: GithubActivityProps) {
  const isTr = currentLocale === "tr";
  const { github } = UI_DICTIONARY;
  const [data, setData] = useState<GithubData | null>(null);

  useEffect(() => {
    void loadGithubData().then((res) => {
      if (res) setData(res);
    });
  }, []);

  const languages = data?.languages ?? {};
  const langEntries = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const totalBytes = langEntries.reduce((acc, [, bytes]) => acc + bytes, 0);

  return (
    <section
      id="opensource"
      className="scroll-reveal relative min-h-screen border-t border-primary/30 py-[10vh] overflow-hidden"
    >
      <div className="section-ghost-number">02</div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-[4vh]">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest">
                <LatinText text={github.sectionLabel[currentLocale]} />
              </span>
              <div className="h-px flex-1 bg-primary/20 max-w-xs" />
            </div>
            <h2
              className="text-on-surface font-bold mb-2"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              {github.title[currentLocale]}
            </h2>
            <div className="font-label-mono text-xs text-primary uppercase tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
              </svg>
              {github.contributionsLabel[currentLocale]}
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
            <div>
              <h3 className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mb-3">
                {github.featured[currentLocale]}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {OPEN_SOURCE.map((slug) => {
                  const url = PROJECT_DATA[slug]?.githubUrl ?? "";
                  return (
                    <li key={slug}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${url.replace("https://github.com/", "")} — ${github.viewRepo[currentLocale]}`}
                        className="inline-flex items-center gap-2 min-h-9 px-3 border border-primary/30 hover:border-primary/60 font-label-mono text-xs text-on-surface hover:text-primary transition-colors"
                      >
                        <span lang="en">{url.replace("https://github.com/", "")}</span>
                        <Icon name="north_east" className="w-3.5 h-3.5 text-on-surface-variant" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 border border-primary/20 bg-surface-container/20">
                <div className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mb-1">
                  {github.publicRepos[currentLocale]}
                </div>
                <div className="text-2xl font-bold text-on-surface font-display-lg">
                  {data?.repoCount !== undefined ? data.repoCount : "—"}
                </div>
              </div>

              <div className="p-4 border border-primary/20 bg-surface-container/20">
                <div className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mb-1">
                  {github.organizations[currentLocale]}
                </div>
                <div className="text-2xl font-bold text-on-surface font-display-lg">
                  {data?.orgCount !== undefined ? data.orgCount : "—"}
                </div>
              </div>

              <div className="p-4 border border-primary/20 bg-surface-container/20">
                <div className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mb-1">
                  {github.yearContributions[currentLocale]}
                </div>
                <div className="text-2xl font-bold text-on-surface font-display-lg">
                  {data?.contributions?.total !== undefined
                    ? data.contributions.total.toLocaleString(isTr ? "tr-TR" : "en-US")
                    : "—"}
                </div>
              </div>
            </div>

            {/* GitHub Katkı Takvimi */}
            <div className="p-4 sm:p-6 border border-primary/20 bg-surface-container/20">
              <CustomGithubCalendar lang={currentLocale} />
            </div>

            {/* Dil Dağılımı */}
            {totalBytes > 0 && (
              <div className="p-4 sm:p-6 border border-primary/20 bg-surface-container/20">
                <h3 className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mb-4">
                  {github.langDist[currentLocale]}
                </h3>

                {/* Yığılmış Dil Çubuğu */}
                <div className="h-3 w-full rounded-xs overflow-hidden flex bg-surface-container-highest mb-4">
                  {langEntries.slice(0, 6).map(([langName, bytes]) => {
                    const percentage = (bytes / totalBytes) * 100;
                    return (
                      <div
                        key={langName}
                        title={`${langName}: %${percentage.toFixed(1)}`}
                        style={{ width: `${percentage}%` }}
                        className="h-full border-r border-background first:rounded-l-xs last:rounded-r-xs opacity-90 transition-opacity hover:opacity-100"
                        data-lang={langName}
                      />
                    );
                  })}
                </div>

                {/* Dil Lejantı */}
                <div className="flex flex-wrap gap-4 text-xs font-label-mono text-on-surface-variant">
                  {langEntries.slice(0, 6).map(([langName, bytes]) => {
                    const percentage = (bytes / totalBytes) * 100;
                    return (
                      <div key={langName} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <span className="text-on-surface font-medium">{langName}</span>
                        <span className="text-on-surface-variant/70">%{percentage.toFixed(1)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
