import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";

export default function UsesPage() {
  const { lang } = useLanguage();
  const { navigate } = useAppRouter();
  const isTr = lang === "tr";

  return (
    <div className="pt-24 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 font-label-mono text-xs text-on-surface-variant/70 uppercase tracking-widest flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => navigate(`/${lang}`)}
          className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          {isTr ? "Ana Sayfa" : "Home"}
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-primary">{isTr ? "Kullandıklarım & Stack" : "Uses & Stack"}</span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-4">
          {isTr ? "Donanım, Yazılım & Geliştirici Stack'i" : "Hardware, Tooling & Developer Stack"}
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {isTr
            ? "Günlük geliştirmede, terminal ortamında ve sistem mimarisinde kullandığım araçlar."
            : "Hardware devices, operating systems, terminal environments, IDEs, and AI developer tools powering daily work."}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="border border-primary/20 p-6 bg-surface-container/10">
          <h2 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> Hardware & Display
          </h2>
          <ul className="space-y-2 text-xs font-label-mono text-on-surface-variant/90">
            <li>• Apple MacBook Pro (M-Series Silicon)</li>
            <li>• High-DPI External Monitors</li>
            <li>• Tactile Mechanical Keyboard</li>
          </ul>
        </div>

        <div className="border border-primary/20 p-6 bg-surface-container/10">
          <h2 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> OS & Environment
          </h2>
          <ul className="space-y-2 text-xs font-label-mono text-on-surface-variant/90">
            <li>• macOS Sonoma / Sequoia</li>
            <li>• Raycast Launcher</li>
            <li>• Ghostty Terminal</li>
          </ul>
        </div>

        <div className="border border-primary/20 p-6 bg-surface-container/10">
          <h2 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> Code Editors & IDEs
          </h2>
          <ul className="space-y-2 text-xs font-label-mono text-on-surface-variant/90">
            <li>• VS Code & Cursor IDE</li>
            <li>• Neovim / Vim Keybindings</li>
            <li>• Xcode (SwiftUI / Apple Native)</li>
          </ul>
        </div>

        <div className="border border-primary/20 p-6 bg-surface-container/10">
          <h2 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> AI & Developer Tools
          </h2>
          <ul className="space-y-2 text-xs font-label-mono text-on-surface-variant/90">
            <li>• Claude Code CLI & Anthropic API</li>
            <li>• OpenAI Codex & Cursor Agent</li>
            <li>• Model Context Protocol (MCP)</li>
          </ul>
        </div>

        <div className="border border-primary/20 p-6 bg-surface-container/10">
          <h2 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="text-primary">■</span> Systems & Languages
          </h2>
          <ul className="space-y-2 text-xs font-label-mono text-on-surface-variant/90">
            <li>• Rust (cargo, UniFFI, clippy)</li>
            <li>• TypeScript & Node.js</li>
            <li>• React 19, Vite, Next.js App Router</li>
            <li>• C++ (Arduino Microcontrollers)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
