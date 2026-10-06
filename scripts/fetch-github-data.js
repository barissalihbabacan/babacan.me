import fs from "fs";
import path from "path";

const GITHUB_USER = "barissalihbabacan";
const token = process.env.VITE_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
const headers = token
  ? { Authorization: `token ${token}`, "User-Agent": "babacan.me-build-script" }
  : { "User-Agent": "babacan.me-build-script" };

async function fetchGitHubData() {
  // Statik varlik kaynagina yazilir: vite build "public/" dizinini
  // emptyOutDir ile sildigi icin dogrudan oraya yazmak sonucsuz kalirdi.
  const outputDir = path.resolve("src/public");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const targetFile = path.join(outputDir, "github-data.json");

  try {
    console.log("Fetching GitHub user data...");
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers });
    if (!userRes.ok) throw new Error(`User API failed: ${userRes.status}`);
    const user = await userRes.json();

    console.log("Fetching GitHub repository list...");
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=stars&per_page=100`,
      { headers },
    );
    if (!reposRes.ok) throw new Error(`Repos API failed: ${reposRes.status}`);
    const repos = await reposRes.json();

    console.log("Fetching GitHub contribution calendar...");
    let contributions = { days: [], total: 0 };
    try {
      const contribRes = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
        headers,
      });
      if (contribRes.ok) {
        const html = await contribRes.text();
        const dayMatches = [...html.matchAll(/data-date="([^"]+)".*?data-level="(\d+)"/g)];
        // GitHub tabloyu satir satir (once tum pazarlar, sonra pazartesiler...) verir;
        // takvim gunleri sirayla 7'li haftalara boldugu icin tarihe gore siralanmali.
        const days = dayMatches
          .map((m) => ({ date: m[1], level: parseInt(m[2], 10) || 0 }))
          .sort((a, b) => a.date.localeCompare(b.date));

        const totalMatch = html.match(/([\d,]+)\s+contributions/i);
        const total = totalMatch
          ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
          : days.reduce((acc, d) => acc + (d.level > 0 ? d.level * 2 : 0), 0);
        contributions = { days, total };
      }
    } catch (cErr) {
      console.warn("Contribution fetch note:", cErr);
    }

    // Yalnizca istemcinin kullandigi alanlar (bkz. src/contexts/githubData.ts);
    // tam API yaniti ~120 KB tutuyordu.
    const data = {
      user: { followers: user.followers },
      repos: repos.map((repo) => ({
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
      })),
      contributions,
      timestamp: Date.now(),
    };

    fs.writeFileSync(targetFile, JSON.stringify(data));
    console.log("Successfully saved GitHub data to public/github-data.json");
  } catch (err) {
    console.warn("GitHub API rate limit or network warning:", err.message);
    if (!fs.existsSync(targetFile)) {
      fs.writeFileSync(targetFile, JSON.stringify({ timestamp: Date.now() }, null, 2));
    }
    console.log("Preserved public/github-data.json for build continuity.");
  }
}

void fetchGitHubData();
