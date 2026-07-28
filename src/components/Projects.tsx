import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext.tsx";
import { PROJECT_DATA, type ProjectKey } from "../data/projectsData.ts";

interface ProjectCardProps {
  projectKey: ProjectKey;
  onClick: (key: ProjectKey) => void;
  lang: string;
}

function ProjectCard({ projectKey, onClick, lang }: ProjectCardProps) {
  const data = PROJECT_DATA[projectKey];
  if (!data) return null;

  const category = data.category[lang as "en" | "tr"] ?? data.category.en;
  const title = data.title[lang as "en" | "tr"] ?? data.title.en;
  const description = data.description[lang as "en" | "tr"] ?? data.description.en;

  return (
    <div
      onClick={() => onClick(projectKey)}
      className="group relative border border-primary/30 p-6 flex flex-col hover:border-primary/50 transition-all cursor-pointer overflow-hidden bg-surface-container/20 hover:bg-surface-container/40"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] group-hover:bg-primary/10 transition-colors pointer-events-none"></div>

      <div className="flex items-center justify-between mb-4">
        <span
          className={`font-label-mono text-[9px] uppercase tracking-widest border px-2 py-0.5 ${data.categoryColor}`}
        >
          {category}
        </span>
        <span
          className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors"
          style={{ fontSize: "18px" }}
        >
          arrow_outward
        </span>
      </div>

      <h3 className="text-on-surface font-bold text-xl mb-2">{title}</h3>
      <p className="font-body-sm text-on-surface-variant text-sm mb-6 flex-1">
        {description.substring(0, 100)}...
      </p>

      <div className="pt-4 border-t border-primary/20 flex flex-wrap gap-2 mt-auto relative z-10">
        {data.tech.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="font-label-mono text-[9px] text-on-surface-variant/80 border border-outline-variant/60 px-2 py-0.5"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const { t, lang } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectKey | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const selData = selectedProject ? PROJECT_DATA[selectedProject] : null;

  return (
    <>
      <section
        id="projects"
        className="scroll-reveal relative min-h-screen border-t border-primary/30 py-[10vh] overflow-hidden"
      >
        <div className="section-ghost-number">02</div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <div className="flex items-center gap-4 mb-[5vh]">
            <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
              {t("projects.sectionLabel")}
            </span>
            <div className="h-px flex-1 bg-primary/20"></div>
          </div>

          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-label-mono text-sm text-on-surface tracking-widest uppercase">
                {t("projects.garageTitle")}
              </h3>
              <div className="h-px flex-1 bg-primary/20"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ProjectCard projectKey="sortify" onClick={setSelectedProject} lang={lang} />
              <ProjectCard projectKey="plus-tv" onClick={setSelectedProject} lang={lang} />
              <ProjectCard
                projectKey="gayrimenkuldunyasi"
                onClick={setSelectedProject}
                lang={lang}
              />
              <ProjectCard projectKey="playsortify" onClick={setSelectedProject} lang={lang} />
              <ProjectCard projectKey="sporsayfasi" onClick={setSelectedProject} lang={lang} />
              <ProjectCard projectKey="worldclock" onClick={setSelectedProject} lang={lang} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-label-mono text-sm text-on-surface tracking-widest uppercase">
                {t("projects.personalTitle")}
              </h3>
              <div className="h-px flex-1 bg-primary/20"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ProjectCard projectKey="mythos" onClick={setSelectedProject} lang={lang} />
              <ProjectCard projectKey="osmos" onClick={setSelectedProject} lang={lang} />
              <ProjectCard projectKey="qpass" onClick={setSelectedProject} lang={lang} />
              <ProjectCard projectKey="itrms" onClick={setSelectedProject} lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && selData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-surface/90 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProject(null)}
          ></div>
          <div className="relative w-full max-w-4xl bg-surface border border-primary/30 shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
            <button
              className="absolute top-4 right-4 z-10 text-on-surface/50 hover:text-on-surface bg-surface/50 rounded-full p-1 backdrop-blur-md transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                close
              </span>
            </button>

            <div
              className="w-full md:w-2/5 min-h-[240px] md:min-h-full relative flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-primary/20"
              style={{ background: selData.cardGradient }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              ></div>
              <div
                className={`absolute top-4 left-4 font-label-mono text-[9px] px-2 py-0.5 uppercase tracking-widest ${selData.statusColor}`}
              >
                {selData.status[lang as "en" | "tr"] ?? selData.status.en}
              </div>
              <div className="relative z-10 text-center">
                <span
                  className="material-symbols-outlined text-white/80"
                  style={{ fontSize: "64px" }}
                >
                  deployed_code
                </span>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-6 md:p-10 overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`font-label-mono text-[9px] uppercase tracking-widest border px-2 py-0.5 ${selData.categoryColor}`}
                >
                  {selData.category[lang as "en" | "tr"] ?? selData.category.en}
                </span>
                <span className="font-label-mono text-[10px] text-on-surface-variant">
                  {selData.year[lang as "en" | "tr"] ?? selData.year.en}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-on-surface mb-2">
                {selData.title[lang as "en" | "tr"] ?? selData.title.en}
              </h2>
              <div className="font-label-mono text-xs text-primary mb-6 uppercase tracking-widest">
                {selData.role[lang as "en" | "tr"] ?? selData.role.en}
              </div>

              <p className="font-body-md text-on-surface-variant leading-relaxed mb-8">
                {selData.description[lang as "en" | "tr"] ?? selData.description.en}
              </p>

              <div className="mb-8">
                <h4 className="font-label-mono text-[10px] text-on-surface uppercase tracking-widest mb-4">
                  {t("projects.highlights") || "Key Highlights"}
                </h4>
                <ul className="space-y-2">
                  {(selData.highlights[lang as "en" | "tr"] ?? selData.highlights.en).map(
                    (h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-xs text-on-surface-variant/70"
                      >
                        <span className="text-primary mt-0.5 flex-shrink-0">—</span>
                        <span>{h}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-label-mono text-[10px] text-on-surface uppercase tracking-widest mb-4">
                  {t("projects.techStack") || "Technologies & Stack"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selData.tech.map((tech) => (
                    <span
                      key={tech}
                      className="font-label-mono text-[9px] text-on-surface-variant/80 border border-outline-variant/60 px-2 py-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(selData.githubUrl || selData.liveUrl) && (
                <div className="mt-8 pt-6 border-t border-primary/20 flex flex-wrap gap-3">
                  {selData.liveUrl && (
                    <a
                      href={selData.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-surface px-4 py-2 font-label-mono text-[10px] uppercase tracking-widest hover:bg-primary/85 transition-all"
                    >
                      <span>{t("projects.visitLive") || "Garage.ist / Live"}</span>
                      <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                        open_in_new
                      </span>
                    </a>
                  )}
                  {selData.githubUrl && (
                    <a
                      href={`${selData.githubUrl}${selData.githubUrl.includes("?") ? "&" : "?"}utm_source=babacan.me&utm_medium=portfolio&utm_campaign=project_view`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-primary/30 text-on-surface px-4 py-2 font-label-mono text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
                    >
                      <span>{t("github.viewOnGithub") || "View Repository"}</span>
                      <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                        open_in_new
                      </span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
