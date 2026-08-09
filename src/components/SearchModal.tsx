import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";
import { PROJECT_DATA } from "../data/projectsData";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  url: string;
  snippet: string;
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { lang } = useLanguage();
  const { navigate } = useAppRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isTr = lang === "tr";

  // Index all searchable items
  const allItems: SearchResult[] = [
    // Platform pages
    {
      id: "page-architecture",
      title: isTr ? "Sistem Mimarisi ve Felsefe" : "Systems Architecture & Software Philosophy",
      category: isTr ? "Platform" : "Platform",
      url: `/${lang}/${isTr ? "mimari" : "architecture"}`,
      snippet: isTr
        ? "Local-First yazılım felsefesi, Rust ile bellek güvenliği ve P2P CRDT senkronizasyonu."
        : "Local-first data sovereignty, distributed systems, Rust core engines, and P2P sync.",
    },
    {
      id: "page-about",
      title: isTr ? "Hakkımda ve Araştırma Kaydı (ORCID)" : "About & Research Credentials",
      category: isTr ? "About" : "About",
      url: `/${lang}/${isTr ? "hakkinda" : "about"}`,
      snippet: isTr
        ? "Barış Salih Babacan'ın biyografisi ve kariyer geçmişi."
        : "Biography and engineering background.",
    },
    {
      id: "page-uses",
      title: isTr ? "Donanım, Yazılım & Tooling Setupı" : "Hardware, Tooling & Stack Setup",
      category: isTr ? "Setup" : "Setup",
      url: `/${lang}/${isTr ? "kullandiklarim" : "uses"}`,
      snippet: isTr
        ? "MacBook Pro, Ghostty, VS Code, Cursor, Rust, Claude Code."
        : "MacBook Pro, Ghostty terminal, VS Code, Cursor IDE, Rust, Claude Code.",
    },
    // Projects
    ...Object.entries(PROJECT_DATA).map(([slug, data]) => ({
      id: `proj-${slug}`,
      title: data.title[lang as "en" | "tr"] ?? data.title.en,
      category: isTr ? "Proje" : "Project",
      url: `/${lang}/${isTr ? "projeler" : "projects"}/${slug}`,
      snippet: data.description[lang as "en" | "tr"] ?? data.description.en,
    })),
  ];

  const results = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.snippet.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )
    : allItems.slice(0, 6);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        navigate(results[selectedIndex].url);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-background/80 backdrop-blur-md flex items-start justify-center pt-[12vh] p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Spotlight Search"
    >
      <div
        className="w-full max-w-2xl bg-surface border border-primary/40 shadow-2xl overflow-hidden accent-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar with WebMCP Declarative Form Annotations */}
        <form
          toolname="search-documentation"
          tooldescription="Search engineering documentation, Architecture Decision Records (ADR), P2P/CRDT systems notes, and projects on babacan.me"
          toolautosubmit="true"
          onSubmit={(e) => {
            e.preventDefault();
            if (results[selectedIndex]) {
              navigate(results[selectedIndex].url);
              onClose();
            }
          }}
          className="flex items-center gap-3 px-4 py-3.5 border-b border-primary/20 bg-surface-container/20 w-full"
        >
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontSize: "20px" }}
            aria-hidden="true"
          >
            search
          </span>
          <input
            name="query"
            type="text"
            toolparamdescription="Search query or keyword (e.g. Rust, P2P, CRDT, Osmos, ADR)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isTr
                ? "Platformda ara... (Örn: Rust, Osmos, P2P, CRDT, ADR)"
                : "Search documentation & projects... (⌘K)"
            }
            className="w-full bg-transparent font-label-mono text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
            autoFocus
          />
          <button type="submit" className="sr-only">
            {isTr ? "Ara" : "Search"}
          </button>
          <kbd className="font-label-mono text-[10px] text-primary border border-primary/30 px-2 py-0.5 rounded bg-surface">
            ESC
          </kbd>
        </form>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="p-8 text-center font-label-mono text-xs text-on-surface-variant/60 uppercase tracking-widest">
              {isTr ? "Sonuç bulunamadı." : "No matching documentation found."}
            </div>
          ) : (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    navigate(item.url);
                    onClose();
                  }}
                  className={`w-full text-left p-3.5 transition-colors flex items-start justify-between gap-4 cursor-pointer ${
                    isSelected
                      ? "bg-primary/15 border-l-2 border-primary"
                      : "hover:bg-surface-container/30"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-label-mono text-[9px] uppercase tracking-widest text-primary border border-primary/30 px-1.5 py-0.2">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-sm text-on-surface">{item.title}</h4>
                    </div>
                    <p className="font-body-md text-xs text-on-surface-variant/80 line-clamp-1">
                      {item.snippet}
                    </p>
                  </div>
                  <span
                    className="font-label-mono text-xs text-primary/70 shrink-0 mt-1"
                    aria-hidden="true"
                  >
                    ↵
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="border-t border-primary/20 px-4 py-2 bg-surface-container/10 flex items-center justify-between font-label-mono text-[10px] text-on-surface-variant/60 uppercase tracking-widest">
          <span>Navigate: ↑ ↓</span>
          <span>Select: Enter</span>
          <span>Close: Esc</span>
        </div>
      </div>
    </div>
  );
}
