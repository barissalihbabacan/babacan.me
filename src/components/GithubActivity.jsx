import React, { useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useGithubStats, useGithubRepos } from "../contexts/useGithubStats";
import { useLanguage } from "../contexts/LanguageContext";

const repoTranslations = {
  hive: {
    en: "Multi-Agent Harness for Production AI",
    tr: "Üretim odaklı yapay zeka için çoklu ajan (multi-agent) altyapısı.",
  },
  barissalihbabacan: {
    en: "Config files for my GitHub profile.",
    tr: "GitHub profilim için yapılandırma dosyaları.",
  },
  "Q-PASS-RFID-Access-Control": {
    en: "🛡️ Active IoT Access Control System deployed at Haydarpaşa MTAL. An end-to-end security solution integrating Arduino (C++) & RFID hardware with a Python serial bridge, backed by a PHP/MySQL database and a modern Web Dashboard. Manages real-time student entry logs and campus security.",
    tr: "🛡️ Haydarpaşa MTAL'de kullanılan aktif IoT Geçiş Kontrol Sistemi. Arduino (C++) & RFID donanımını Python seri köprüsü ile entegre eden, PHP/MySQL veritabanı ve modern Web paneliyle desteklenen uçtan uca bir güvenlik çözümü. Gerçek zamanlı öğrenci girişlerini ve kampüs güvenliğini yönetir.",
  },
  graphify: {
    en: "AI coding assistant skill (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, and more). Turn any folder of code, SQL schemas, R scripts, shell scripts, docs, papers, images, or videos into a queryable knowledge graph. App code + database schema + infrastructure in one graph.",
    tr: "Yapay zeka kodlama asistanı yeteneği (Claude Code, Cursor, Gemini vb.). Herhangi bir kod klasörünü, SQL şemasını, belgeyi veya görselleri sorgulanabilir bir bilgi grafiğine dönüştürür. Kod + şema + altyapı tek bir grafikte toplanır.",
  },
  "IT-Department-Resource-Management-System": {
    en: "🏢 Comprehensive IT Asset & Resource Management System. Features Barcode Tracking, PDF Reporting, and Student Management. Built with PHP & MySQL.",
    tr: "🏢 Kapsamlı BT Varlık ve Kaynak Yönetim Sistemi. Barkod Takibi, PDF Raporlama ve Öğrenci Yönetimi özellikleri sunar. PHP ve MySQL ile geliştirilmiştir.",
  },
  "l10n-anytype-ts": {
    en: "Localization for desktop version of Anytype",
    tr: "Anytype masaüstü sürümü için Türkçe yerelleştirme (çeviri) çalışması.",
  },
};

export default function GithubActivity() {
  const { t, lang } = useLanguage();
  const { stats, languages, loading: statsLoading, error: statsError } = useGithubStats();
  const [repoType, setRepoType] = useState("personal");
  const { repos, loading: reposLoading, error } = useGithubRepos(repoType);

  const langEntries = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const totalLangs = langEntries.reduce((acc, [_, count]) => acc + count, 0);

  return (
    <section
      id="opensource"
      className="scroll-reveal relative min-h-screen border-t border-primary/30 py-[10vh] overflow-hidden"
    >
      <div className="section-ghost-number">03</div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-[8vh]">
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
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                terminal
              </span>
              {t("github.contributionsLabel")}
            </div>
          </div>
          <a
            href="https://github.com/barissalihbabacan"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 font-label-mono text-xs text-on-surface-variant hover:text-primary transition-colors border border-primary/20 hover:border-primary/50 px-4 py-2"
          >
            github.com/barissalihbabacan
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
              open_in_new
            </span>
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

            <div className="border border-primary/20 p-6 bg-surface-container/5 relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] pointer-events-none"></div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-label-mono text-sm text-on-surface uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary animate-pulse"></span>
                  {t("github.activity")}
                </h3>
                <a
                  href="https://github.com/barissalihbabacan"
                  target="_blank"
                  rel="noopener"
                  className="font-label-mono text-[10px] text-primary hover:text-primary/70 transition-colors flex items-center gap-1 uppercase tracking-widest"
                >
                  {t("github.viewOnGithub")}{" "}
                  <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>
                    arrow_forward
                  </span>
                </a>
              </div>
              <div className="w-full overflow-x-auto pb-2 custom-github-calendar">
                <div className="w-full min-w-[700px]">
                  <GitHubCalendar
                    username="barissalihbabacan"
                    colorScheme="dark"
                    theme={{
                      dark: [
                        "#111214",
                        "rgba(197, 160, 89, 0.25)",
                        "rgba(197, 160, 89, 0.50)",
                        "rgba(197, 160, 89, 0.75)",
                        "rgba(197, 160, 89, 1)",
                      ],
                    }}
                    hideTotalCount={false}
                    labels={{
                      totalCount: t("github.calendarTotal"),
                      legend: {
                        less: t("github.calendarLess"),
                        more: t("github.calendarMore"),
                      },
                    }}
                    fontSize={10}
                    blockSize={11}
                    blockMargin={4}
                    style={{
                      fontFamily: "var(--font-family-label-mono)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">
                {t("github.langDist")}
              </h3>
              {statsLoading ? (
                <div className="text-on-surface-variant text-sm">Loading...</div>
              ) : langEntries.length > 0 ? (
                <div className="space-y-3">
                  {langEntries.slice(0, 5).map(([lang, count]) => {
                    const pct = Math.round((count / totalLangs) * 100);
                    return (
                      <div key={lang}>
                        <div className="flex justify-between font-label-mono text-[10px] mb-1">
                          <span className="text-on-surface uppercase">{lang}</span>
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

            <div>
              <div className="flex items-center gap-4 mb-4">
                <button
                  className={`font-label-mono text-[10px] uppercase tracking-widest ${repoType === "personal" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
                  onClick={() => setRepoType("personal")}
                >
                  {t("github.personal")}
                </button>
                <button
                  className={`font-label-mono text-[10px] uppercase tracking-widest ${repoType === "org-sins" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
                  onClick={() => setRepoType("org-sins")}
                >
                  THESINSOFTHEFATHERS
                </button>
                <button
                  className={`font-label-mono text-[10px] uppercase tracking-widest ${repoType === "org-osmos" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
                  onClick={() => setRepoType("org-osmos")}
                >
                  OSMOS-APP
                </button>
              </div>

              {reposLoading ? (
                <div className="font-label-mono text-xs text-primary animate-pulse py-8">
                  {t("github.loadingRepos")}
                </div>
              ) : error ? (
                <div className="font-label-mono text-xs text-error py-8">
                  {t("github.errorLoading")}
                </div>
              ) : repos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener"
                      className="block border border-primary/20 p-4 hover:border-primary/50 transition-colors group bg-surface-container/5"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-label-mono text-sm text-on-surface group-hover:text-primary transition-colors truncate pr-4">
                          {repo.name}
                        </h4>
                        <span
                          className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors shrink-0"
                          style={{ fontSize: "14px" }}
                        >
                          open_in_new
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant/70 mb-4 line-clamp-2 min-h-[2rem]">
                        {repoTranslations[repo.name]
                          ? repoTranslations[repo.name][lang] || repo.description
                          : repo.description || t("github.noDescription")}
                      </p>
                      <div className="flex items-center gap-4 font-label-mono text-[9px] text-on-surface-variant uppercase tracking-widest">
                        {repo.language && (
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                            {repo.language}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[11px]">star</span>
                          {repo.stargazers_count}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[11px]">fork_right</span>
                          {repo.forks_count}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="font-label-mono text-xs text-on-surface-variant py-8">
                  {t("github.noRepos")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
